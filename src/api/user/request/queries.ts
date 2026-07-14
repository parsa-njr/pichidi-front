"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { requestApi, CreateRequestPayload, IRequest } from "./api";
import { handleApiError } from "@/utils/handleApiError";

export const requestKeys = {
    all: (search?: string) => ["user", "requests", search ?? ""] as const,
};

export function useRequests(search?: string) {
    return useQuery({
        queryKey: requestKeys.all(search),
        queryFn: () => requestApi.getAll(search),
        select: (data): IRequest[] => data?.data?.data ?? data?.data ?? [],
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