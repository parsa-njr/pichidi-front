"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userNotificationApi } from "./api";

export const userNotificationKeys = {
    all: ["user", "notifications"] as const,
};

export function useUserNotifications(enabled = true) {
    return useQuery({
        queryKey: userNotificationKeys.all,
        queryFn: () => userNotificationApi.getAll({ per_page: 20 }),
        select: (res) => ({
            items: res?.data?.data ?? res?.data ?? [],
            unreadCount: res?.unreadCount ?? 0,
        }),
        refetchInterval: 30000,
        enabled,
    });
}

export function useMarkUserNotificationRead() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: userNotificationApi.markRead,
        onSuccess: () => qc.invalidateQueries({ queryKey: userNotificationKeys.all }),
    });
}

export function useMarkAllUserNotificationsRead() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: userNotificationApi.markAllRead,
        onSuccess: () => qc.invalidateQueries({ queryKey: userNotificationKeys.all }),
    });
}