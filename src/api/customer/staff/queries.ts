"use client";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { staffApi, StaffPayload } from "./api";
import { handleApiError } from "@/utils/handleApiError";

export const staffKeys = {
    all: (search?: string) => ["customer", "staff", search ?? ""] as const,
};

const PER_PAGE = 15;

export function useInfiniteStaff(search?: string) {
    return useInfiniteQuery({
        queryKey: staffKeys.all(search),
        queryFn: ({ pageParam }) =>
            staffApi.getAll({ search, page: pageParam, per_page: PER_PAGE }),
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