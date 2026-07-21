"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { BottomSheet } from "@/components/ui/AppModal";
import DetailRow from "@/components/shared/feedback/DetailRow";
import { IUserDayReport, toJalali } from "./reportHelpers";

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
                {users.map((u) => (
                    <div key={u.id} className="mb-2">
                        <button
                            onClick={() => setExpanded(expanded === u.id ? null : u.id)}
                            className="w-full flex items-center gap-3 py-3 border-b border-gray-100"
                        >
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 text-right">
                                <p className="text-sm font-semibold text-gray-800">{u.name}</p>
                                <p className="text-xs text-gray-400">{u.report?.status ?? u.status}</p>
                            </div>
                            {expanded === u.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </button>
                        {expanded === u.id && u.report?.status !== "invalidShiftDay" && (
                            <div className="bg-gray-50 rounded-xl mx-1 my-2 px-4 py-3">
                                <DetailRow label="ورود" value={u.report?.actualCheckIn} />
                                <DetailRow label="خروج" value={u.report?.actualCheckOut} />
                                <DetailRow label="ساعات کاری" value={u.report?.actualMinutes} />
                                <DetailRow label="غیبت" value={u.report?.leaveMinutes} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </BottomSheet>
    );
}