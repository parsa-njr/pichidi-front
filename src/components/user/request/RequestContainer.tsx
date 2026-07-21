"use client";

import { useState, useMemo, useCallback } from "react";
import { BottomSheet } from "@/components/ui/AppModal";
import FloatingAddButton from "@/components/ui/FloatingAddButton";
import { useInfiniteRequests, useCreateRequest } from "@/api/user/request/queries";
import { IRequest } from "@/api/user/request/api";
import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";
import RequestList from "./RequestList";
import RequestForm, { RequestFormValues } from "./RequestForm";
import RequestDetailSheet from "./RequestDetailSheet";

export default function RequestContainer() {
    const [addOpen, setAddOpen] = useState(false);
    const [selected, setSelected] = useState<IRequest | null>(null);

    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteRequests();
    const createRequest = useCreateRequest();

    const requests: IRequest[] = useMemo(() => data?.items ?? [], [data]);

    const loadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const sentinelRef = useInfiniteScrollTrigger(loadMore, hasNextPage ?? false);

    const handleAdd = (v: RequestFormValues) => {
        createRequest.mutate(
            { requestType: v.requestType, startDate: v.startDate, endDate: v.endDate, userNote: v.note },
            { onSuccess: () => setAddOpen(false) }
        );
    };

    return (
        <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
            <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
                <p className="text-base font-bold text-gray-800 text-right mb-4">درخواست‌های من</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 pb-24">
                <RequestList
                    isLoading={isLoading}
                    requests={requests}
                    onSelect={setSelected}
                    sentinelRef={sentinelRef}
                    isFetchingNextPage={isFetchingNextPage}
                />
            </div>

            <FloatingAddButton onClick={() => setAddOpen(true)} />

            <BottomSheet title="درخواست جدید" open={addOpen} onClose={() => setAddOpen(false)}>
                <RequestForm onSubmit={handleAdd} submitting={createRequest.isPending} />
            </BottomSheet>

            <BottomSheet title="جزئیات" open={!!selected} onClose={() => setSelected(null)}>
                {selected && <RequestDetailSheet req={selected} />}
            </BottomSheet>
        </div>
    );
}