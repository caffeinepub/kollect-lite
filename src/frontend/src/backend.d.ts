import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Activity {
    actionType: string;
    paymentDetails?: string;
    timestamp: Time;
    comments?: string;
    outcome: string;
}
export type Time = bigint;
export interface Comment {
    action: string;
    author: Principal;
    message: string;
    timestamp: Time;
    outcome: string;
}
export interface Document {
    id: DocumentID;
    name: string;
    fileType: string;
    blobReference: ExternalBlob;
}
export type CaseID = string;
export type DocumentID = string;
export interface Case {
    id: CaseID;
    dpd: bigint;
    status: CaseStatus;
    debtorName: string;
    payoffBalance: number;
    customerId: string;
    amountDue: number;
    phoneNumber: string;
    paidAmount: number;
    contractId: string;
}
export enum CaseStatus {
    ptp = "ptp",
    active = "active",
    escalated = "escalated"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addActivity(caseId: CaseID, activity: Activity): Promise<void>;
    addComment(caseId: CaseID, message: string, action: string, outcome: string): Promise<void>;
    addDocument(caseId: CaseID, document: Document): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCase(newCase: Case): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getCase(caseId: CaseID): Promise<Case | null>;
    getCaseActivities(caseId: CaseID): Promise<Array<Activity>>;
    getCaseComments(caseId: CaseID): Promise<Array<Comment>>;
    getCaseDocuments(caseId: CaseID): Promise<Array<Document>>;
    getCases(): Promise<Array<Case>>;
    isCallerAdmin(): Promise<boolean>;
}
