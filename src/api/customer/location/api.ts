import { apiClient } from "@/api/axiosClient";

export const locationApi = {
    getAll: () => apiClient.get("/api/v1/customer/locations").then((r) => r.data),
};