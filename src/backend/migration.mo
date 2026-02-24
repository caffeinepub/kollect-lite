import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  type CaseID = Text;
  type DocumentID = Text;

  type OldCaseStatus = {
    #active;
    #escalated;
    #ptp;
  };

  type OldCase = {
    id : CaseID;
    debtorName : Text;
    status : OldCaseStatus;
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

  type OldDocument = {
    id : DocumentID;
    name : Text;
    fileType : Text;
    blobReference : Blob;
  };

  type OldComment = {
    author : Principal;
    message : Text;
    timestamp : Time.Time;
  };

  type OldActor = {
    cases : Map.Map<CaseID, OldCase>;
    activitiesMap : Map.Map<CaseID, List.List<Activity>>;
    documentsMap : Map.Map<CaseID, List.List<OldDocument>>;
    commentsMap : Map.Map<CaseID, List.List<OldComment>>;
  };

  // New comment type with action and outcome fields
  type NewComment = {
    author : Principal;
    message : Text;
    timestamp : Time.Time;
    action : Text;
    outcome : Text;
  };

  type NewActor = {
    cases : Map.Map<CaseID, OldCase>;
    activitiesMap : Map.Map<CaseID, List.List<Activity>>;
    documentsMap : Map.Map<CaseID, List.List<OldDocument>>;
    commentsMap : Map.Map<CaseID, List.List<NewComment>>;
  };

  // Migration function to transform old comments to new structure
  public func run(old : OldActor) : NewActor {
    let newCommentsMap = old.commentsMap.map<CaseID, List.List<OldComment>, List.List<NewComment>>(
      func(_, oldComments) {
        oldComments.map<OldComment, NewComment>(
          func(oldComment) {
            {
              oldComment with
              action = "";
              outcome = "";
            };
          }
        );
      }
    );
    { old with commentsMap = newCommentsMap };
  };
};
