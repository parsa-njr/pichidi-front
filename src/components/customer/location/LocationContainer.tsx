"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { BottomSheet, ConfirmDialog } from "@/components/ui/AppModal";
import FloatingAddButton from "@/components/ui/FloatingAddButton";
import {
    useInfiniteLocations, useCreateLocation, useUpdateLocation, useDeleteLocation,
} from "@/api/customer/location/queries";
import { LocationPayload } from "@/api/customer/location/api";
import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";
import LocationList from "./LocationList";
import LocationForm from "./LocationForm";

interface ILocation extends LocationPayload {
    _id: string;
}

export default function LocationContainer() {
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
    const [addOpen, setAddOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<ILocation | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    useEffect(() => {
        const t = setTimeout(() => setSearch(searchInput), 400);
        return () => clearTimeout(t);
    }, [searchInput]);

    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteLocations(search);
    const createLocation = useCreateLocation();
    const updateLocation = useUpdateLocation();
    const deleteLocation = useDeleteLocation();

    const locations: ILocation[] = useMemo(() => data?.items ?? [], [data]);

    const loadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const sentinelRef = useInfiniteScrollTrigger(loadMore, hasNextPage ?? false);

    const handleAdd = (payload: LocationPayload) => {
        createLocation.mutate(payload, { onSuccess: () => setAddOpen(false) });
    };

    const handleEdit = (payload: LocationPayload) => {
        if (!editTarget) return;
        updateLocation.mutate({ id: editTarget._id, payload }, { onSuccess: () => setEditTarget(null) });
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        deleteLocation.mutate(deleteTarget, { onSuccess: () => setDeleteTarget(null) });
    };

    return (
        <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
            <LocationList
                search={searchInput}
                onSearchChange={setSearchInput}
                locations={locations}
                isLoading={isLoading}
                menuOpenId={menuOpenId}
                onToggleMenu={(id) => setMenuOpenId(menuOpenId === id ? null : id)}
                onEdit={(loc) => { setEditTarget(loc); setMenuOpenId(null); }}
                onDelete={(id) => { setDeleteTarget(id); setMenuOpenId(null); }}
                sentinelRef={sentinelRef}
                isFetchingNextPage={isFetchingNextPage}
            />

            <FloatingAddButton onClick={() => setAddOpen(true)} />

            <BottomSheet title="افزودن موقعیت جدید" open={addOpen} onClose={() => setAddOpen(false)}>
                <LocationForm
                    initial={{ name: "", range: "", latitude: 35.6892, longitude: 51.389 }}
                    onSubmit={handleAdd}
                    submitting={createLocation.isPending}
                    submitLabel="افزودن"
                />
            </BottomSheet>

            <BottomSheet title="ویرایش موقعیت" open={!!editTarget} onClose={() => setEditTarget(null)}>
                {editTarget && (
                    <LocationForm
                        initial={{
                            name: editTarget.name,
                            range: String(editTarget.range),
                            latitude: editTarget.latitude,
                            longitude: editTarget.longitude,
                        }}
                        onSubmit={handleEdit}
                        submitting={updateLocation.isPending}
                        submitLabel="ویرایش"
                    />
                )}
            </BottomSheet>

            <ConfirmDialog
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                loading={deleteLocation.isPending}
                title="می‌خواهید این موقعیت را حذف کنید؟"
                variant="danger"
            />
        </div>
    );
}