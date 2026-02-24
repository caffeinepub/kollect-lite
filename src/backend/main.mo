import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  type CaseID = Text;
  type DocumentID = Text;

  public type CaseStatus = {
    #active;
    #escalated;
    #ptp;
  };

  public type Case = {
    id : CaseID;
    debtorName : Text;
    status : CaseStatus;
    contractId : Text;
    customerId : Text;
    dpd : Nat;
    phoneNumber : Text;
    amountDue : Float;
    paidAmount : Float;
    payoffBalance : Float;
    primaryContact : Text;
    secondaryContact : Text;
    productType : Text;
  };

  public type Activity = {
    timestamp : Time.Time;
    actionType : Text;
    outcome : Text;
    paymentDetails : ?Text;
    comments : ?Text;
  };

  public type Document = {
    id : DocumentID;
    name : Text;
    fileType : Text;
    blobReference : Storage.ExternalBlob;
  };

  public type UserProfile = {
    name : Text;
  };

  // Persistent state
  let cases = Map.empty<CaseID, Case>();
  let activitiesMap = Map.empty<CaseID, List.List<Activity>>();
  let documentsMap = Map.empty<CaseID, List.List<Document>>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Initialize authorization and storage components
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Case comparison for sorting
  module Case {
    public func compare(case1 : Case, case2 : Case) : Order.Order {
      Text.compare(case1.id, case2.id);
    };
  };

  // User Profile Management Functions

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Case Management Functions

  public query ({ caller }) func getCases() : async [Case] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cases");
    };

    let iter = cases.values();
    iter.toArray().sort();
  };

  public query ({ caller }) func getCase(caseId : CaseID) : async ?Case {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view case details");
    };

    cases.get(caseId);
  };

  public shared ({ caller }) func createCase(newCase : Case) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create cases");
    };

    cases.add(newCase.id, newCase);
  };

  // Activity Management Functions

  public query ({ caller }) func getCaseActivities(caseId : CaseID) : async [Activity] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view activities");
    };

    switch (activitiesMap.get(caseId)) {
      case (null) { [] };
      case (?activities) { activities.toArray() };
    };
  };

  public shared ({ caller }) func addActivity(caseId : CaseID, activity : Activity) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add activities");
    };

    let currentActivities = switch (activitiesMap.get(caseId)) {
      case (null) { List.empty<Activity>() };
      case (?activities) { activities };
    };

    currentActivities.add(activity);
    activitiesMap.add(caseId, currentActivities);
  };

  // Document Management Functions

  public query ({ caller }) func getCaseDocuments(caseId : CaseID) : async [Document] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view documents");
    };

    switch (documentsMap.get(caseId)) {
      case (null) { [] };
      case (?docs) { docs.toArray() };
    };
  };

  public shared ({ caller }) func addDocument(caseId : CaseID, document : Document) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add documents");
    };

    let currentDocuments = switch (documentsMap.get(caseId)) {
      case (null) { List.empty<Document>() };
      case (?docs) { docs };
    };

    currentDocuments.add(document);
    documentsMap.add(caseId, currentDocuments);
  };
};

