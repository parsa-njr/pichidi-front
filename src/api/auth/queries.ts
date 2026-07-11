"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authApi } from "./api";
import { handleApiError } from "@/utils/handleApiError";
import { AuthResponse, UserRole } from "@/types/auth";

export const authKeys = { me: ["auth", "me"] as const };

export function useMe(enabled = true) {
    return useQuery({
        queryKey: authKeys.me,
        queryFn: authApi.getMe,
        enabled,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
}

function goToDashboard(router: ReturnType<typeof useRouter>, role: UserRole) {
    router.replace(role === "customer" ? "/customer" : "/user");
}

export function useLogin() {
    const router = useRouter();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (data: AuthResponse) => {
            qc.setQueryData(authKeys.me, data);
            toast.success("ورود موفقیت‌آمیز بود");
            goToDashboard(router, data.role);
        },
        onError: handleApiError,
    });
}

export function useSignUp() {
    const router = useRouter();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: authApi.signUp,
        onSuccess: (data: AuthResponse) => {
            qc.setQueryData(authKeys.me, data);
            toast.success("ثبت‌نام موفقیت‌آمیز بود");
            goToDashboard(router, data.role);
        },
        onError: handleApiError,
    });
}

export function useSendOtp() {
    return useMutation({
        mutationFn: authApi.sendOtp,
        onSuccess: () => toast.success("کد تایید ارسال شد"),
        onError: handleApiError,
    });
}

export function useVerifyOtp() {
    const router = useRouter();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: authApi.verifyOtp,
        onSuccess: (data: AuthResponse) => {
            qc.setQueryData(authKeys.me, data);
            toast.success("ورود موفقیت‌آمیز بود");
            goToDashboard(router, data.role);
        },
        onError: handleApiError,
    });
}

export function useLogout() {
    const router = useRouter();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            qc.setQueryData(authKeys.me, null);
            qc.clear();
            toast.success("خروج با موفقیت انجام شد");
            router.replace("/");
        },
        onError: handleApiError,
    });
}