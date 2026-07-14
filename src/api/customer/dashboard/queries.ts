"use client";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi, DashboardStats } from "./api";

export function useDashboardStats() {
    return useQuery({
        queryKey: ["customer", "dashboardStats"],
        queryFn: dashboardApi.getStats,
        select: (data): DashboardStats => data?.data,
        staleTime: 60 * 1000,
    });
}