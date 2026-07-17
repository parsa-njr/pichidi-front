// "use client";

// import { useState, useCallback } from "react";
// import {
//   ChevronDown, ChevronUp, Calendar, User,
//   Loader2, BarChart2, Clock, UserCheck, AlertCircle,
// } from "lucide-react";
// import { apiClient } from "@/api/axiosClient";

// // ─── Types ───────────────────────────────────────────────────────────────────
// interface IDayReport {
//   date: string; users: IUserDayReport[];
// }
// interface IUserDayReport {
//   id: string; name: string; avatar?: string;
//   status: string;
//   report: {
//     status: string; actualCheckIn?: string; actualCheckOut?: string;
//     actualMinutes?: string; leaveMinutes?: string;
//   };
//   attendance: { checkIn?: string; checkOut?: string }[];
// }
// interface IUserListItem { _id: string; name: string; phone: string; image?: string }
// interface IUserReport {
//   totalReport: { totalActualTime: string; totalDelay: string; totalLeaveTime: string };
//   finalReport: {
//     date: string; shamsiDate?: string;
//     actualCheckIn?: string; actualCheckOut?: string;
//     actualMinutes?: string; delayMinutes?: string;
//     leaveMinutes?: string; status: string;
//   }[];
// }

// // ─── Helpers ─────────────────────────────────────────────────────────────────
// function toJalali(iso: string) {
//   if (!iso) return "—";
//   try {
//     return new Intl.DateTimeFormat("fa-IR", {
//       year: "numeric", month: "2-digit", day: "2-digit", calendar: "persian",
//     }).format(new Date(iso));
//   } catch { return iso.slice(0, 10); }
// }

// function DetailRow({ label, value }: { label: string; value?: string }) {
//   return (
//     <div className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
//       <span className="text-sm text-gray-700 font-medium">{value ?? "—"}</span>
//       <span className="text-sm text-gray-400">{label}:</span>
//     </div>
//   );
// }

// // ─── Collapsible Day Card ─────────────────────────────────────────────────────
// function DayCard({ date, onClick }: { date: string; onClick: () => void }) {
//   return (
//     <button
//       onClick={onClick}
//       className="w-full bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center justify-between"
//     >
//       <ChevronDown className="w-4 h-4 text-gray-400" />
//       <div className="flex items-center gap-2">
//         <Calendar className="w-4 h-4 text-primary" />
//         <span className="text-sm font-semibold text-gray-800">{toJalali(date)}</span>
//       </div>
//     </button>
//   );
// }

// // ─── User Report Modal ────────────────────────────────────────────────────────
// function UserReportModal({ data, name, onClose }: {
//   data: IUserReport; name: string; onClose: () => void;
// }) {
//   const [expanded, setExpanded] = useState<number | null>(null);
//   return (
//     <div className="fixed inset-0 z-50 flex flex-col justify-end">
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />
//       <div className="relative bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
//           <button onClick={onClose} className="text-sm text-gray-400">بستن</button>
//           <p className="text-base font-semibold text-gray-700">گزارش حضور</p>
//           <div className="w-10" />
//         </div>

//         <div className="px-5 py-4">
//           {/* Name */}
//           <div className="flex flex-col items-center mb-5">
//             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
//               <User className="w-7 h-7 text-primary" />
//             </div>
//             <p className="text-base text-gray-600 font-semibold">{name}</p>
//           </div>

//           {/* Summary */}
//           <div className="bg-gray-50 rounded-2xl p-4 mb-5 border border-gray-100" dir="rtl">
//             <p className="text-sm font-bold text-gray-700 text-center mb-3">مجموع تردد‌ها</p>
//             <DetailRow label="مجموع ساعات حضور" value={data.totalReport.totalActualTime} />
//             <DetailRow label="مجموع تاخیر" value={data.totalReport.totalDelay} />
//             <DetailRow label="مجموع مرخصی" value={data.totalReport.totalLeaveTime} />
//           </div>

