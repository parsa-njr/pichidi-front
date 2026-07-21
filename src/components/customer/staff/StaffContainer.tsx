"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { BottomSheet, ConfirmDialog } from "@/components/ui/AppModal";
import FloatingAddButton from "@/components/ui/FloatingAddButton";
import { useLocations } from "@/api/customer/location/queries";
import { useShifts } from "@/api/customer/shift/queries";
import {
    useInfiniteStaff,
    useCreateStaff,
    useUpdateStaff,
    useDeleteStaff,
} from "@/api/customer/staff/queries";
import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";
import StaffList from "./StaffList";
import StaffForm, { StaffFormValues } from "./StaffForm";

interface IUser {
    _id: string;
    name: string;
    phone: string;
    profileImage?: string;
    location: { _id: string; name: string };
    shift: { _id: string; shiftName: string };
}

export default function StaffContainer() {
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
    const [addOpen, setAddOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<IUser | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    useEffect(() => {
        const t = setTimeout(() => setSearch(searchInput), 400);
        return () => clearTimeout(t);
    }, [searchInput]);

    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useInfiniteStaff(search);
    const { data: locations = [] } = useLocations();
    const { data: shifts = [] } = useShifts();

    const createStaff = useCreateStaff();
    const updateStaff = useUpdateStaff();
    const deleteStaff = useDeleteStaff();

    const users: IUser[] = useMemo(() => data?.items ?? [], [data]);

    const loadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const sentinelRef = useInfiniteScrollTrigger(loadMore, hasNextPage ?? false);

    const handleAdd = (form: StaffFormValues) => {
        createStaff.mutate(form, { onSuccess: () => setAddOpen(false) });
    };

    const handleEdit = (form: StaffFormValues) => {
        if (!editTarget) return;
        const payload: Record<string, string> = {
            name: form.name,
            phone: form.phone,
            location: form.location,
            shift: form.shift,
        };
        if (form.password) payload.password = form.password;
        updateStaff.mutate(
            { id: editTarget._id, payload },
            { onSuccess: () => setEditTarget(null) }
        );
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        deleteStaff.mutate(deleteTarget, { onSuccess: () => setDeleteTarget(null) });
    };

    return (
        <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
            <StaffList
                search={searchInput}
                onSearchChange={setSearchInput}
                users={users}
                isLoading={isLoading}
                menuOpenId={menuOpenId}
                onToggleMenu={(id) => setMenuOpenId(menuOpenId === id ? null : id)}
                onEdit={(user) => {
                    setEditTarget(user);
                    setMenuOpenId(null);
                }}
                onDelete={(id) => {
                    setDeleteTarget(id);
                    setMenuOpenId(null);
                }}
                sentinelRef={sentinelRef}
                isFetchingNextPage={isFetchingNextPage}
            />

            <FloatingAddButton onClick={() => setAddOpen(true)} />

            <BottomSheet title="افزودن کارمند جدید" open={addOpen} onClose={() => setAddOpen(false)}>
                <StaffForm
                    initial={{ name: "", phone: "", password: "", location: "", shift: "" }}
                    locations={locations}
                    shifts={shifts}
                    onSubmit={handleAdd}
                    submitting={createStaff.isPending}
                    submitLabel="افزودن"
                />
            </BottomSheet>

            <BottomSheet title="ویرایش کارمند" open={!!editTarget} onClose={() => setEditTarget(null)}>
                {editTarget && (
                    <StaffForm
                        initial={{
                            name: editTarget.name,
                            phone: editTarget.phone,
                            password: "",
                            location: editTarget.location?._id ?? "",
                            shift: editTarget.shift?._id ?? "",
                        }}
                        locations={locations}
                        shifts={shifts}
                        onSubmit={handleEdit}
                        submitting={updateStaff.isPending}
                        submitLabel="ویرایش"
                    />
                )}
            </BottomSheet>

            <ConfirmDialog
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                loading={deleteStaff.isPending}
                title="می‌خواهید این کاربر را حذف کنید؟"
                variant="danger"
            />
        </div>
    );
}