"use client";

// "use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Locate, Loader2 } from "lucide-react";

// Fix default marker icons (Next.js doesn't serve leaflet's default assets correctly)
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// const defaultIcon = L.icon({
//     iconUrl: markerIcon.src,
//     iconRetinaUrl: markerIcon2x.src,
//     shadowUrl: markerShadow.src,
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
// });

// Fix default marker icons — load from a CDN instead of local node_modules
// asset imports, which Next.js does not reliably resolve for leaflet's images.
const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
interface LeafletMapPickerProps {
    lat: number;
    lng: number;
    range?: number;
    onPick: (lat: number, lng: number) => void;
    height?: string;
    showLocateButton?: boolean;
}

export default function LeafletMapPicker({
    lat,
    lng,
    range,
    onPick,
    height = "13rem",
    showLocateButton = false,
}: LeafletMapPickerProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const circleRef = useRef<L.Circle | null>(null);
    const [locating, setLocating] = useState(false);

    // Init map once
    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        const map = L.map(containerRef.current, {
            center: [lat, lng],
            zoom: 15,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        const marker = L.marker([lat, lng], { draggable: true, icon: defaultIcon }).addTo(map);
        marker.on("dragend", () => {
            const pos = marker.getLatLng();
            onPick(pos.lat, pos.lng);
        });

        map.on("click", (e: L.LeafletMouseEvent) => {
            marker.setLatLng(e.latlng);
            onPick(e.latlng.lat, e.latlng.lng);
        });

        mapRef.current = map;
        markerRef.current = marker;

        if (range) {
            circleRef.current = L.circle([lat, lng], {
                radius: range,
                color: "#3b82f6",
                fillColor: "#3b82f6",
                fillOpacity: 0.15,
            }).addTo(map);
        }

        // Leaflet needs a resize kick when mounted inside an animated/hidden container
        setTimeout(() => map.invalidateSize(), 200);

        return () => {
            map.remove();
            mapRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sync marker + circle + view when lat/lng/range change externally
    useEffect(() => {
        if (!mapRef.current || !markerRef.current) return;
        markerRef.current.setLatLng([lat, lng]);
        mapRef.current.setView([lat, lng]);

        if (circleRef.current) {
            circleRef.current.setLatLng([lat, lng]);
            if (range) circleRef.current.setRadius(range);
        } else if (range) {
            circleRef.current = L.circle([lat, lng], {
                radius: range,
                color: "#3b82f6",
                fillColor: "#3b82f6",
                fillOpacity: 0.15,
            }).addTo(mapRef.current);
        }
    }, [lat, lng, range]);

    const handleLocateMe = () => {
        if (!navigator.geolocation) return;
        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                onPick(latitude, longitude);
                mapRef.current?.flyTo([latitude, longitude], 16, { duration: 1 });
                setLocating(false);
            },
            () => setLocating(false),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    return (
        <div className="relative" style={{ width: "100%" }}>
            <div
                ref={containerRef}
                style={{ height, width: "100%" }}
                className="rounded-xl overflow-hidden border border-gray-200"
            />
            {showLocateButton && (
                <button
                    type="button"
                    onClick={handleLocateMe}
                    disabled={locating}
                    className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center z-[15] active:scale-95 transition-transform disabled:opacity-60"
                    title="یافتن موقعیت من"
                >
                    {locating ? (
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    ) : (
                        <Locate className="w-4 h-4 text-primary" />
                    )}
                </button>
            )}
        </div>
    );
}