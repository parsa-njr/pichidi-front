"use client";

import { useState } from "react";
// import TextField from "@/components/shared/fields/TextField";
import SelectField from "@/components/shared/fields/SelectField";
import TextField from "@/components/shared/fields/TextField";

export interface StaffFormValues {
    name: string;
    phone: string;
    password: string;
    location: string;
    shift: string;
}

interface StaffFormProps {
    initial: StaffFormValues;
    locations: { _id: string; name: string }[];
    shifts: { _id: string; shiftName: string }[];
    onSubmit: (v: StaffFormValues) => void;
    submitting: boolean;
    submitLabel: string;
}

export default function StaffForm({
    initial,
    locations,
    shifts,
    onSubmit,
    submitting,
    submitLabel,
}: StaffFormProps) {
    const [form, setForm] = useState<StaffFormValues>(initial);
    const [error, setError] = useState("");
    const set = (key: keyof StaffFormValues) => (v: string) =>
        setForm((f) => ({ ...f, [key]: v }));

    const handleSubmit = () => {
        if (!form.name || !form.phone || !form.location || !form.shift) {
            setError("همه فیلدهای ضروری را پر کنید");
            return;
        }
        setError("");
        onSubmit(form);
    };

    return (
        <div dir="rtl">
            <TextField label="نام" value={form.name} onChange={set("name")} placeholder="نام کارمند" />
            <TextField label="شماره تماس" value={form.phone} onChange={set("phone")} placeholder="09xxxxxxxxx" type="tel" />
            <TextField
                label="رمز عبور"
                value={form.password}
                onChange={set("password")}
                placeholder={submitLabel === "ویرایش" ? "اگر خالی باشد تغییر نمی‌کند" : "رمز عبور"}
                type="password"
            />
            <SelectField
                label="موقعیت"
                value={form.location}
                onChange={set("location")}
                options={locations.map((l) => ({ value: l._id, label: l.name }))}
                placeholder="انتخاب موقعیت"
            />
            <SelectField
                label="شیفت"
                value={form.shift}
                onChange={set("shift")}
                options={shifts.map((s) => ({ value: s._id, label: s.shiftName }))}
                placeholder="انتخاب شیفت"
            />
            {error && <p className="text-red-500 text-xs text-right mb-3">{error}</p>}
            <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2"
            >
                {submitLabel}
            </button>
        </div>
    );
}