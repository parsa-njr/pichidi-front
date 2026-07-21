"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { BottomSheet } from "@/components/ui/AppModal";
import DetailRow from "@/components/shared/feedback/DetailRow";
import { IUserReport, toJalali } from "./reportHelpers";

interface UserReportModalProps {
    data: IUserReport | null;
    name: string;
    open: boolean;
    onClose: () => void;
}

export default function UserReportModal({ data, name, open, onClose }: UserReportModalProps) {
    const [expanded, setExpanded] = useState<number | null>(null);

    return (
        <BottomSheet title="گزارش حضور" open={open} onClose={onClose} maxHeight="90%">
            {data && (
                <div dir="rtl">
                    <div className="flex flex-col items-center mb-5">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <User className="w-7 h-7 text-primary" />
                        </div>
                        <p className="text-base text-gray-600 font-semibold">{name}</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 mb-5 border border-gray-100">
                        <p className="text-sm font-bold text-gray-700 text-center mb-3">مجموع تردد‌ها</p>
                        <DetailRow label="مجموع ساعات حضور" value={data.totalReport.totalActualTime} />
                        <DetailRow label="مجموع تاخیر" value={data.totalReport.totalDelay} />
                        <DetailRow label="مجموع مرخصی" value={data.totalReport.totalLeaveTime} />
                    </div>

                    {data.finalReport.map((day, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-3 overflow-hidden">
                            <button
                                onClick={() => setExpanded(expanded === i ? null : i)}
                                className="w-full flex items-center justify-between px-4 py-3"
                            >
                                {expanded === i ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-800">{day.shamsiDate ?? toJalali(day.date)}</p>
                                    <p className="text-xs text-gray-400">{day.actualMinutes ?? "0"} کار شده</p>
                                </div>
                            </button>
                            {expanded === i && (
                                <div className="bg-gray-50 mx-3 mb-3 rounded-xl px-4 py-3">
                                    <DetailRow label="ورود" value={day.actualCheckIn} />
                                    <DetailRow label="خروج" value={day.actualCheckOut} />
                                    <DetailRow label="ساعات کاری" value={day.actualMinutes} />
                                    <DetailRow label="تاخیر" value={day.delayMinutes} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </BottomSheet>
    );
}