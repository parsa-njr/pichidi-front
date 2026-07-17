"use client";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { requestApi, CreateRequestPayload, IRequest } from "./api";
import { handleApiError } from "@/utils/handleApiError";

export const requestKeys = {
    all: (search?: string) => ["user", "requests", search ?? ""] as const,
};

const PER_PAGE = 15;

export function useInfiniteRequests(search?: string) {
    return useInfiniteQuery({
        queryKey: requestKeys.all(search),
        queryFn: ({ pageParam }) =>
            requestApi.getAll({ search, page: pageParam, per_page: PER_PAGE }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const pagination = lastPage?.data;
            if (!pagination?.next_page_url) return undefined;
            return (pagination.current_page ?? 1) + 1;
        },
        select: (data) => ({
            pages: data.pages,
            items: data.pages.flatMap((page): IRequest[] => page?.data?.data ?? []),
        }),
    });
}

export function useCreateRequest() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateRequestPayload) => requestApi.create(payload),
        onSuccess: () => {
            toast.success("درخواست با موفقیت ثبت شد");
            qc.invalidateQueries({ queryKey: ["user", "requests"] });
        },
        onError: handleApiError,
    });
}