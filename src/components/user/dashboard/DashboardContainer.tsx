"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/AppModal";
import { useTodayStatus, useCheckIn, useCheckOut } from "@/api/user/attendance/queries";
import { useMonthlyReport } from "@/api/user/report/queries";
import { useMe } from "@/api/auth/queries";
import { getCurrentJalali } from "@/utils/getCurrentJalali";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useGreeting } from "@/hooks/useGreeting";
import { resolveImageUrl } from "@/utils/resolveImageUrl";
import DashboardTipBanner from "@/components/shared/dashboard/DashboardTipBanner";
import DashboardHero from "./DashboardHero";
import CheckStatusCard from "./CheckStatusCard";
import MonthStats from "./MonthStats";

export default function DashboardContainer() {
    const greeting = useGreeting();
    const { data: me } = useMe();
    const { year, month } = getCurrentJalali();

    const { data: status, isLoading: statusLoading } = useTodayStatus();
    const { data: monthly, isLoading: monthlyLoading } = useMonthlyReport(month, year);

    const checkIn = useCheckIn();
    const checkOut = useCheckOut();

    const isCheckedIn = !!status?.isCheckedIn;
    const checkInTime = status?.checkInTime
        ? new Date(status.checkInTime).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })
        : null;

    const acting = checkIn.isPending || checkOut.isPending;

    const { status: locationStatus, coords: location, retry: retryLocation } = useGeolocation();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const today = new Intl.DateTimeFormat("fa-IR", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
    }).format(new Date());

    const handleConfirm = () => {
        if (!location) return;
        const payload = { lat: location.latitude, lng: location.longitude };
        if (isCheckedIn) checkOut.mutate(payload, { onSuccess: () => setConfirmOpen(false) });
        else checkIn.mutate(payload, { onSuccess: () => setConfirmOpen(false) });
    };

    const statusCount = monthly?.totalReport?.statusCount ?? {};
    const presentDays = (statusCount.fullPresent ?? 0) + (statusCount.delay ?? 0);
    const absentDays = statusCount.absent ?? 0;
    const lateDays = statusCount.delay ?? 0;
    const totalHours = monthly?.totalReport?.totalActualTime ?? "۰۰:۰۰";

    const avatarSrc = resolveImageUrl(me?.user?.profileImage);

    return (
        <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto pb-24">
                <DashboardHero
                    greeting={greeting.text}
                    Icon={greeting.Icon}
                    name={me?.user?.name}
                    avatarSrc={avatarSrc}
                    dateLabel={today}
                />

                <CheckStatusCard
                    statusLoading={statusLoading}
                    isCheckedIn={isCheckedIn}
                    checkInTime={checkInTime}
                    acting={acting}
                    onCheckClick={() => setConfirmOpen(true)}
                    locationStatus={locationStatus}
                    onRetryLocation={retryLocation}
                />

                <div className="px-4 pt-5 space-y-4">
                    <DashboardTipBanner
                        title="انگیزه روزانه 💬"
                        message="موفقیت مجموع تلاش‌های کوچک است که هر روز تکرار می‌شود."
                        animationDelay="140ms"
                    />

                    <MonthStats
                        loading={monthlyLoading}
                        presentDays={presentDays}
                        absentDays={absentDays}
                        lateDays={lateDays}
                        totalHours={totalHours}
                    />
                </div>
            </div>

            <ConfirmDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleConfirm}
                loading={acting}
                title={isCheckedIn ? "می‌خواهید خروج خود را ثبت کنید؟" : "می‌خواهید ورود خود را ثبت کنید؟"}
                confirmText="بله، ثبت کن"
                variant={isCheckedIn ? "danger" : "primary"}
            />
        </div>
    );
}