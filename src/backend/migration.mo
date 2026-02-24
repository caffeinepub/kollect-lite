import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";

module {
  type CaseID = Text;
  type DocumentID = Text;

  type CaseStatus = {
    #active;
    #escalated;
    #ptp;
  };

  type Case = {
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

  type Activity = {
    timestamp : Time.Time;
    actionType : Text;
    outcome : Text;
    paymentDetails : ?Text;
    comments : ?Text;
  };

  type Document = {
    id : DocumentID;
    name : Text;
    fileType : Text;
    blobReference : Storage.ExternalBlob;
  };

  type Comment = {
    author : Principal;
    message : Text;
    timestamp : Time.Time;
  };

  type OldActor = {
    cases : Map.Map<CaseID, Case>;
    activitiesMap : Map.Map<CaseID, List.List<Activity>>;
    documentsMap : Map.Map<CaseID, List.List<Document>>;
  };

  type NewActor = {
    cases : Map.Map<CaseID, Case>;
    activitiesMap : Map.Map<CaseID, List.List<Activity>>;
    documentsMap : Map.Map<CaseID, List.List<Document>>;
    commentsMap : Map.Map<CaseID, List.List<Comment>>;
  };

  public func run(old : OldActor) : NewActor {
    let commentsMap = Map.empty<CaseID, List.List<Comment>>();
    { old with commentsMap };
  };
};