//           {/* Daily */}
//           {data.finalReport.map((day, i) => (
//             <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-3 overflow-hidden">
//               <button
//                 onClick={() => setExpanded(expanded === i ? null : i)}
//                 className="w-full flex items-center justify-between px-4 py-3"
//               >
//                 {expanded === i
//                   ? <ChevronUp className="w-4 h-4 text-gray-400" />
//                   : <ChevronDown className="w-4 h-4 text-gray-400" />
//                 }
//                 <div className="text-right">
//                   <p className="text-sm font-semibold text-gray-800">{day.shamsiDate ?? toJalali(day.date)}</p>
//                   <p className="text-xs text-gray-400">{day.actualMinutes ?? "0"} کار شده</p>
//                 </div>
//               </button>
//               {expanded === i && (
//                 <div className="bg-gray-50 mx-3 mb-3 rounded-xl px-4 py-3" dir="rtl">
//                   <DetailRow label="ورود" value={day.actualCheckIn} />
//                   <DetailRow label="خروج" value={day.actualCheckOut} />
//                   <DetailRow label="ساعات کاری" value={day.actualMinutes} />
//                   <DetailRow label="تاخیر" value={day.delayMinutes} />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Day Users Modal ──────────────────────────────────────────────────────────
// function DayUsersModal({ users, date, onClose }: {
//   users: IUserDayReport[]; date: string; onClose: () => void;
// }) {
//   const [expanded, setExpanded] = useState<string | null>(null);
//   return (
//     <div className="fixed inset-0 z-50 flex flex-col justify-end">
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />
//       <div className="relative bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
//           <button onClick={onClose} className="text-sm text-gray-400">بستن</button>
//           <p className="text-base font-semibold text-gray-700">{toJalali(date)}</p>
//           <div className="w-10" />
//         </div>
//         <div className="px-5 py-3">
//           {users.map((u) => (
//             <div key={u.id} className="mb-2">
//               <button
//                 onClick={() => setExpanded(expanded === u.id ? null : u.id)}
//                 className="w-full flex items-center gap-3 py-3 border-b border-gray-100"
//               >
//                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
//                   <User className="w-4 h-4 text-primary" />
//                 </div>
//                 <div className="flex-1 text-right">
//                   <p className="text-sm font-semibold text-gray-800">{u.name}</p>
//                   <p className="text-xs text-gray-400">{u.report?.status ?? u.status}</p>
//                 </div>
//                 {expanded === u.id
//                   ? <ChevronUp className="w-4 h-4 text-gray-400" />
//                   : <ChevronDown className="w-4 h-4 text-gray-400" />
//                 }
//               </button>
//               {expanded === u.id && u.report?.status !== "invalidShiftDay" && (
//                 <div className="bg-gray-50 rounded-xl mx-1 my-2 px-4 py-3" dir="rtl">
//                   <DetailRow label="ورود" value={u.report?.actualCheckIn} />
//                   <DetailRow label="خروج" value={u.report?.actualCheckOut} />
//                   <DetailRow label="ساعات کاری" value={u.report?.actualMinutes} />
//                   <DetailRow label="غیبت" value={u.report?.leaveMinutes} />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Location Select ──────────────────────────────────────────────────────────
// const LOCATIONS = [
//   { label: "انبار ۱", value: "01" },
//   { label: "کارگاه شمالی", value: "02" },
//   { label: "کارگاه غربی", value: "03" },
//   { label: "شرکت", value: "04" },
// ];

// // ─── Page ─────────────────────────────────────────────────────────────────────
// export default function CustomerReportPage() {
//   const [tab, setTab] = useState<"daily" | "employee">("daily");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   // daily
//   const [dailyData, setDailyData] = useState<IDayReport[]>([]);
//   const [dayModal, setDayModal] = useState<IDayReport | null>(null);

//   // employee
//   const [userList, setUserList] = useState<IUserListItem[]>([]);
//   const [userReport, setUserReport] = useState<{ data: IUserReport; name: string } | null>(null);
//   const [userLoading, setUserLoading] = useState<string | null>(null);

