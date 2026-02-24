import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";

module {
  type OldCase = {
    id : Text;
    debtorName : Text;
    status : { #active; #escalated; #ptp };
    contractId : Text;
    customerId : Text;
    dpd : Nat;
    phoneNumber : Text;
    amountDue : Float;
    paidAmount : Float;
    payoffBalance : Float;
  };

  type OldActivity = {
    timestamp : Time.Time;
    actionType : Text;
    outcome : Text;
    paymentDetails : ?Text;
    comments : ?Text;
  };

  type OldDocument = {
    id : Text;
    name : Text;
    fileType : Text;
    blobReference : Storage.ExternalBlob;
  };

  type OldActor = {
    cases : Map.Map<Text, OldCase>;
    activitiesMap : Map.Map<Text, List.List<OldActivity>>;
    documentsMap : Map.Map<Text, List.List<OldDocument>>;
  };

  type NewCase = {
    id : Text;
    debtorName : Text;
    status : { #active; #escalated; #ptp };
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

  type NewActor = {
    cases : Map.Map<Text, NewCase>;
    activitiesMap : Map.Map<Text, List.List<OldActivity>>;
    documentsMap : Map.Map<Text, List.List<OldDocument>>;
  };

  public func run(old : OldActor) : NewActor {
    let newCases = old.cases.map<Text, OldCase, NewCase>(
      func(_id, oldCase) {
        {
          oldCase with
          primaryContact = "Default Primary";
          secondaryContact = "Default Secondary";
          productType = "Default Product";
        };
      }
    );
    {
      cases = newCases;
      activitiesMap = old.activitiesMap;
      documentsMap = old.documentsMap;
    };
  };
};
