"use client";

import { User, Loader2 } from "lucide-react";
import EmptyState from "@/components/shared/feedback/EmptyState";
import { IUserListItem } from "./reportHelpers";

interface EmployeeReportListProps {
    loading: boolean;
    users: IUserListItem[];
    loadingUserId: string | null;
    onSelectUser: (user: IUserListItem) => void;
}

export default function EmployeeReportList({ loading, users, loadingUserId, onSelectUser }: EmployeeReportListProps) {
    if (loading) {
        return (
            <div className="flex justify-center pt-10">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
        );
    }

    if (users.length === 0) {
        return <EmptyState icon={User} message="کارمندی یافت نشد" />;
    }

    return (
        <>
            {users.map((u) => (
                <button
                    key={u._id}
                    dir="rtl"
                    onClick={() => onSelectUser(u)}
                    className="w-full bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center gap-3"
                >
                    {loadingUserId === u._id ? (
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-primary" />
                        </div>
                    )}
                    <div className="flex-1 text-right">
                        <p className="text-sm font-semibold text-gray-800">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.phone}</p>
                    </div>
                </button>
            ))}
        </>
    );
}