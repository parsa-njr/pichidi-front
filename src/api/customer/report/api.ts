import { apiClient } from "@/api/axiosClient";

export const reportApi = {
    getLocationUsers: (locationId: string) =>
        apiClient
            .get(`/api/v1/customer/get-location-users/${locationId}`)
            .then((r) => r.data),

    getUserReport: (params: { userId: string; startDate: string; endDate: string }) =>
        apiClient
            .get("/api/v1/customer/get-user-base-report/", { params })
            .then((r) => r.data),

    getDateBaseReport: (params: {
        startDate: string;
        endDate: string;
        location?: string;
        userId?: string;
    }) =>
        apiClient
            .get("/api/v1/customer/get-date-base-report/", { params })
            .then((r) => r.data),
};