//   const handleSubmit = useCallback(async () => {
//     if (!startDate || !endDate || !location) return;
//     setLoading(true); setSubmitted(true);
//     try {
//       if (tab === "daily") {
//         const res = await apiClient.get(
//           `/api/v1/customer/get-date-base-report?startDate=${startDate}T00:00:00Z&endDate=${endDate}T23:59:59Z&location=${location}`
//         );
//         setDailyData(Array.isArray(res.data) ? res.data : []);
//       } else {
//         const res = await apiClient.get(`/api/v1/customer/get-location-users/${location}`);
//         setUserList(res.data?.data?.data ?? res.data?.data ?? []);
//       }
//     } finally { setLoading(false); }
//   }, [startDate, endDate, location, tab]);

//   const fetchUserReport = async (user: IUserListItem) => {
//     setUserLoading(user._id);
//     try {
//       const res = await apiClient.get(
//         `/api/v1/customer/get-user-base-report/?userId=${user._id}&startDate=${startDate}T00:00:00Z&endDate=${endDate}T23:59:59Z`
//       );
//       setUserReport({ data: res.data, name: user.name });
//     } finally { setUserLoading(null); }
//   };

//   return (
//     <div className="flex flex-col min-h-full bg-gray-50">
//       {/* Header */}
//       <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
//         <p className="text-base font-bold text-gray-800 text-right mb-4">گزارشات</p>
//       </div>

//       <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
//         {/* Filter Card */}
//         <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
//           {/* Dates */}
//           <div className="flex gap-3 mb-4">
//             <div className="flex-1">
//               <label className="block text-xs text-gray-400 text-right mb-1">تاریخ پایان</label>
//               <input type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); setSubmitted(false); }}
//                 className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
//             </div>
//             <div className="flex-1">
//               <label className="block text-xs text-gray-400 text-right mb-1">تاریخ شروع</label>
//               <input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); setSubmitted(false); }}
//                 className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
//             </div>
//           </div>

//           {/* Location */}
//           <div className="relative mb-4">
//             <label className="block text-xs text-gray-400 text-right mb-1">موقعیت</label>
//             <select
//               value={location} onChange={(e) => { setLocation(e.target.value); setSubmitted(false); }}
//               className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-right appearance-none focus:outline-none focus:border-primary"
//               dir="rtl"
//             >
//               <option value="" disabled>انتخاب موقعیت</option>
//               {LOCATIONS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
//             </select>
//             <ChevronDown className="absolute left-3 top-9 w-4 h-4 text-gray-400 pointer-events-none" />
//           </div>

//           {/* Tab */}
//           <div className="flex gap-2 mb-4">
//             {[{ key: "daily", label: "روزانه" }, { key: "employee", label: "کارمند" }].map((t) => (
//               <button
//                 key={t.key}
//                 onClick={() => { setTab(t.key as any); setSubmitted(false); }}
//                 className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === t.key ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
//                   }`}
//               >
//                 {t.label}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={handleSubmit}
//             disabled={!startDate || !endDate || !location || submitted}
//             className="w-full bg-primary text-white py-3 rounded-xl text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
//           >
//             {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//             📊 مشاهده گزارش
//           </button>
//         </div>

//         {/* Results */}
//         {!submitted ? (
//           <div className="flex flex-col items-center pt-10 gap-3">
//             <BarChart2 className="w-12 h-12 text-gray-200" />
//             <p className="text-gray-400 text-sm text-center px-8">
//               فیلترها را پر کرده و دکمه مشاهده را بزنید
//             </p>
//           </div>
//         ) : loading ? (
//           <div className="flex justify-center pt-10"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
//         ) : tab === "daily" ? (
//           dailyData.length === 0 ? (
//             <p className="text-center text-gray-400 text-sm pt-10">داده‌ای یافت نشد</p>
//           ) : (
//             dailyData.map((day, i) => (
//               <DayCard key={i} date={day.date} onClick={() => setDayModal(day)} />
//             ))
//           )
//         ) : (
//           userList.length === 0 ? (
//             <p className="text-center text-gray-400 text-sm pt-10">کارمندی یافت نشد</p>
//           ) : (
//             userList.map((u) => (
//               <button
//                 key={u._id}
//                 onClick={() => fetchUserReport(u)}
//                 className="w-full bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center gap-3"
//               >
//                 {userLoading === u._id
//                   ? <Loader2 className="w-5 h-5 text-primary animate-spin" />
//                   : <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
//                     <User className="w-4 h-4 text-primary" />
//                   </div>
//                 }
//                 <div className="flex-1 text-right">
//                   <p className="text-sm font-semibold text-gray-800">{u.name}</p>
//                   <p className="text-xs text-gray-400">{u.phone}</p>
//                 </div>
//               </button>
//             ))
//           )
//         )}
//       </div>

