import { apiClient } from "@/api/axiosClient";

export interface NotCheckedInUser {
    id: string;
    name: string;
}

export interface DashboardStats {
    totalStaff: number;
    present: number;
    absent: number;
    delayed: number;
    stillWorking: number;
    pendingRequests: number;
    locationsCount: number;
    shiftsCount: number;
    notCheckedIn: NotCheckedInUser[];
    notCheckedInCount: number;
}
export const dashboardApi = {
    getStats: () => apiClient.get("/api/v1/customer/dashboard-stats").then((r) => r.data),
};