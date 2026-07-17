"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userReportApi } from "./api";
import { handleApiError } from "@/utils/handleApiError";

export function useMonthlyReport(month: string, year: string, enabled = true) {
    return useQuery({
        queryKey: ["user", "monthlyReport", year, month],
        queryFn: () => userReportApi.getReport({ month, year }),
        enabled: enabled && !!month && !!year,
    });
}

export function useDownloadReport() {
    return useMutation({
        mutationFn: (params: { month: string; year: string }) => userReportApi.downloadReport(params),
        onError: handleApiError,
    });
}