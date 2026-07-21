"use client";

import { useState, useCallback } from "react";
import { BarChart2 } from "lucide-react";
import { useLocations } from "@/api/customer/location/queries";
import { useDateBaseReport, useLocationUsers, useUserReport } from "@/api/customer/report/queries";
import ReportFilters from "./ReportFilters";
import DailyReportList from "./DailyReportList";
import EmployeeReportList from "./EmployeeReportList";
import DayUsersModal from "./DayUsersModal";
import UserReportModal from "./UserReportModal";
import { IDayReport, IUserListItem, IUserReport } from "./reportHelpers";

export default function ReportContainer() {
    const [tab, setTab] = useState<"daily" | "employee">("daily");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [location, setLocation] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const [dailyData, setDailyData] = useState<IDayReport[]>([]);
    const [dayModal, setDayModal] = useState<IDayReport | null>(null);

    const [userList, setUserList] = useState<IUserListItem[]>([]);
    const [userReport, setUserReport] = useState<{ data: IUserReport; name: string } | null>(null);
    const [userLoadingId, setUserLoadingId] = useState<string | null>(null);

    const { data: locations = [] } = useLocations();
    const dateBaseReport = useDateBaseReport();
    const locationUsers = useLocationUsers();
    const userReportMutation = useUserReport();

    const loading = dateBaseReport.isPending || locationUsers.isPending;

    const resetFilters = (updater: () => void) => {
        updater();
        setSubmitted(false);
    };

    const handleSubmit = useCallback(() => {
        if (!startDate || !endDate || !location) return;
        setSubmitted(true);

        if (tab === "daily") {
            dateBaseReport.mutate(
                { startDate, endDate, location },
                { onSuccess: (data) => setDailyData(Array.isArray(data) ? data : []) }
            );
        } else {
            locationUsers.mutate(location, {
                onSuccess: (res: any) => setUserList(res?.data?.data ?? res?.data ?? []),
            });
        }
    }, [startDate, endDate, location, tab, dateBaseReport, locationUsers]);

    const fetchUserReport = (user: IUserListItem) => {
        setUserLoadingId(user._id);
        userReportMutation.mutate(
            { userId: user._id, startDate, endDate },
            {
                onSuccess: (res: any) => setUserReport({ data: res, name: user.name }),
                onSettled: () => setUserLoadingId(null),
            }
        );
    };

    return (
        <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
            <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
                <p className="text-base font-bold text-gray-800 text-right mb-4">گزارشات</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
                <ReportFilters
                    tab={tab}
                    onTabChange={(t) => resetFilters(() => setTab(t))}
                    startDate={startDate}
                    onStartDateChange={(v) => resetFilters(() => setStartDate(v))}
                    endDate={endDate}
                    onEndDateChange={(v) => resetFilters(() => setEndDate(v))}
                    location={location}
                    onLocationChange={(v) => resetFilters(() => setLocation(v))}
                    locations={locations}
                    onSubmit={handleSubmit}
                    loading={loading}
                    submitDisabled={!startDate || !endDate || !location || submitted}
                />

                {!submitted ? (
                    <div className="flex flex-col items-center pt-10 gap-3">
                        <BarChart2 className="w-12 h-12 text-gray-200" />
                        <p className="text-gray-400 text-sm text-center px-8">فیلترها را پر کرده و دکمه مشاهده را بزنید</p>
                    </div>
                ) : tab === "daily" ? (
                    <DailyReportList loading={loading} data={dailyData} onSelectDay={setDayModal} />
                ) : (
                    <EmployeeReportList
                        loading={loading}
                        users={userList}
                        loadingUserId={userLoadingId}
                        onSelectUser={fetchUserReport}
                    />
                )}
            </div>

            <DayUsersModal
                users={dayModal?.users ?? []}
                date={dayModal?.date ?? ""}
                open={!!dayModal}
                onClose={() => setDayModal(null)}
            />

            <UserReportModal
                data={userReport?.data ?? null}
                name={userReport?.name ?? ""}
                open={!!userReport}
                onClose={() => setUserReport(null)}
            />
        </div>
    );
}