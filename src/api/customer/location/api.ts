import { apiClient } from "@/api/axiosClient";

export interface LocationPayload {
    name: string;
    latitude: number;
    longitude: number;
    range: number;
}

export const locationApi = {
    getAll: (search?: string) =>
        apiClient
            .get("/api/v1/customer/locations", { params: search ? { search } : undefined })
            .then((r) => r.data),

    create: (payload: LocationPayload) =>
        apiClient.post("/api/v1/customer/locations", payload).then((r) => r.data),

    update: (id: string, payload: LocationPayload) =>
        apiClient.put(`/api/v1/customer/locations/${id}`, payload).then((r) => r.data),

    remove: (id: string) =>
        apiClient.delete(`/api/v1/customer/locations/${id}`).then((r) => r.data),
};