"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { customerRequestApi, UpdateRequestStatusPayload, IRequest } from "./api";
import { handleApiError } from "@/utils/handleApiError";

export const customerRequestKeys = {
    all: (search?: string) => ["customer", "requests", search ?? ""] as const,
};

export function useCustomerRequests(search?: string) {
    return useQuery({
        queryKey: customerRequestKeys.all(search),
        queryFn: () => customerRequestApi.getAll(search),
        select: (data): IRequest[] => data?.data?.data ?? data?.data ?? [],
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