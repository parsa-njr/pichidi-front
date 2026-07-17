import { apiClient } from "@/api/axiosClient";
import { INotification, GetNotificationsParams } from "@/api/customer/notification/api";

export const userNotificationApi = {
    getAll: (params: GetNotificationsParams = {}) =>
        apiClient.get("/api/v1/user/notifications", { params }).then((r) => r.data),
    markRead: (id: string) =>
        apiClient.post(`/api/v1/user/notifications/${id}/read`).then((r) => r.data),
    markAllRead: () =>
        apiClient.post("/api/v1/user/notifications/read-all").then((r) => r.data),
};
export type { INotification };