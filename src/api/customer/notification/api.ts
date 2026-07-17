import { apiClient } from "@/api/axiosClient";

export interface INotification {
    _id: string;
    type: "request_created" | "request_accepted" | "request_rejected";
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export interface GetNotificationsParams {
    page?: number;
    per_page?: number;
}

export const customerNotificationApi = {
    getAll: (params: GetNotificationsParams = {}) =>
        apiClient.get("/api/v1/customer/notifications", { params }).then((r) => r.data),
    markRead: (id: string) =>
        apiClient.post(`/api/v1/customer/notifications/${id}/read`).then((r) => r.data),
    markAllRead: () =>
        apiClient.post("/api/v1/customer/notifications/read-all").then((r) => r.data),
};