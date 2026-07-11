import { apiClient } from "@/api/axiosClient";

export interface ShiftTime { startTime: string; endTime: string }
export interface ShiftDay { day: number; isOffDay: boolean; time: ShiftTime[] }
export interface ExceptionDay { date: string; time: ShiftTime[] }

export interface ShiftPayload {
    shiftName: string;
    startDate: string;
    endDate: string;
    formalHolidays: boolean;
    shiftDays: ShiftDay[];
    exceptionDays: ExceptionDay[];
}

export const shiftApi = {
    getAll: () => apiClient.get("/api/v1/customer/shifts").then((r) => r.data),
    getById: (id: string) => apiClient.get(`/api/v1/customer/shifts/${id}`).then((r) => r.data),
    create: (payload: ShiftPayload) => apiClient.post("/api/v1/customer/shifts", payload).then((r) => r.data),
    update: (id: string, payload: ShiftPayload) =>
        apiClient.put(`/api/v1/customer/shifts/${id}`, payload).then((r) => r.data),
    remove: (id: string) => apiClient.delete(`/api/v1/customer/shifts/${id}`).then((r) => r.data),
};