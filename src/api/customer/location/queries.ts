"use client";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { locationApi, LocationPayload } from "./api";
import { handleApiError } from "@/utils/handleApiError";

export const locationKeys = {
    all: (search?: string) => ["customer", "locations", search ?? ""] as const,
};

const PER_PAGE = 15;

// Used by pages that need the FULL list without pagination (e.g. staff form's location dropdown)
export function useLocations() {
    return useInfiniteQuery({
        queryKey: locationKeys.all(""),
        queryFn: ({ pageParam }) =>
            locationApi.getAll({ page: pageParam, per_page: 100 }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const pagination = lastPage?.data;
            if (!pagination?.next_page_url) return undefined;
            return (pagination.current_page ?? 1) + 1;
        },
        select: (data) => data.pages.flatMap((page) => page?.data?.data ?? []),
    });
}

export function useInfiniteLocations(search?: string) {
    return useInfiniteQuery({
        queryKey: locationKeys.all(search),
        queryFn: ({ pageParam }) =>
            locationApi.getAll({ search, page: pageParam, per_page: PER_PAGE }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const pagination = lastPage?.data;
            if (!pagination?.next_page_url) return undefined;
            return (pagination.current_page ?? 1) + 1;
        },
        select: (data) => ({
            pages: data.pages,
            items: data.pages.flatMap((page) => page?.data?.data ?? []),
        }),
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