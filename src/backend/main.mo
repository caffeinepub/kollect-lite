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
  };

  public type Activity = {
    timestamp : Time.Time;
    actionType : Text; // e.g. "Email", "PTP"
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

  // Persistent state
  let cases = Map.empty<CaseID, Case>();
  let activitiesMap = Map.empty<CaseID, List.List<Activity>>();
  let documentsMap = Map.empty<CaseID, List.List<Document>>();

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

  // Public functions

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

  // Utility function to create a new case
  public shared ({ caller }) func createCase(newCase : Case) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create cases");
    };

    cases.add(newCase.id, newCase);
  };
};
