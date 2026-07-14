"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { locationApi, LocationPayload } from "./api";
import { handleApiError } from "@/utils/handleApiError";

export const locationKeys = {
    all: (search?: string) => ["customer", "locations", search ?? ""] as const,
};

export function useLocations(search?: string) {
    return useQuery({
        queryKey: locationKeys.all(search),
        queryFn: () => locationApi.getAll(search),
        select: (data) => data?.data?.data ?? data?.data ?? [],
    });
}

export function useCreateLocation() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: locationApi.create,
        onSuccess: () => {
            toast.success("مکان با موفقیت ایجاد شد");
            qc.invalidateQueries({ queryKey: ["customer", "locations"] });
        },
        onError: handleApiError,
    });
}

export function useUpdateLocation() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: LocationPayload }) =>
            locationApi.update(id, payload),
        onSuccess: () => {
            toast.success("لوکیشن با موفقیت به‌روزرسانی شد");
            qc.invalidateQueries({ queryKey: ["customer", "locations"] });
        },
        onError: handleApiError,
    });
}

export function useDeleteLocation() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: locationApi.remove,
        onSuccess: () => {
            toast.success("مکان با موفقیت حذف شد");
            qc.invalidateQueries({ queryKey: ["customer", "locations"] });
        },
        onError: handleApiError,
    });
}