//       {/* Day Users Modal */}
//       {dayModal && (
//         <DayUsersModal
//           users={dayModal.users}
//           date={dayModal.date}
//           onClose={() => setDayModal(null)}
//         />
//       )}

//       {/* User Report Modal */}
//       {userReport && (
//         <UserReportModal
//           data={userReport.data}
//           name={userReport.name}
//           onClose={() => setUserReport(null)}
//         />
//        )} 
//     </div>
//   );
// }

"use client";

import { useState, useCallback } from "react";
import { ChevronDown, ChevronUp, Calendar, User, Loader2, BarChart2 } from "lucide-react";

import { BottomSheet } from "@/components/ui/AppModal";
import DateField from "@/components/ui/DateField";
import { useLocations } from "@/api/customer/location/queries";
import { useDateBaseReport, useLocationUsers, useUserReport } from "@/api/customer/report/queries";

// ─── Types ───────────────────────────────────────────────────────────────────
interface IDayReport {
  date: string;
  users: IUserDayReport[];
}
interface IUserDayReport {
  id: string;
  name: string;
  status: string;
  report: {
    status: string;
    actualCheckIn?: string;
    actualCheckOut?: string;
    actualMinutes?: string;
    leaveMinutes?: string;
  };
}
interface IUserListItem {
  _id: string;
  name: string;
  phone: string;
}
interface IUserReport {
  totalReport: { totalActualTime: string; totalDelay: string; totalLeaveTime: string };
  finalReport: {
    date: string;
    shamsiDate?: string;
    actualCheckIn?: string;
    actualCheckOut?: string;
    actualMinutes?: string;
    delayMinutes?: string;
    leaveMinutes?: string;
    status: string;
  }[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function toJalali(iso: string) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric", month: "2-digit", day: "2-digit", calendar: "persian",
    }).format(new Date(iso));
  } catch { return iso.slice(0, 10); }
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
      <span className="text-sm text-gray-700 font-medium">{value ?? "—"}</span>
      <span className="text-sm text-gray-400">{label}:</span>
    </div>
  );
}

// ─── Day Card ─────────────────────────────────────────────────────────────────
function DayCard({ date, onClick }: { date: string; onClick: () => void }) {
  return (
    <button
      dir="rtl"
      onClick={onClick}
      className="w-full bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center justify-between"
    >
      <ChevronDown className="w-4 h-4 text-gray-400" />
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-gray-800">{toJalali(date)}</span>
      </div>
    </button>
  );
}

