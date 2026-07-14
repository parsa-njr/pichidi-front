"use client";
import { useMutation } from "@tanstack/react-query";
import { reportApi } from "./api";
import { handleApiError } from "@/utils/handleApiError";

export function useDateBaseReport() {
    return useMutation({
        mutationFn: reportApi.getDateBaseReport,
        onError: handleApiError,
    });
}

export function useLocationUsers() {
    return useMutation({
        mutationFn: reportApi.getLocationUsers,
        onError: handleApiError,
    });
}

export function useUserReport() {
    return useMutation({
        mutationFn: reportApi.getUserReport,
        onError: handleApiError,
    });
}