"use client";

import { useState } from "react";
import SelectField from "@/components/shared/fields/SelectField";
import DateTimeField from "@/components/shared/fields/DateTimeField";
import { RequestType } from "@/api/user/request/api";
import { REQUEST_TYPE_LABELS } from "@/components/shared/request/RequestLabel";

export interface RequestFormValues {
    requestType: RequestType;
    startDate: string;
    endDate: string;
    note: string;
}

interface RequestFormProps {
    onSubmit: (v: RequestFormValues) => void;
    submitting: boolean;
}

export default function RequestForm({ onSubmit, submitting }: RequestFormProps) {
    const [form, setForm] = useState({
        requestType: "" as RequestType | "",
        startDate: "",
        endDate: "",
        note: "",
    });
    const [error, setError] = useState("");
    const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

    const handleSubmit = () => {
        if (!form.requestType || !form.startDate || !form.endDate) {
            setError("نوع درخواست، تاریخ شروع و پایان الزامی است");
            return;
        }
        setError("");
        onSubmit({
            requestType: form.requestType as RequestType,
            startDate: form.startDate,
            endDate: form.endDate,
            note: form.note,
        });
    };

    return (
        <div dir="rtl">
            <SelectField
                label="نوع درخواست"
                value={form.requestType}
                onChange={set("requestType")}
                options={Object.entries(REQUEST_TYPE_LABELS).map(([v, l]) => ({ value: v, label: l }))}
                placeholder="انتخاب نوع"
            />

            <div className="mb-4">
                <DateTimeField label="تاریخ و ساعت شروع" value={form.startDate} onChange={set("startDate")} />
            </div>
            <div className="mb-4">
                <DateTimeField label="تاریخ و ساعت پایان" value={form.endDate} onChange={set("endDate")} />
            </div>

            <div className="mb-5" dir="rtl">
                <label className="block text-xs text-gray-500 mb-1.5">توضیحات (اختیاری)</label>
                <textarea
                    value={form.note}
                    onChange={(e) => set("note")(e.target.value)}
                    placeholder="توضیحات خود را وارد کنید"
                    rows={3}
                    dir="rtl"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-right resize-none focus:outline-none focus:border-primary"
                />
            </div>

            {error && <p className="text-red-500 text-xs text-right mb-3">{error}</p>}

            <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
            >
                ثبت درخواست
            </button>
        </div>
    );
}