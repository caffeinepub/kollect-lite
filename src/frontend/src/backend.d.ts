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
export interface Case {
    id: CaseID;
    dpd: bigint;
    status: CaseStatus;
    secondaryContact: string;
    debtorName: string;
    productType: string;
    payoffBalance: number;
    customerId: string;
    amountDue: number;
    phoneNumber: string;
    paidAmount: number;
    primaryContact: string;
    contractId: string;
}
export interface Activity {
    actionType: string;
    paymentDetails?: string;
    timestamp: Time;
    comments?: string;
    outcome: string;
}
export type Time = bigint;
export interface Document {
    id: DocumentID;
    name: string;
    fileType: string;
    blobReference: ExternalBlob;
}
export type CaseID = string;
export type DocumentID = string;
export interface UserProfile {
    name: string;
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
    addDocument(caseId: CaseID, document: Document): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCase(newCase: Case): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCase(caseId: CaseID): Promise<Case | null>;
    getCaseActivities(caseId: CaseID): Promise<Array<Activity>>;
    getCaseDocuments(caseId: CaseID): Promise<Array<Document>>;
    getCases(): Promise<Array<Case>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
