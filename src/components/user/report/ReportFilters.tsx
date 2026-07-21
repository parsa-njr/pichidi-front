"use client";

import { ChevronDown, Loader2, Download } from "lucide-react";
import { MONTHS, YEARS } from "./reportHelpers";

interface ReportFiltersProps {
    month: string;
    onMonthChange: (v: string) => void;
    year: string;
    onYearChange: (v: string) => void;
    onShowReport: () => void;
    onDownload: () => void;
    isFetching: boolean;
    isDownloading: boolean;
}

export default function ReportFilters({
    month, onMonthChange, year, onYearChange,
    onShowReport, onDownload, isFetching, isDownloading,
}: ReportFiltersProps) {
    const disabled = !month || !year;

    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
            <p className="text-sm text-gray-500 text-right mb-3">بازه مورد نظر را انتخاب کنید</p>

            <div className="flex gap-3 mb-4">
                <div className="flex-1">
                    <label className="block text-xs text-gray-400 text-right mb-1.5">ماه</label>
                    <div className="relative">
                        <select
                            value={month}
                            onChange={(e) => onMonthChange(e.target.value)}
                            dir="rtl"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-right appearance-none focus:outline-none focus:border-primary"
                        >
                            <option value="" disabled>انتخاب ماه</option>
                            {MONTHS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                        </select>
                        <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                <div className="flex-1">
                    <label className="block text-xs text-gray-400 text-right mb-1.5">سال</label>
                    <div className="relative">
                        <select
                            value={year}
                            onChange={(e) => onYearChange(e.target.value)}
                            dir="rtl"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-right appearance-none focus:outline-none focus:border-primary"
                        >
                            {YEARS.map((y) => <option key={y.value} value={y.value}>{y.label}</option>)}
                        </select>
                        <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            <button
                onClick={onShowReport}
                disabled={disabled || isFetching}
                className="w-full bg-primary text-white py-3 rounded-xl text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2 mb-3"
            >
                {isFetching && <Loader2 className="w-4 h-4 animate-spin" />}
                مشاهده گزارش
            </button>

            <button
                onClick={onDownload}
                disabled={disabled || isDownloading}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {isDownloading
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Download className="w-4 h-4" />}
                دانلود فایل اکسل
            </button>
        </div>
    );
}