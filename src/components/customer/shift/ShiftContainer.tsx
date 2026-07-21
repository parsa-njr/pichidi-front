"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { BottomSheet, ConfirmDialog } from "@/components/ui/AppModal";
import FloatingAddButton from "@/components/ui/FloatingAddButton";
import {
    useInfiniteShifts, useCreateShift, useUpdateShift, useDeleteShift,
} from "@/api/customer/shift/queries";
import { ShiftPayload } from "@/api/customer/shift/api";
import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";
import ShiftList from "./ShiftList";
import ShiftForm from "./ShiftForm";

interface IShift extends ShiftPayload {
    _id: string;
}

export default function ShiftContainer() {
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
    const [addOpen, setAddOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<IShift | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    useEffect(() => {
        const t = setTimeout(() => setSearch(searchInput), 400);
        return () => clearTimeout(t);
    }, [searchInput]);

    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteShifts(search);
    const createShift = useCreateShift();
    const updateShift = useUpdateShift();
    const deleteShift = useDeleteShift();

    const shifts: IShift[] = useMemo(() => data?.items ?? [], [data]);

    const loadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const sentinelRef = useInfiniteScrollTrigger(loadMore, hasNextPage ?? false);

    const handleAdd = (payload: ShiftPayload) => {
        createShift.mutate(payload, { onSuccess: () => setAddOpen(false) });
    };

    const handleEdit = (payload: ShiftPayload) => {
        if (!editTarget) return;
        updateShift.mutate({ id: editTarget._id, payload }, { onSuccess: () => setEditTarget(null) });
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        deleteShift.mutate(deleteTarget, { onSuccess: () => setDeleteTarget(null) });
    };

    return (
        <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
            <ShiftList
                search={searchInput}
                onSearchChange={setSearchInput}
                shifts={shifts}
                isLoading={isLoading}
                menuOpenId={menuOpenId}
                onToggleMenu={(id) => setMenuOpenId(menuOpenId === id ? null : id)}
                onEdit={(shift) => { setEditTarget(shift); setMenuOpenId(null); }}
                onDelete={(id) => { setDeleteTarget(id); setMenuOpenId(null); }}
                sentinelRef={sentinelRef}
                isFetchingNextPage={isFetchingNextPage}
            />

            <FloatingAddButton onClick={() => setAddOpen(true)} />

            <BottomSheet title="تعریف شیفت جدید" open={addOpen} onClose={() => setAddOpen(false)}>
                <ShiftForm initial={{}} onSubmit={handleAdd} submitting={createShift.isPending} submitLabel="ثبت شیفت" />
            </BottomSheet>

            <BottomSheet title="ویرایش شیفت" open={!!editTarget} onClose={() => setEditTarget(null)}>
                {editTarget && (
                    <ShiftForm
                        initial={editTarget} onSubmit={handleEdit}
                        submitting={updateShift.isPending} submitLabel="ویرایش شیفت"
                    />
                )}
            </BottomSheet>

            <ConfirmDialog
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                loading={deleteShift.isPending}
                title="آیا از حذف این شیفت اطمینان دارید؟"
                variant="danger"
            />
        </div>
    );
}