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

export interface GetUserRequestsParams {
    search?: string;
    page: number;
    per_page: number;
}

export const requestApi = {
    getAll: (params: GetUserRequestsParams) =>
        apiClient.get("/api/v1/user/requests", { params }).then((r) => r.data),

    create: (payload: CreateRequestPayload) =>
        apiClient.post("/api/v1/user/requests", payload).then((r) => r.data),
};