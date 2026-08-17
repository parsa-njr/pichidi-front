"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { BottomSheet } from "@/components/ui/AppModal";
import DetailRow from "@/components/shared/feedback/DetailRow";
import { IUserDayReport, STATUS_LABEL, toJalali } from "./reportHelpers";

interface DayUsersModalProps {
    users: IUserDayReport[];
    date: string;
    open: boolean;
    onClose: () => void;
}

export default function DayUsersModal({ users, date, open, onClose }: DayUsersModalProps) {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <BottomSheet title={toJalali(date)} open={open} onClose={onClose} maxHeight="85%">
            <div dir="rtl">
                {users.map((u) => {
                    const statusKey = u.report?.status ?? u.status ?? "";
                    const statusMeta =
                        STATUS_LABEL[statusKey] ?? { label: statusKey || "—", color: "text-gray-500", bg: "bg-gray-100" };
                    const isExpanded = expanded === u.userId;

                    return (
                        <div key={u.userId} className="mb-2">
                            <button
                                onClick={() => setExpanded(isExpanded ? null : u.userId)}
                                className="w-full flex items-center gap-3 py-3 border-b border-gray-100"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <User className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 text-right">
                                    <p className="text-sm font-semibold text-gray-800">{u.name}</p>
                                    <span
                                        className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${statusMeta.bg} ${statusMeta.color}`}
                                    >
                                        {statusMeta.label}
                                    </span>
                                </div>
                                {isExpanded ? (
                                    <ChevronUp className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                )}
                            </button>
                            {isExpanded && statusKey !== "invalidShiftDay" && (
                                <div className="bg-gray-50 rounded-xl mx-1 my-2 px-4 py-3">
                                    <DetailRow label="ورود" value={u.report?.actualCheckIn} />
                                    <DetailRow label="خروج" value={u.report?.actualCheckOut} />
                                    <DetailRow label="ساعات کاری" value={u.report?.actualMinutes} />
                                    <DetailRow label="مرخصی" value={u.report?.leaveMinutes} />
                                    <DetailRow label="اضافه‌کاری" value={u.report?.overtimeMinutes} />
                                    <DetailRow label="تاخیر" value={u.report?.delayMinutes} />
                                    <DetailRow label="کسری" value={u.report?.deficitMinutes} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </BottomSheet>
    );
}