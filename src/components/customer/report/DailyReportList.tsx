"use client";

import { ChevronDown, Calendar, Loader2 } from "lucide-react";
import EmptyState from "@/components/shared/feedback/EmptyState";
import { FileText } from "lucide-react";
import { IDayReport, toJalali } from "./reportHelpers";

function DayCard({ date, onClick }: { date: string; onClick: () => void }) {
    return (
        <button
            dir="rtl"
            onClick={onClick}
            className="w-full bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center justify-between"
        >
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-gray-800">{toJalali(date)}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
    );
}

interface DailyReportListProps {
    loading: boolean;
    data: IDayReport[];
    onSelectDay: (day: IDayReport) => void;
}

export default function DailyReportList({ loading, data, onSelectDay }: DailyReportListProps) {
    if (loading) {
        return (
            <div className="flex justify-center pt-10">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
        );
    }

    if (data.length === 0) {
        return <EmptyState icon={FileText} message="داده‌ای یافت نشد" />;
    }

    return (
        <>
            {data.map((day, i) => (
                <DayCard key={i} date={day.date} onClick={() => onSelectDay(day)} />
            ))}
        </>
    );
}