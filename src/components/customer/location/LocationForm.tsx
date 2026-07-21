"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import TextField from "@/components/shared/fields/TextField";
import { LocationPayload } from "@/api/customer/location/api";

const LeafletMapPicker = dynamic(() => import("@/components/ui/LeafletMapPicker"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-52 rounded-xl bg-gray-100 flex items-center justify-center text-xs text-gray-400">
            در حال بارگذاری نقشه...
        </div>
    ),
});

interface LocationFormValues {
    name: string;
    range: string;
    latitude: number;
    longitude: number;
}

interface LocationFormProps {
    initial: LocationFormValues;
    onSubmit: (v: LocationPayload) => void;
    submitting: boolean;
    submitLabel: string;
}

export default function LocationForm({ initial, onSubmit, submitting, submitLabel }: LocationFormProps) {
    const [form, setForm] = useState(initial);
    const [error, setError] = useState("");
    const set = (key: keyof LocationFormValues) => (v: string | number) =>
        setForm((f) => ({ ...f, [key]: v }));

    const handleSubmit = () => {
        if (!form.name || !form.range || !form.latitude || !form.longitude) {
            setError("همه فیلدها الزامی هستند");
            return;
        }
        setError("");
        onSubmit({
            name: form.name,
            range: Number(form.range),
            latitude: form.latitude,
            longitude: form.longitude,
        });
    };

    return (
        <div dir="rtl">
            <TextField label="نام مکان" value={form.name} onChange={set("name") as (v: string) => void} placeholder="مثلاً: کارگاه شمالی" />
            <TextField label="شعاع (متر)" value={form.range} onChange={set("range") as (v: string) => void} placeholder="مثلاً: 200" type="number" />

            <div className="mb-4">
                <label className="block text-xs text-gray-500 text-right mb-1.5">موقعیت روی نقشه</label>
                <LeafletMapPicker
                    lat={form.latitude || 35.6892}
                    lng={form.longitude || 51.389}
                    range={Number(form.range) || undefined}
                    onPick={(lat, lng) => setForm((f) => ({ ...f, latitude: lat, longitude: lng }))}
                    showLocateButton
                />
                <p className="text-xs text-gray-400 text-right mt-2">
                    روی نقشه کلیک کنید یا نشانگر را جابجا کنید
                </p>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">یا مختصات را دستی وارد کنید</span>
                <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="flex gap-3 mb-4">
                <TextField
                    label="عرض جغرافیایی (Latitude)"
                    value={form.latitude ? String(form.latitude) : ""}
                    onChange={(v) => set("latitude")(v === "" ? "" : Number(v))}
                    placeholder="مثلاً: 35.6892"
                    type="number"
                />
                <TextField
                    label="طول جغرافیایی (Longitude)"
                    value={form.longitude ? String(form.longitude) : ""}
                    onChange={(v) => set("longitude")(v === "" ? "" : Number(v))}
                    placeholder="مثلاً: 51.3890"
                    type="number"
                />
            </div>

            {error && <p className="text-red-500 text-xs text-right mb-3">{error}</p>}
            <button
                onClick={handleSubmit} disabled={submitting}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2"
            >
                {submitLabel}
            </button>
        </div>
    );
}