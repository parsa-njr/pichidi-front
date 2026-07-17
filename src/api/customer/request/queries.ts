"use client";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { customerRequestApi, UpdateRequestStatusPayload, IRequest } from "./api";
import { handleApiError } from "@/utils/handleApiError";

export const customerRequestKeys = {
    all: (search?: string) => ["customer", "requests", search ?? ""] as const,
};

const PER_PAGE = 15;

export function useInfiniteCustomerRequests(search?: string) {
    return useInfiniteQuery({
        queryKey: customerRequestKeys.all(search),
        queryFn: ({ pageParam }) =>
            customerRequestApi.getAll({ search, page: pageParam, per_page: PER_PAGE }),
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
export function useUpdateRequestStatus() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateRequestStatusPayload }) =>
            customerRequestApi.updateStatus(id, payload),
        onSuccess: (_, variables) => {
            toast.success(
                variables.payload.status === "accepted" ? "درخواست پذیرفته شد" : "درخواست رد شد"
            );
            qc.invalidateQueries({ queryKey: ["customer", "requests"] });
        },
        onError: handleApiError,
    });
}