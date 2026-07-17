import { apiClient } from "@/api/axiosClient";

export interface MonthlyReportParams {
    month: string;
    year: string;
}

export const userReportApi = {
    getReport: (params: MonthlyReportParams) =>
        apiClient.get("/api/v1/user/reports", { params }).then((r) => r.data),

    downloadReport: (params: MonthlyReportParams) =>
        apiClient
            .get("/api/v1/user/reports", { params: { ...params, excel: true }, responseType: "blob" })
            .then((r) => r.data),
};