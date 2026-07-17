"use client";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { shiftApi, ShiftPayload } from "./api";
import { handleApiError } from "@/utils/handleApiError";

export const getAlllKeys = { all: (search?: string) => ["customer", "shifts", search ?? ""] as const };
export const restKeys = { all: ["customer", "shifts"] as const };

const PER_PAGE = 15;

// Full-list fetch, used by pages needing every shift at once (e.g. staff form's shift dropdown)
export function useShifts() {
    return useInfiniteQuery({
        queryKey: getAlllKeys.all(""),
        queryFn: ({ pageParam }) => shiftApi.getAll({ page: pageParam, per_page: 100 }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const pagination = lastPage?.data;
            if (!pagination?.next_page_url) return undefined;
            return (pagination.current_page ?? 1) + 1;
        },
        select: (data) => data.pages.flatMap((page) => page?.data?.data ?? []),
    });
}

export function useInfiniteShifts(search?: string) {
    return useInfiniteQuery({
        queryKey: getAlllKeys.all(search),
        queryFn: ({ pageParam }) =>
            shiftApi.getAll({ search, page: pageParam, per_page: PER_PAGE }),
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

export function useCreateShift() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: shiftApi.create,
        onSuccess: () => {
            toast.success("شیفت با موفقیت ایجاد شد");
            qc.invalidateQueries({ queryKey: restKeys.all });
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
            qc.invalidateQueries({ queryKey: restKeys.all });
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
            qc.invalidateQueries({ queryKey: restKeys.all });
        },
        onError: handleApiError,
    });
}