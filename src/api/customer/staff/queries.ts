"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { staffApi, StaffPayload } from "./api";
import { handleApiError } from "@/utils/handleApiError";

export const staffKeys = {
    all: (search?: string) => ["customer", "staff", search ?? ""] as const,
};

export function useStaff(search?: string) {
    return useQuery({
        queryKey: staffKeys.all(search),
        queryFn: () => staffApi.getAll(search),
        select: (data) => data?.data?.data ?? data?.data ?? [],
    });
}

export function useCreateStaff() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: staffApi.create,
        onSuccess: () => {
            toast.success("کارمند با موفقیت افزوده شد");
            qc.invalidateQueries({ queryKey: ["customer", "staff"] });
        },
        onError: handleApiError,
    });
}

export function useUpdateStaff() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<StaffPayload> }) =>
            staffApi.update(id, payload),
        onSuccess: () => {
            toast.success("کارمند با موفقیت ویرایش شد");
            qc.invalidateQueries({ queryKey: ["customer", "staff"] });
        },
        onError: handleApiError,
    });
}

export function useDeleteStaff() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: staffApi.remove,
        onSuccess: () => {
            toast.success("کارمند با موفقیت حذف شد");
            qc.invalidateQueries({ queryKey: ["customer", "staff"] });
        },
        onError: handleApiError,
    });
}