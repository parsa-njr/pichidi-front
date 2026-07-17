"use client";
import { useCallback, useEffect, useState } from "react";

export type LocationStatus = "idle" | "requesting" | "granted" | "denied" | "unavailable";

export function useGeolocation() {
    const [status, setStatus] = useState<LocationStatus>("idle");
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

    const request = useCallback(() => {
        if (!navigator.geolocation) {
            setStatus("unavailable");
            return;
        }
        setStatus("requesting");
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
                setStatus("granted");
            },
            (err) => {
                // err.code: 1 = PERMISSION_DENIED, 2 = POSITION_UNAVAILABLE, 3 = TIMEOUT
                setStatus(err.code === 1 ? "denied" : "unavailable");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    }, []);

    useEffect(() => {
        request();
    }, [request]);

    return { status, coords, retry: request };
}