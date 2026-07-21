"use client";

import { Search, Clock, Loader2 } from "lucide-react";
import EmptyState from "@/components/shared/feedback/EmptyState";
import ShiftCard from "./ShiftCard";
import { ShiftPayload } from "@/api/customer/shift/api";

interface IShift extends ShiftPayload {
    _id: string;
}

interface ShiftListProps {
    search: string;
    onSearchChange: (v: string) => void;
    shifts: IShift[];
    isLoading: boolean;
    menuOpenId: string | null;
    onToggleMenu: (id: string) => void;
    onEdit: (shift: IShift) => void;
    onDelete: (id: string) => void;
    sentinelRef: React.RefObject<HTMLDivElement | null>;
    isFetchingNextPage: boolean;
}

export default function ShiftList({
    search, onSearchChange, shifts, isLoading,
    menuOpenId, onToggleMenu, onEdit, onDelete,
    sentinelRef, isFetchingNextPage,
}: ShiftListProps) {
    return (
        <>
            <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
                <p className="text-base font-bold text-gray-800 text-right mb-4">شیفت‌ها</p>
                <div className="relative">
                    <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        dir="rtl" value={search} onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="جستجو…"
                        className="w-full bg-gray-100 rounded-full pr-10 pl-4 py-2.5 text-sm focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 pb-24">
                {isLoading ? (
                    <div className="flex justify-center pt-16 text-sm text-gray-400">در حال بارگذاری...</div>
                ) : shifts.length === 0 ? (
                    <EmptyState icon={Clock} message="شیفتی یافت نشد" />
                ) : (
                    shifts.map((shift) => (
                        <ShiftCard
                            key={shift._id}
                            shift={shift}
                            menuOpen={menuOpenId === shift._id}
                            onToggleMenu={() => onToggleMenu(shift._id)}
                            onEdit={() => onEdit(shift)}
                            onDelete={() => onDelete(shift._id)}
                        />
                    ))
                )}

                {!isLoading && shifts.length > 0 && (
                    <div ref={sentinelRef} className="flex justify-center py-4">
                        {isFetchingNextPage && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
                    </div>
                )}
            </div>
        </>
    );
}