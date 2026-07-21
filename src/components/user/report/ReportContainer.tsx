"use client";

import { useState } from "react";
import { Loader2, BarChart2 } from "lucide-react";
import { toast } from "react-toastify";
import { useMonthlyReport, useDownloadReport } from "@/api/user/report/queries";
import ReportFilters from "./ReportFilters";
import ReportSummaryCard from "./ReportSummaryCard";
import ReportDayCard from "./ReportDayCard";
import { IDayReport, ITotalReport, DEFAULT_YEAR } from "./reportHelpers";

export default function ReportContainer() {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState(DEFAULT_YEAR);
    const [submitted, setSubmitted] = useState(false);
    const [expanded, setExpanded] = useState<number | null>(null);

    const { data, isFetching, refetch } = useMonthlyReport(month, year, submitted);
    const downloadReport = useDownloadReport();

    const report: IDayReport[] = data?.finalReport ?? [];
    const total: ITotalReport | null = data?.totalReport ?? null;

    const handleShowReport = () => {
        if (!month || !year) return;
        setSubmitted(true);
        setExpanded(null);
        refetch();
    };

    const handleDownload = () => {
        if (!month || !year) return;
        downloadReport.mutate(
            { month, year },
            {
                onSuccess: (blob: Blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `report-${year}-${month}.xlsx`;
                    a.click();
                    window.URL.revokeObjectURL(url);
                    toast.success("دانلود آغاز شد");
                },
            }
        );
    };

    return (
        <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
            <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10 rounded-b-2xl">
                <p className="text-base font-bold text-gray-800 text-right">گزارش حضور</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
                <ReportFilters
                    month={month}
                    onMonthChange={(v) => { setMonth(v); setSubmitted(false); }}
                    year={year}
                    onYearChange={(v) => { setYear(v); setSubmitted(false); }}
                    onShowReport={handleShowReport}
                    onDownload={handleDownload}
                    isFetching={isFetching}
                    isDownloading={downloadReport.isPending}
                />

                {!submitted ? (
                    <div className="flex flex-col items-center pt-10 gap-3">
                        <BarChart2 className="w-12 h-12 text-gray-200" />
                        <p className="text-gray-400 text-sm text-center px-8">
                            ماه و سال را انتخاب کرده و دکمه مشاهده را بزنید
                        </p>
                    </div>
                ) : isFetching ? (
                    <div className="flex justify-center pt-10">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                ) : report.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm pt-10">داده‌ای برای این بازه یافت نشد</p>
                ) : (
                    <>
                        {total && <ReportSummaryCard total={total} />}
                        {report.map((day, i) => (
                            <ReportDayCard
                                key={i}
                                day={day}
                                expanded={expanded === i}
                                onToggle={() => setExpanded(expanded === i ? null : i)}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}