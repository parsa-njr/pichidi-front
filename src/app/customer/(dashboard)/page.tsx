"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  UserX,
  Clock,
  UserCheck,
  TrendingUp,
  ChevronLeft,
  RefreshCw,
  Bell,
} from "lucide-react";
import { apiClient } from "@/api/axiosClient";

// ─── Types ───────────────────────────────────────────────────────────────────
interface RequestItem {
  _id: string;
  requestType: "overtime" | "leave" | string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  user?: { name: string };
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bg: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ─── Donut Chart (SVG) ───────────────────────────────────────────────────────
function DonutChart({
  present,
  absent,
  late,
}: {
  present: number;
  absent: number;
  late: number;
}) {
  const total = present + absent + late || 1;
  const radius = 54;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * radius;

  const segments = [
    { value: present, color: "#34D399", label: "حاضر" },
    { value: late, color: "#FBBF24", label: "با تاخیر" },
    { value: absent, color: "#F87171", label: "غایب" },
  ];

  let offset = 0;
  const arcs = segments.map((seg) => {
    const pct = seg.value / total;
    const dash = pct * circumference;
    const gap = circumference - dash;
    const arc = { ...seg, dash, gap, offset };
    offset += dash;
    return arc;
  });

  return (
    <div className="flex items-center gap-4">
      <svg width="140" height="140" viewBox="0 0 140 140">
        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={arc.color}
            strokeWidth="18"
            strokeDasharray={`${arc.dash} ${arc.gap}`}
            strokeDashoffset={-arc.offset + circumference * 0.25}
            strokeLinecap="butt"
          />
        ))}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          className="text-2xl font-bold"
          fill="#1f2937"
          fontSize="22"
          fontWeight="700"
        >
          {total}
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fill="#6b7280"
          fontSize="10"
        >
          کل
        </text>
      </svg>
      <div className="flex flex-col gap-2.5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-sm text-gray-600">{seg.label}</span>
            <span className="text-sm font-semibold text-gray-800 mr-1">
              {seg.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Request Card ────────────────────────────────────────────────────────────
function RequestCard({ req }: { req: RequestItem }) {
  const typeLabel =
    req.requestType === "overtime"
      ? "اضافه‌کاری"
      : req.requestType === "leave"
        ? "مرخصی"
        : req.requestType;

  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-gray-100 last:border-0">
      <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full whitespace-nowrap">
        در انتظار
      </span>
      <div className="flex-1 text-right">
        <p className="text-sm font-medium text-gray-800">
          {req.user?.name ?? "—"}{" "}
          <span className="text-gray-500 font-normal">درخواست {typeLabel}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function CustomerDashboardPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/api/v1/customer/requests?page=1&per_page=5");
      const data = res.data?.data?.data ?? res.data?.data ?? [];
      setRequests(Array.isArray(data) ? data : []);
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const pending = requests.filter((r) => r.status === "pending");

  // Static stats (same as RN app – replace with real API later)
  const stats = [
    { label: "کارمندان حاضر", value: 42, icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "کارمندان غایب", value: 5, icon: UserX, color: "text-red-500", bg: "bg-red-50" },
    { label: "ورود با تاخیر", value: 3, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "معلق", value: 2, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  ];

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {/* ── Header ── */}
      <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
            <Bell className="w-4 h-4 text-gray-500" />
          </button>
          <div className="text-right">
            <p className="text-base font-bold text-gray-800">سلام مدیر عزیز 👋</p>
            <p className="text-xs text-gray-500 mt-0.5">داشبورد امروز شما اینجاست</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center">
            <span className="text-primary font-bold text-sm">A</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24">
        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* ── Chart ── */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-700 text-right mb-4">
            وضعیت کارمندان
          </p>
          <div className="flex justify-center">
            <DonutChart present={42} absent={5} late={3} />
          </div>
        </div>

        {/* ── Trend Card ── */}
        <div className="bg-gradient-to-l from-primary to-primary/80 rounded-2xl p-5 text-white">
          <div className="flex items-start justify-between">
            <TrendingUp className="w-5 h-5 opacity-70" />
            <div className="text-right">
              <p className="text-xs opacity-80 mb-1">نرخ حضور این هفته</p>
              <p className="text-3xl font-bold">۸۹٪</p>
              <p className="text-xs opacity-70 mt-1">+۳٪ نسبت به هفته قبل</p>
            </div>
          </div>
        </div>

        {/* ── Pending Requests ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
            <button
              onClick={() => router.push("/customer/request")}
              className="flex items-center gap-1 text-xs text-primary font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              همه
            </button>
            <p className="text-sm font-semibold text-gray-700">آخرین درخواست‌ها</p>
          </div>

          <div className="px-5">
            {loading ? (
              <div className="py-8 flex justify-center">
                <RefreshCw className="w-5 h-5 text-gray-300 animate-spin" />
              </div>
            ) : pending.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-8">
                درخواست در انتظاری وجود ندارد
              </p>
            ) : (
              pending.slice(0, 4).map((req) => (
                <RequestCard key={req._id} req={req} />
              ))
            )}
          </div>

          <div className="px-5 pb-4 pt-2">
            <button
              onClick={() => router.push("/customer/request")}
              className="w-full bg-primary text-white text-sm font-medium py-3 rounded-xl"
            >
              مشاهده همه درخواست‌ها
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}