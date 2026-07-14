import { apiClient } from "@/api/axiosClient";

export interface CheckPayload {
    lat: number;
    lng: number;
}

export const attendanceApi = {
    checkIn: (payload: CheckPayload) =>
        apiClient.post("/api/v1/user/checkIn", payload).then((r) => r.data),

    checkOut: (payload: CheckPayload) =>
        apiClient.post("/api/v1/user/checkOut", payload).then((r) => r.data),

    getTodayStatus: () =>
        apiClient.get("/api/v1/user/today-status").then((r) => r.data),
};