"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { customerProfileApi, UpdateCustomerProfilePayload } from "./api";
import { handleApiError } from "@/utils/handleApiError";
import { authKeys } from "@/api/auth/queries";

export function useCustomerProfile() {
    return useQuery({
        queryKey: ["customer", "profile"],
        queryFn: customerProfileApi.getProfile,
        select: (data) => data?.customer,
    });
}

export function useUpdateCustomerProfile() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateCustomerProfilePayload) => customerProfileApi.updateProfile(payload),
        onSuccess: (data) => {
            toast.success("پروفایل با موفقیت ویرایش شد");
            qc.invalidateQueries({ queryKey: ["customer", "profile"] });
            qc.setQueryData(authKeys.me, (old: any) =>
                old
                    ? {
                        ...old,
                        user: {
                            ...old.user,
                            name: data?.customer?.name ?? old.user.name,
                            profileImage: data?.customer?.profileImage ?? old.user.profileImage,
                        },
                    }
                    : old
            );
        },
        onError: handleApiError,
    });
}