"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { apiClient } from "@/api/axiosClient";
import { useDashboardStats } from "@/api/customer/dashboard/queries";
import { useMe } from "@/api/auth/queries";
import { resolveImageUrl } from "@/utils/resolveImageUrl";
import { useGreeting } from "@/hooks/useGreeting";
import DashboardTipBanner from "@/components/shared/dashboard/DashboardTipBanner";
import DashboardHero from "./DashboardHero";
import NotCheckedInCard from "./NotCheckedInCard";
import StatsGrid from "./StatsGrid";
import ChartCard from "./ChartCard";
import QuickLinks from "./QuickLinks";
import PendingRequestsCard from "./PendingRequestsCard";

interface RequestItem {
    _id: string;
    requestType: "overtime" | "leave" | string;
    status: "pending" | "accepted" | "rejected";
    createdAt: string;
    user?: { name: string };
}

export default function DashboardContainer() {
    const greeting = useGreeting();
    const { data: me } = useMe();

    const [requests, setRequests] = useState<RequestItem[]>([]);
    const [requestsLoading, setRequestsLoading] = useState(true);

    const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useDashboardStats();

    const fetchRequests = useCallback(async () => {
        try {
            setRequestsLoading(true);
            const res = await apiClient.get("/api/v1/customer/requests?page=1&per_page=5");
            const data = res.data?.data?.data ?? res.data?.data ?? [];
            setRequests(Array.isArray(data) ? data : []);
        } catch {
            setRequests([]);
        } finally {
            setRequestsLoading(false);
        }
    }, []);

    useEffect(() => { fetchRequests(); }, [fetchRequests]);

    const pending = requests.filter((r) => r.status === "pending");
    const refreshing = statsLoading || requestsLoading;

    const handleRefresh = () => {
        refetchStats();
        fetchRequests();
    };

    const present = stats?.present ?? 0;
    const absent = stats?.absent ?? 0;
    const delayed = stats?.delayed ?? 0;
    const stillWorking = stats?.stillWorking ?? 0;
    const attendanceRate = stats?.totalStaff ? Math.round((present / stats.totalStaff) * 100) : 0;
    const notCheckedInCount = stats?.notCheckedInCount ?? 0;
    const notCheckedInNames = (stats?.notCheckedIn ?? []).map((u) => u.name).join("، ");
    const avatarSrc = resolveImageUrl(me?.user?.profileImage);

    return (
        <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto pb-24">
                <DashboardHero
                    greeting={greeting.text}
                    name={me?.user?.name}
                    avatarSrc={avatarSrc}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />

                <NotCheckedInCard count={notCheckedInCount} names={notCheckedInNames} />

                <div className="px-4 pt-5 space-y-4">
                    {statsLoading ? (
                        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
                    ) : (
                        <>
                            <StatsGrid
                                present={present}
                                absent={absent}
                                delayed={delayed}
                                stillWorking={stillWorking}
                                attendanceRate={attendanceRate}
                                totalStaff={stats?.totalStaff ?? 0}
                            />

                            <ChartCard present={present} absent={absent} late={delayed} />

                            <QuickLinks
                                locationsCount={stats?.locationsCount ?? 0}
                                shiftsCount={stats?.shiftsCount ?? 0}
                                pendingRequests={stats?.pendingRequests ?? 0}
                            />

                            <DashboardTipBanner
                                title="نکته مدیریتی 💡"
                                message={
                                    absent > 0
                                        ? `امروز ${absent} نفر غایب هستند. برای بررسی وضعیت به گزارشات مراجعه کنید.`
                                        : "همه کارمندان امروز حاضر بوده‌اند. عملکرد عالی است!"
                                }
                                animationDelay="340ms"
                            />

                            <PendingRequestsCard requests={pending} loading={requestsLoading} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}