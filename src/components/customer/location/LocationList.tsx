"use client";

import { Search, MapPin, Loader2 } from "lucide-react";
import EmptyState from "@/components/shared/feedback/EmptyState";
import LocationCard from "./LocationCard";
import { LocationPayload } from "@/api/customer/location/api";

interface ILocation extends LocationPayload {
    _id: string;
}

interface LocationListProps {
    search: string;
    onSearchChange: (v: string) => void;
    locations: ILocation[];
    isLoading: boolean;
    menuOpenId: string | null;
    onToggleMenu: (id: string) => void;
    onEdit: (location: ILocation) => void;
    onDelete: (id: string) => void;
    sentinelRef: React.RefObject<HTMLDivElement | null>;
    isFetchingNextPage: boolean;
}

export default function LocationList({
    search, onSearchChange, locations, isLoading,
    menuOpenId, onToggleMenu, onEdit, onDelete,
    sentinelRef, isFetchingNextPage,
}: LocationListProps) {
    return (
        <>
            <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
                <p className="text-base font-bold text-gray-800 text-right mb-4">موقعیت‌ها</p>
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
                ) : locations.length === 0 ? (
                    <EmptyState icon={MapPin} message="موقعیتی یافت نشد" />
                ) : (
                    locations.map((loc) => (
                        <LocationCard
                            key={loc._id}
                            location={loc}
                            menuOpen={menuOpenId === loc._id}
                            onToggleMenu={() => onToggleMenu(loc._id)}
                            onEdit={() => onEdit(loc)}
                            onDelete={() => onDelete(loc._id)}
                        />
                    ))
                )}

                {!isLoading && locations.length > 0 && (
                    <div ref={sentinelRef} className="flex justify-center py-4">
                        {isFetchingNextPage && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
                    </div>
                )}
            </div>
        </>
    );
}