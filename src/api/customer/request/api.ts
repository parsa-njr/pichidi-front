import { apiClient } from "@/api/axiosClient";

export type RequestType = "leave" | "overtime";
export type RequestStatus = "pending" | "accepted" | "rejected";

export interface IRequest {
    _id: string;
    requestType: RequestType;
    status: RequestStatus;
    startDate: string;
    endDate: string;
    userNote?: string;
    customerNote?: string;
    createdAt: string;
    user: { _id: string; name: string; phone: string };
}

export interface UpdateRequestStatusPayload {
    status: "accepted" | "rejected";
    customerNote?: string;
}

export const customerRequestApi = {
    getAll: (search?: string) =>
        apiClient
            .get("/api/v1/customer/requests", { params: search ? { search } : undefined })
            .then((r) => r.data),

    updateStatus: (id: string, payload: UpdateRequestStatusPayload) =>
        apiClient.post(`/api/v1/customer/requests/${id}`, payload).then((r) => r.data),
};