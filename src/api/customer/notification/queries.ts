"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customerNotificationApi } from "./api";

export const customerNotificationKeys = {
    all: ["customer", "notifications"] as const,
};

export function useCustomerNotifications() {
    return useQuery({
        queryKey: customerNotificationKeys.all,
        queryFn: () => customerNotificationApi.getAll({ per_page: 20 }),
        select: (res) => ({
            items: res?.data?.data ?? res?.data ?? [],
            unreadCount: res?.unreadCount ?? 0,
        }),
        refetchInterval: 30000, // poll every 30s
    });
}

export function useMarkCustomerNotificationRead() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: customerNotificationApi.markRead,
        onSuccess: () => qc.invalidateQueries({ queryKey: customerNotificationKeys.all }),
    });
}

export function useMarkAllCustomerNotificationsRead() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: customerNotificationApi.markAllRead,
        onSuccess: () => qc.invalidateQueries({ queryKey: customerNotificationKeys.all }),
    });
}