"use client";

import { useState, useMemo, useCallback } from "react";
import { BottomSheet, ConfirmDialog } from "@/components/ui/AppModal";
import { useInfiniteCustomerRequests, useUpdateRequestStatus } from "@/api/customer/request/queries";
import { IRequest } from "@/api/customer/request/api";
import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";
import RequestFilterChips, { RequestFilterKey } from "./RequestFilterChips";
import RequestList from "./RequestList";
import RequestDetailSheet from "./RequestDetailSheet";

export default function RequestContainer() {
    const [statusFilter, setStatusFilter] = useState<RequestFilterKey>("all");
    const [selected, setSelected] = useState<IRequest | null>(null);
    const [confirmAccept, setConfirmAccept] = useState(false);

    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteCustomerRequests();
    const updateStatus = useUpdateRequestStatus();

    const requests: IRequest[] = useMemo(() => data?.items ?? [], [data]);

    // status filter stays client-side since backend searchFilter only covers `status` as free text,
    // not as an exact-match chip filter — this keeps the chip UX instant without extra requests
    const filtered = requests.filter((r) => statusFilter === "all" || r.status === statusFilter);

    const loadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const sentinelRef = useInfiniteScrollTrigger(loadMore, hasNextPage ?? false);

    const handleAccept = () => {
        if (!selected) return;
        updateStatus.mutate(
            { id: selected._id, payload: { status: "accepted" } },
            { onSuccess: () => { setConfirmAccept(false); setSelected(null); } }
        );
    };

    const handleReject = (note: string) => {
        if (!selected) return;
        updateStatus.mutate(
            { id: selected._id, payload: { status: "rejected", customerNote: note } },
            { onSuccess: () => setSelected(null) }
        );
    };

    return (
        <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
            <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
                <p className="text-base font-bold text-gray-800 text-right mb-4">درخواست‌ها</p>
                <RequestFilterChips active={statusFilter} onChange={setStatusFilter} />
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 pb-24">
                <RequestList
                    isLoading={isLoading}
                    requests={filtered}
                    onSelect={setSelected}
                    sentinelRef={sentinelRef}
                    isFetchingNextPage={isFetchingNextPage}
                />
            </div>

            <BottomSheet title="جزئیات درخواست" open={!!selected} onClose={() => setSelected(null)}>
                {selected && (
                    <RequestDetailSheet
                        req={selected}
                        acting={updateStatus.isPending}
                        onAccept={() => setConfirmAccept(true)}
                        onReject={handleReject}
                    />
                )}
            </BottomSheet>

            <ConfirmDialog
                open={confirmAccept}
                onClose={() => setConfirmAccept(false)}
                onConfirm={handleAccept}
                loading={updateStatus.isPending}
                title="این درخواست پذیرفته شود؟"
                confirmText="بله، پذیرفتن"
                variant="primary"
            />
        </div>
    );
}