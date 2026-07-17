"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { userProfileApi, UpdateUserProfilePayload } from "./api";
import { handleApiError } from "@/utils/handleApiError";
import { authKeys } from "@/api/auth/queries";

export function useUserProfile() {
    return useQuery({
        queryKey: ["user", "profile"],
        queryFn: userProfileApi.getProfile,
        select: (data) => data?.user,
    });
}

export function useUpdateUserProfile() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateUserProfilePayload) => userProfileApi.updateProfile(payload),
        onSuccess: (data) => {
            toast.success("پروفایل با موفقیت ویرایش شد");
            qc.invalidateQueries({ queryKey: ["user", "profile"] });
            // keep the header's avatar/name in sync immediately, without a refetch
            qc.setQueryData(authKeys.me, (old: any) =>
                old
                    ? {
                        ...old,
                        user: {
                            ...old.user,
                            name: data?.user?.name ?? old.user.name,
                            profileImage: data?.user?.profileImage ?? old.user.profileImage,
                        },
                    }
                    : old
            );
        },
        onError: handleApiError,
    });
}