"use client";

import { Loader2, FileText } from "lucide-react";
import EmptyState from "@/components/shared/feedback/EmptyState";
import RequestCard from "./RequestCard";
import { IRequest } from "@/api/user/request/api";

interface RequestListProps {
    isLoading: boolean;
    requests: IRequest[];
    onSelect: (req: IRequest) => void;
    sentinelRef: React.RefObject<HTMLDivElement | null>;
    isFetchingNextPage: boolean;
}

export default function RequestList({ isLoading, requests, onSelect, sentinelRef, isFetchingNextPage }: RequestListProps) {
    if (isLoading) {
        return <div className="flex justify-center pt-16 text-sm text-gray-400">در حال بارگذاری...</div>;
    }

    if (requests.length === 0) {
        return <EmptyState icon={FileText} message="هیچ درخواستی ثبت نشده" />;
    }

    return (
        <>
            {requests.map((req) => (
                <RequestCard key={req._id} req={req} onClick={() => onSelect(req)} />
            ))}

            <div ref={sentinelRef} className="flex justify-center py-4">
                {isFetchingNextPage && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
            </div>
        </>
    );
}