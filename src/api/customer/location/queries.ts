"use client";
import { useQuery } from "@tanstack/react-query";
import { locationApi } from "./api";

export const locationKeys = { all: ["customer", "locations"] as const };

export function useLocations() {
    return useQuery({
        queryKey: locationKeys.all,
        queryFn: locationApi.getAll,
        select: (data) => data?.data?.data ?? data?.data ?? [],
    });
}