"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { shiftApi, ShiftPayload } from "./api";
import { handleApiError } from "@/utils/handleApiError";

export const shiftKeys = { all: ["customer", "shifts"] as const };

export function useShifts() {
    return useQuery({
        queryKey: shiftKeys.all,
        queryFn: shiftApi.getAll,
        select: (data) => data?.data?.data ?? data?.data ?? [],
    });
}

export function useCreateShift() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: shiftApi.create,
        onSuccess: () => {
            toast.success("شیفت با موفقیت ایجاد شد");
            qc.invalidateQueries({ queryKey: shiftKeys.all });
        },
        onError: handleApiError,
    });
}

export function useUpdateShift() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: ShiftPayload }) => shiftApi.update(id, payload),
        onSuccess: () => {
            toast.success("شیفت با موفقیت به‌روزرسانی شد");
            qc.invalidateQueries({ queryKey: shiftKeys.all });
        },
        onError: handleApiError,
    });
}

export function useDeleteShift() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: shiftApi.remove,
        onSuccess: () => {
            toast.success("شیفت با موفقیت حذف شد");
            qc.invalidateQueries({ queryKey: shiftKeys.all });
        },
        onError: handleApiError,
    });
}