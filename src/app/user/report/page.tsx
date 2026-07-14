"use client";

import { useState } from "react";
import {
  ChevronDown, ChevronUp, Loader2, BarChart2, Download,
} from "lucide-react";
import { toast } from "react-toastify";

import { useMonthlyReport, useDownloadReport } from "@/api/user/report/queries";
import { getCurrentJalali } from "@/utils/getCurrentJalali";

// ─── Types ───────────────────────────────────────────────────────────────────
interface IDayReport {
  date: string;
  shamsiDate?: string;
  actualCheckIn?: string;
  actualCheckOut?: string;
  actualMinutes?: string;
  leaveMinutes?: string;
  delayMinutes?: string;
  status: string;
}
interface ITotalReport {
  totalActualTime: string;
  totalLeaveTime: string;
  totalDelay: string;
  totalDeficit: string;
  statusCount: Record<string, number>;
}

// ─── Status labels ────────────────────────────────────────────────────────────
const STATUS_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  fullPresent: { label: "حاضر", color: "text-emerald-600", bg: "bg-emerald-50" },
  delay: { label: "با تاخیر", color: "text-amber-600", bg: "bg-amber-50" },
  deficit: { label: "کسری", color: "text-orange-600", bg: "bg-orange-50" },
  absent: { label: "غایب", color: "text-red-600", bg: "bg-red-50" },
  leave: { label: "مرخصی", color: "text-blue-600", bg: "bg-blue-50" },
  shiftOffDay: { label: "تعطیل", color: "text-gray-500", bg: "bg-gray-100" },
  invalidShiftDay: { label: "بدون شیفت", color: "text-gray-400", bg: "bg-gray-50" },
};

function toJalali(iso: string) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric", month: "2-digit", day: "2-digit", calendar: "persian",
    }).format(new Date(iso));
  } catch { return iso.slice(0, 10); }
}

// ─── Months & Years ───────────────────────────────────────────────────────────
const MONTHS = [
  { label: "فروردین", value: "01" }, { label: "اردیبهشت", value: "02" },
  { label: "خرداد", value: "03" }, { label: "تیر", value: "04" },
  { label: "مرداد", value: "05" }, { label: "شهریور", value: "06" },
  { label: "مهر", value: "07" }, { label: "آبان", value: "08" },
  { label: "آذر", value: "09" }, { label: "دی", value: "10" },
  { label: "بهمن", value: "11" }, { label: "اسفند", value: "12" },
];

const CURRENT_JALALI = getCurrentJalali();
const YEARS = Array.from({ length: 5 }, (_, i) => {
  const y = parseInt(CURRENT_JALALI.year || "1403") - i;
  return { label: String(y), value: String(y) };
});

// ─── Detail Row ───────────────────────────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
      <span className="text-sm text-gray-700 font-medium">{value ?? "—"}</span>
      <span className="text-sm text-gray-400">{label}:</span>
    </div>
  );
}

// ─── Summary Card ─────────────────────────────────────────────────────────────
function SummaryCard({ total }: { total: ITotalReport }) {
  return (
    <div className="bg-gradient-to-l from-primary to-primary/80 rounded-2xl p-5 text-white mb-4">
      <p className="text-sm font-bold text-right mb-4 opacity-90">خلاصه ماه</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "ساعات کاری", value: total.totalActualTime },
          { label: "مرخصی", value: total.totalLeaveTime },
          { label: "تاخیر", value: total.totalDelay },
          { label: "کسری", value: total.totalDeficit },
        ].map((item) => (
          <div key={item.label} className="bg-white/20 rounded-xl p-3 text-right">
            <p className="text-lg font-bold">{item.value || "۰۰:۰۰"}</p>
            <p className="text-xs opacity-80 mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Day Card ─────────────────────────────────────────────────────────────────
function DayCard({ day, expanded, onToggle }: {
  day: IDayReport; expanded: boolean; onToggle: () => void;
}) {
  const s = STATUS_LABEL[day.status] ?? { label: day.status, color: "text-gray-500", bg: "bg-gray-100" };
  const dateLabel = day.shamsiDate ?? toJalali(day.date);

  return (
    <div dir="rtl" className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-3 overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-4 py-3.5">
        {expanded
          ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
        <div className="flex items-center gap-3 flex-1 justify-end">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{dateLabel}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {day.actualMinutes ? `${day.actualMinutes} کار شده` : "—"}
            </p>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.bg} ${s.color}`}>
            {s.label}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="bg-gray-50 mx-3 mb-3 rounded-xl px-4 py-3">
          <DetailRow label="ورود" value={day.actualCheckIn} />
          <DetailRow label="خروج" value={day.actualCheckOut} />
          <DetailRow label="ساعات کاری" value={day.actualMinutes} />
          <DetailRow label="مرخصی" value={day.leaveMinutes} />
          <DetailRow label="تاخیر" value={day.delayMinutes} />
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EmployeeReportPage() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(YEARS[0]?.value ?? "");
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
      {/* Header */}
      <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10 rounded-b-2xl">
        <p className="text-base font-bold text-gray-800 text-right">گزارش حضور</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {/* Filter Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <p className="text-sm text-gray-500 text-right mb-3">بازه مورد نظر را انتخاب کنید</p>

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-400 text-right mb-1.5">ماه</label>
              <div className="relative">
                <select
                  value={month}
                  onChange={(e) => { setMonth(e.target.value); setSubmitted(false); }}
                  dir="rtl"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-right appearance-none focus:outline-none focus:border-primary"
                >
                  <option value="" disabled>انتخاب ماه</option>
                  {MONTHS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
                <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-xs text-gray-400 text-right mb-1.5">سال</label>
              <div className="relative">
                <select
                  value={year}
                  onChange={(e) => { setYear(e.target.value); setSubmitted(false); }}
                  dir="rtl"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-right appearance-none focus:outline-none focus:border-primary"
                >
                  {YEARS.map((y) => <option key={y.value} value={y.value}>{y.label}</option>)}
                </select>
                <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <button
            onClick={handleShowReport}
            disabled={!month || !year || isFetching}
            className="w-full bg-primary text-white py-3 rounded-xl text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2 mb-3"
          >
            {isFetching && <Loader2 className="w-4 h-4 animate-spin" />}
            مشاهده گزارش
          </button>

          <button
            onClick={handleDownload}
            disabled={!month || !year || downloadReport.isPending}
            className="w-full bg-emerald-500 text-white py-3 rounded-xl text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {downloadReport.isPending
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Download className="w-4 h-4" />}
            دانلود فایل اکسل
          </button>
        </div>

        {/* Results */}
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
            {total && <SummaryCard total={total} />}
            {report.map((day, i) => (
              <DayCard
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