// ─── User Report Modal ────────────────────────────────────────────────────────
function UserReportModal({ data, name, open, onClose }: {
  data: IUserReport | null; name: string; open: boolean; onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <BottomSheet title="گزارش حضور" open={open} onClose={onClose} maxHeight="90%">
      {data && (
        <div dir="rtl">
          <div className="flex flex-col items-center mb-5">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <User className="w-7 h-7 text-primary" />
            </div>
            <p className="text-base text-gray-600 font-semibold">{name}</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 mb-5 border border-gray-100">
            <p className="text-sm font-bold text-gray-700 text-center mb-3">مجموع تردد‌ها</p>
            <DetailRow label="مجموع ساعات حضور" value={data.totalReport.totalActualTime} />
            <DetailRow label="مجموع تاخیر" value={data.totalReport.totalDelay} />
            <DetailRow label="مجموع مرخصی" value={data.totalReport.totalLeaveTime} />
          </div>

          {data.finalReport.map((day, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-3 overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3"
              >
                {expanded === i ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">{day.shamsiDate ?? toJalali(day.date)}</p>
                  <p className="text-xs text-gray-400">{day.actualMinutes ?? "0"} کار شده</p>
                </div>
              </button>
              {expanded === i && (
                <div className="bg-gray-50 mx-3 mb-3 rounded-xl px-4 py-3">
                  <DetailRow label="ورود" value={day.actualCheckIn} />
                  <DetailRow label="خروج" value={day.actualCheckOut} />
                  <DetailRow label="ساعات کاری" value={day.actualMinutes} />
                  <DetailRow label="تاخیر" value={day.delayMinutes} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </BottomSheet>
  );
}

// ─── Day Users Modal ──────────────────────────────────────────────────────────
function DayUsersModal({ users, date, open, onClose }: {
  users: IUserDayReport[]; date: string; open: boolean; onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <BottomSheet title={toJalali(date)} open={open} onClose={onClose} maxHeight="85%">
      <div dir="rtl">
        {users.map((u) => (
          <div key={u.id} className="mb-2">
            <button
              onClick={() => setExpanded(expanded === u.id ? null : u.id)}
              className="w-full flex items-center gap-3 py-3 border-b border-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 text-right">
                <p className="text-sm font-semibold text-gray-800">{u.name}</p>
                <p className="text-xs text-gray-400">{u.report?.status ?? u.status}</p>
              </div>
              {expanded === u.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {expanded === u.id && u.report?.status !== "invalidShiftDay" && (
              <div className="bg-gray-50 rounded-xl mx-1 my-2 px-4 py-3">
                <DetailRow label="ورود" value={u.report?.actualCheckIn} />
                <DetailRow label="خروج" value={u.report?.actualCheckOut} />
                <DetailRow label="ساعات کاری" value={u.report?.actualMinutes} />
                <DetailRow label="غیبت" value={u.report?.leaveMinutes} />
              </div>
            )}
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CustomerReportPage() {
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
      {/* Header */}
      <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
        <p className="text-base font-bold text-gray-800 text-right mb-4">گزارشات</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {/* Filter Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex gap-3 mb-4">
            <DateField label="تاریخ پایان" value={endDate} onChange={(v) => { setEndDate(v); setSubmitted(false); }} />
            <DateField label="تاریخ شروع" value={startDate} onChange={(v) => { setStartDate(v); setSubmitted(false); }} />
          </div>

          <div className="relative mb-4">
            <label className="block text-xs text-gray-400 text-right mb-1">موقعیت</label>
            <select
              value={location}
              onChange={(e) => { setLocation(e.target.value); setSubmitted(false); }}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-right appearance-none focus:outline-none focus:border-primary"
              dir="rtl"
            >
              <option value="" disabled>انتخاب موقعیت</option>
              {locations.map((l: { _id: string; name: string }) => (
                <option key={l._id} value={l._id}>{l.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute left-3 top-9 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="flex gap-2 mb-4">
            {[{ key: "daily", label: "روزانه" }, { key: "employee", label: "کارمند" }].map((t) => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key as "daily" | "employee"); setSubmitted(false); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === t.key ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!startDate || !endDate || !location || submitted}
            className="w-full bg-primary text-white py-3 rounded-xl text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <BarChart2 className="w-4 h-4" />
            مشاهده گزارش
          </button>
        </div>

        {/* Results */}
        {!submitted ? (
          <div className="flex flex-col items-center pt-10 gap-3">
            <BarChart2 className="w-12 h-12 text-gray-200" />
            <p className="text-gray-400 text-sm text-center px-8">فیلترها را پر کرده و دکمه مشاهده را بزنید</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center pt-10"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
        ) : tab === "daily" ? (
          dailyData.length === 0 ? (
            <p className="text-center text-gray-400 text-sm pt-10">داده‌ای یافت نشد</p>
          ) : (
            dailyData.map((day, i) => <DayCard key={i} date={day.date} onClick={() => setDayModal(day)} />)
          )
        ) : userList.length === 0 ? (
          <p className="text-center text-gray-400 text-sm pt-10">کارمندی یافت نشد</p>
        ) : (
          userList.map((u) => (
            <button
              key={u._id}
              dir="rtl"
              onClick={() => fetchUserReport(u)}
              className="w-full bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center gap-3"
            >
              {userLoadingId === u._id ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className="flex-1 text-right">
                <p className="text-sm font-semibold text-gray-800">{u.name}</p>
                <p className="text-xs text-gray-400">{u.phone}</p>
              </div>
            </button>
          ))
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