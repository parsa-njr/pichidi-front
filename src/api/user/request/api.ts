import { apiClient } from "@/api/axiosClient";

export type RequestType = "leave" | "overtime";
export type RequestStatus = "pending" | "accepted" | "rejected";

export interface CreateRequestPayload {
    requestType: RequestType;
    startDate: string; // ISO
    endDate: string;   // ISO
    userNote?: string;
}

export interface IRequest {
    _id: string;
    requestType: RequestType;
    status: RequestStatus;
    startDate: string;
    endDate: string;
    userNote?: string;
    customerNote?: string;
    createdAt: string;
}

export const requestApi = {
    getAll: (search?: string) =>
        apiClient
            .get("/api/v1/user/requests", { params: search ? { search } : undefined })
            .then((r) => r.data),

    create: (payload: CreateRequestPayload) =>
        apiClient.post("/api/v1/user/requests", payload).then((r) => r.data),
};