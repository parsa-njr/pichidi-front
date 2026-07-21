"use client";

import { ChevronDown, Loader2, BarChart2 } from "lucide-react";
import DateField from "@/components/ui/DateField";

interface ReportFiltersProps {
    tab: "daily" | "employee";
    onTabChange: (t: "daily" | "employee") => void;
    startDate: string;
    onStartDateChange: (v: string) => void;
    endDate: string;
    onEndDateChange: (v: string) => void;
    location: string;
    onLocationChange: (v: string) => void;
    locations: { _id: string; name: string }[];
    onSubmit: () => void;
    loading: boolean;
    submitDisabled: boolean;
}

const TABS = [
    { key: "daily", label: "روزانه" },
    { key: "employee", label: "کارمند" },
] as const;

export default function ReportFilters({
    tab, onTabChange,
    startDate, onStartDateChange,
    endDate, onEndDateChange,
    location, onLocationChange,
    locations, onSubmit, loading, submitDisabled,
}: ReportFiltersProps) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
            <div className="flex gap-3 mb-4">
                <DateField label="تاریخ شروع" value={startDate} onChange={onStartDateChange} />
                <DateField label="تاریخ پایان" value={endDate} onChange={onEndDateChange} />
            </div>

            <div className="relative mb-4">
                <label className="block text-xs text-gray-400 text-right mb-1">موقعیت</label>
                <select
                    value={location}
                    onChange={(e) => onLocationChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-right appearance-none focus:outline-none focus:border-primary"
                    dir="rtl"
                >
                    <option value="" disabled>انتخاب موقعیت</option>
                    {locations.map((l) => (
                        <option key={l._id} value={l._id}>{l.name}</option>
                    ))}
                </select>
                <ChevronDown className="absolute left-3 top-9 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="flex gap-2 mb-4">
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => onTabChange(t.key)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === t.key ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <button
                onClick={onSubmit}
                disabled={submitDisabled}
                className="w-full bg-primary text-white py-3 rounded-xl text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <BarChart2 className="w-4 h-4" />
                مشاهده گزارش
            </button>
        </div>
    );
}