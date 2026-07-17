"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { attendanceApi, CheckPayload } from "./api";
import { handleApiError } from "@/utils/handleApiError";

export const attendanceKeys = { today: ["user", "attendance", "today"] as const };

export function useTodayStatus() {
    return useQuery({
        queryKey: attendanceKeys.today,
        queryFn: attendanceApi.getTodayStatus,
        staleTime: 30 * 1000,
    });
}

export function useCheckIn() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CheckPayload) => attendanceApi.checkIn(payload),
        onSuccess: (data) => {
            toast.success(data?.message ?? "ورود ثبت شد");
            qc.invalidateQueries({ queryKey: attendanceKeys.today });
            qc.invalidateQueries({ queryKey: ["user", "monthlyReport"] });
        },
        onError: handleApiError,
    });
}

export function useCheckOut() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CheckPayload) => attendanceApi.checkOut(payload),
        onSuccess: (data) => {
            toast.success(data?.message ?? "خروج ثبت شد");
            qc.invalidateQueries({ queryKey: attendanceKeys.today });
            qc.invalidateQueries({ queryKey: ["user", "monthlyReport"] });
        },
        onError: handleApiError,
    });
}