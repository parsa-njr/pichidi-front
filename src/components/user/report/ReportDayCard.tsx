"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import DetailRow from "@/components/shared/feedback/DetailRow";
import StatusBadge from "@/components/shared/feedback/StatusBadge";
import { IDayReport, STATUS_LABEL, toJalali } from "./reportHelpers";

interface ReportDayCardProps {
    day: IDayReport;
    expanded: boolean;
    onToggle: () => void;
}

export default function ReportDayCard({ day, expanded, onToggle }: ReportDayCardProps) {
    const s = STATUS_LABEL[day.status] ?? { label: day.status, color: "text-gray-500", bg: "bg-gray-100" };
    const dateLabel = day.shamsiDate ?? toJalali(day.date);

    return (
        <div dir="rtl" className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-3 overflow-hidden">
            <button onClick={onToggle} className="w-full flex items-center justify-between px-4 py-3.5">
                <div className="flex items-center gap-3  justify-start">
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-800">{dateLabel}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {day.actualMinutes ? `${day.actualMinutes} کار شده` : "—"}
                        </p>
                    </div>
                    <StatusBadge label={s.label} className={`${s.bg} ${s.color}`} />
                </div>
                {expanded
                    ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
            </button>

            {expanded && (
                <div className="bg-gray-50 mx-3 mb-3 rounded-xl px-4 py-3">
                    <DetailRow label="ورود" value={day.actualCheckIn} />
                    <DetailRow label="خروج" value={day.actualCheckOut} />
                    <DetailRow label="ساعات کاری" value={day.actualMinutes} />
                    <DetailRow label="مرخصی" value={day.leaveMinutes} />
                    <DetailRow label="اضافه‌کاری" value={day.overtimeMinutes} />
                    <DetailRow label="تاخیر" value={day.delayMinutes} />
                    <DetailRow label="کسری" value={day.deficitMinutes} />
                </div>
            )}
        </div>
    );
}