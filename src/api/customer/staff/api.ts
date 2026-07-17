import { apiClient } from "@/api/axiosClient";

export interface StaffPayload {
    name: string;
    phone: string;
    password?: string;
    location: string;
    shift: string;
}

export interface GetStaffParams {
    search?: string;
    page: number;
    per_page: number;
}

export const staffApi = {
    getAll: (params: GetStaffParams) =>
        apiClient.get("/api/v1/customer/users", { params }).then((r) => r.data),

    create: (payload: StaffPayload) =>
        apiClient.post("/api/v1/customer/users", payload).then((r) => r.data),

    // NOTE: your route file defines this as PUT, but the old page called
    // apiClient.post(...) for edit — that was a bug, fixed here.
    update: (id: string, payload: Partial<StaffPayload>) =>
        apiClient.put(`/api/v1/customer/users/${id}`, payload).then((r) => r.data),

    remove: (id: string) =>
        apiClient.delete(`/api/v1/customer/users/${id}`).then((r) => r.data),
};