"use client";

import { Search, Users, Loader2 } from "lucide-react";
import EmptyState from "@/components/shared/feedback/EmptyState";
import StaffCard from "./StaffCard";

interface IUser {
    _id: string;
    name: string;
    phone: string;
    profileImage?: string;
    location: { _id: string; name: string };
    shift: { _id: string; shiftName: string };
}

interface StaffListProps {
    search: string;
    onSearchChange: (v: string) => void;
    users: IUser[];
    isLoading: boolean;
    menuOpenId: string | null;
    onToggleMenu: (id: string) => void;
    onEdit: (user: IUser) => void;
    onDelete: (id: string) => void;
    sentinelRef: React.RefObject<HTMLDivElement | null>;
    isFetchingNextPage: boolean;
}

export default function StaffList({
    search,
    onSearchChange,
    users,
    isLoading,
    menuOpenId,
    onToggleMenu,
    onEdit,
    onDelete,
    sentinelRef,
    isFetchingNextPage,
}: StaffListProps) {
    return (
        <>
            <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
                <p className="text-base font-bold text-gray-800 text-right mb-4">کارمندان</p>
                <div className="relative">
                    <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        dir="rtl"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="جستجو…"
                        className="w-full bg-gray-100 rounded-full pr-10 pl-4 py-2.5 text-sm focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 pb-24">
                {isLoading ? (
                    <div className="flex justify-center pt-16">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                ) : users.length === 0 ? (
                    <EmptyState icon={Users} message="کاربری یافت نشد" />
                ) : (
                    users.map((user) => (
                        <StaffCard
                            key={user._id}
                            user={user}
                            menuOpen={menuOpenId === user._id}
                            onToggleMenu={() => onToggleMenu(user._id)}
                            onEdit={() => onEdit(user)}
                            onDelete={() => onDelete(user._id)}
                        />
                    ))
                )}

                {!isLoading && users.length > 0 && (
                    <div ref={sentinelRef} className="flex justify-center py-4">
                        {isFetchingNextPage && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
                    </div>
                )}
            </div>
        </>
    );
}