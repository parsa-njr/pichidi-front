// // "use client";

// // import { useState, useEffect, useCallback } from "react";
// // import { useRouter } from "next/navigation";
// // import {
// //   Users,
// //   UserX,
// //   Clock,
// //   UserCheck,
// //   TrendingUp,
// //   ChevronLeft,
// //   RefreshCw,
// //   Bell,
// // } from "lucide-react";
// // import { apiClient } from "@/api/axiosClient";

// // // ─── Types ───────────────────────────────────────────────────────────────────
// // interface RequestItem {
// //   _id: string;
// //   requestType: "overtime" | "leave" | string;
// //   status: "pending" | "accepted" | "rejected";
// //   createdAt: string;
// //   user?: { name: string };
// // }

// // // ─── Stat Card ───────────────────────────────────────────────────────────────
// // function StatCard({
// //   label,
// //   value,
// //   icon: Icon,
// //   color,
// //   bg,
// // }: {
// //   label: string;
// //   value: number;
// //   icon: React.ElementType;
// //   color: string;
// //   bg: string;
// // }) {
// //   return (
// //     <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
// //       <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg}`}>
// //         <Icon className={`w-5 h-5 ${color}`} />
// //       </div>
// //       <div>
// //         <p className="text-2xl font-bold text-gray-800">{value}</p>
// //         <p className="text-xs text-gray-500 mt-0.5">{label}</p>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Donut Chart (SVG) ───────────────────────────────────────────────────────
// // function DonutChart({
// //   present,
// //   absent,
// //   late,
// // }: {
// //   present: number;
// //   absent: number;
// //   late: number;
// // }) {
// //   const total = present + absent + late || 1;
// //   const radius = 54;
// //   const cx = 70;
// //   const cy = 70;
// //   const circumference = 2 * Math.PI * radius;

// //   const segments = [
// //     { value: present, color: "#34D399", label: "حاضر" },
// //     { value: late, color: "#FBBF24", label: "با تاخیر" },
// //     { value: absent, color: "#F87171", label: "غایب" },
// //   ];

// //   let offset = 0;
// //   const arcs = segments.map((seg) => {
// //     const pct = seg.value / total;
// //     const dash = pct * circumference;
// //     const gap = circumference - dash;
// //     const arc = { ...seg, dash, gap, offset };
// //     offset += dash;
// //     return arc;
// //   });

// //   return (
// //     <div className="flex items-center gap-4">
// //       <svg width="140" height="140" viewBox="0 0 140 140">
// //         {arcs.map((arc, i) => (
// //           <circle
// //             key={i}
// //             cx={cx}
// //             cy={cy}
// //             r={radius}
// //             fill="none"
// //             stroke={arc.color}
// //             strokeWidth="18"
// //             strokeDasharray={`${arc.dash} ${arc.gap}`}
// //             strokeDashoffset={-arc.offset + circumference * 0.25}
// //             strokeLinecap="butt"
// //           />
// //         ))}
// //         <text
// //           x={cx}
// //           y={cy - 6}
// //           textAnchor="middle"
// //           className="text-2xl font-bold"
// //           fill="#1f2937"
// //           fontSize="22"
// //           fontWeight="700"
// //         >
// //           {total}
// //         </text>
// //         <text
// //           x={cx}
// //           y={cy + 14}
// //           textAnchor="middle"
// //           fill="#6b7280"
// //           fontSize="10"
// //         >
// //           کل
// //         </text>
// //       </svg>
// //       <div className="flex flex-col gap-2.5">
// //         {segments.map((seg) => (
// //           <div key={seg.label} className="flex items-center gap-2">
// //             <span
// //               className="w-3 h-3 rounded-sm flex-shrink-0"
// //               style={{ backgroundColor: seg.color }}
// //             />
// //             <span className="text-sm text-gray-600">{seg.label}</span>
// //             <span className="text-sm font-semibold text-gray-800 mr-1">
// //               {seg.value}
// //             </span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Request Card ────────────────────────────────────────────────────────────
// // function RequestCard({ req }: { req: RequestItem }) {
// //   const typeLabel =
// //     req.requestType === "overtime"
// //       ? "اضافه‌کاری"
// //       : req.requestType === "leave"
// //         ? "مرخصی"
// //         : req.requestType;

// //   return (
// //     <div className="flex items-center justify-between gap-3 py-3 border-b border-gray-100 last:border-0">
// //       <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full whitespace-nowrap">
// //         در انتظار
// //       </span>
// //       <div className="flex-1 text-right">
// //         <p className="text-sm font-medium text-gray-800">
// //           {req.user?.name ?? "—"}{" "}
// //           <span className="text-gray-500 font-normal">درخواست {typeLabel}</span>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Page ────────────────────────────────────────────────────────────────────
// // export default function CustomerDashboardPage() {
// //   const router = useRouter();
// //   const [requests, setRequests] = useState<RequestItem[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchRequests = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       const res = await apiClient.get("/api/v1/customer/requests?page=1&per_page=5");
// //       const data = res.data?.data?.data ?? res.data?.data ?? [];
// //       setRequests(Array.isArray(data) ? data : []);
// //     } catch {
// //       setRequests([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchRequests();
// //   }, [fetchRequests]);

// //   const pending = requests.filter((r) => r.status === "pending");

// //   // Static stats (same as RN app – replace with real API later)
// //   const stats = [
// //     { label: "کارمندان حاضر", value: 42, icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
// //     { label: "کارمندان غایب", value: 5, icon: UserX, color: "text-red-500", bg: "bg-red-50" },
// //     { label: "ورود با تاخیر", value: 3, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
// //     { label: "معلق", value: 2, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
// //   ];

// //   return (
// //     <div className="flex flex-col min-h-full bg-gray-50">
// //       {/* ── Header ── */}
// //       <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
// //         <div className="flex items-center justify-between">
// //           <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
// //             <Bell className="w-4 h-4 text-gray-500" />
// //           </button>
// //           <div className="text-right">
// //             <p className="text-base font-bold text-gray-800">سلام مدیر عزیز 👋</p>
// //             <p className="text-xs text-gray-500 mt-0.5">داشبورد امروز شما اینجاست</p>
// //           </div>
// //           <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center">
// //             <span className="text-primary font-bold text-sm">A</span>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24">
// //         {/* ── Stats Grid ── */}
// //         <div className="grid grid-cols-2 gap-3">
// //           {stats.map((s) => (
// //             <StatCard key={s.label} {...s} />
// //           ))}
// //         </div>

// //         {/* ── Chart ── */}
// //         <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
// //           <p className="text-sm font-semibold text-gray-700 text-right mb-4">
// //             وضعیت کارمندان
// //           </p>
// //           <div className="flex justify-center">
// //             <DonutChart present={42} absent={5} late={3} />
// //           </div>
// //         </div>

// //         {/* ── Trend Card ── */}
// //         <div className="bg-gradient-to-l from-primary to-primary/80 rounded-2xl p-5 text-white">
// //           <div className="flex items-start justify-between">
// //             <TrendingUp className="w-5 h-5 opacity-70" />
// //             <div className="text-right">
// //               <p className="text-xs opacity-80 mb-1">نرخ حضور این هفته</p>
// //               <p className="text-3xl font-bold">۸۹٪</p>
// //               <p className="text-xs opacity-70 mt-1">+۳٪ نسبت به هفته قبل</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── Pending Requests ── */}
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
// //           <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
// //             <button
// //               onClick={() => router.push("/customer/request")}
// //               className="flex items-center gap-1 text-xs text-primary font-medium"
// //             >
// //               <ChevronLeft className="w-3.5 h-3.5" />
// //               همه
// //             </button>
// //             <p className="text-sm font-semibold text-gray-700">آخرین درخواست‌ها</p>
// //           </div>

// //           <div className="px-5">
// //             {loading ? (
// //               <div className="py-8 flex justify-center">
// //                 <RefreshCw className="w-5 h-5 text-gray-300 animate-spin" />
// //               </div>
// //             ) : pending.length === 0 ? (
// //               <p className="text-center text-sm text-gray-400 py-8">
// //                 درخواست در انتظاری وجود ندارد
// //               </p>
// //             ) : (
// //               pending.slice(0, 4).map((req) => (
// //                 <RequestCard key={req._id} req={req} />
// //               ))
// //             )}
// //           </div>

// //           <div className="px-5 pb-4 pt-2">
// //             <button
// //               onClick={() => router.push("/customer/request")}
// //               className="w-full bg-primary text-white text-sm font-medium py-3 rounded-xl"
// //             >
// //               مشاهده همه درخواست‌ها
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Users, UserX, Clock, UserCheck, TrendingUp, ChevronLeft,
//   RefreshCw, Bell, MapPin, ClipboardList, Loader2, UserPlus, AlertCircle,
// } from "lucide-react";
// import { apiClient } from "@/api/axiosClient";
// import { useDashboardStats } from "@/api/customer/dashboard/queries";
// import { useMe } from "@/api/auth/queries";
// import { resolveImageUrl } from "@/utils/resolveImageUrl";
// // ─── Types ───────────────────────────────────────────────────────────────────
// interface RequestItem {
//   _id: string;
//   requestType: "overtime" | "leave" | string;
//   status: "pending" | "accepted" | "rejected";
//   createdAt: string;
//   user?: { name: string };
// }

// // ─── Greeting ─────────────────────────────────────────────────────────────────
// function useGreeting() {
//   const [greeting, setGreeting] = useState("سلام");
//   useEffect(() => {
//     const h = new Date().getHours();
//     if (h < 12) setGreeting("صبح بخیر");
//     else if (h < 18) setGreeting("ظهر بخیر");
//     else setGreeting("عصر بخیر");
//   }, []);
//   return greeting;
// }

// function getInitial(name?: string) {
//   return name?.trim()?.charAt(0)?.toUpperCase() ?? "؟";
// }

// // ─── Compact Stat Tile ─────────────────────────────────────────────────────────
// function StatTile({
//   label, value, icon: Icon, tone, delay,
// }: {
//   label: string; value: number; icon: React.ElementType; tone: "emerald" | "red" | "amber" | "blue"; delay: number;
// }) {
//   const tones = {
//     emerald: { bg: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-100" },
//     red: { bg: "bg-red-50", text: "text-red-500", ring: "ring-red-100" },
//     amber: { bg: "bg-amber-50", text: "text-amber-500", ring: "ring-amber-100" },
//     blue: { bg: "bg-blue-50", text: "text-blue-500", ring: "ring-blue-100" },
//   }[tone];

//   return (
//     <div
//       className="relative bg-white rounded-2xl p-4 border border-gray-100 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-2"
//       style={{ animationDelay: `${delay}ms`, animationFillMode: "backwards" }}
//     >
//       <div className={`absolute -left-3 -top-3 w-16 h-16 rounded-full ${tones.bg} opacity-60`} />
//       <div className="relative flex items-center justify-between">
//         <div className={`w-10 h-10 rounded-xl ${tones.bg} ring-4 ${tones.ring} flex items-center justify-center`}>
//           <Icon className={`w-4.5 h-4.5 ${tones.text}`} />
//         </div>
//         <p className="text-2xl font-extrabold text-gray-800">{value}</p>
//       </div>
//       <p className="relative text-xs text-gray-500 mt-2.5 text-right">{label}</p>
//     </div>
//   );
// }

// // ─── Quick Link Chip ──────────────────────────────────────────────────────────
// function QuickLink({ icon: Icon, label, value, onClick }: {
//   icon: React.ElementType; label: string; value: number; onClick: () => void;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className="flex-1 bg-white rounded-2xl p-3.5 border border-gray-100 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
//     >
//       <Icon className="w-4.5 h-4.5 text-primary" />
//       <p className="text-base font-bold text-gray-800">{value}</p>
//       <p className="text-[10px] text-gray-400 text-center leading-tight">{label}</p>
//     </button>
//   );
// }

// // ─── Donut Chart (SVG) ───────────────────────────────────────────────────────
// function DonutChart({ present, absent, late }: { present: number; absent: number; late: number }) {
//   const total = present + absent + late || 1;
//   const radius = 50;
//   const cx = 64;
//   const cy = 64;
//   const circumference = 2 * Math.PI * radius;

//   const segments = [
//     { value: present, color: "#34D399", label: "حاضر" },
//     { value: late, color: "#FBBF24", label: "با تاخیر" },
//     { value: absent, color: "#F87171", label: "غایب" },
//   ];

//   let offset = 0;
//   const arcs = segments.map((seg) => {
//     const pct = seg.value / total;
//     const dash = pct * circumference;
//     const gap = circumference - dash;
//     const arc = { ...seg, dash, gap, offset };
//     offset += dash;
//     return arc;
//   });

//   return (
//     <div className="flex items-center gap-5">
//       <svg width="128" height="128" viewBox="0 0 128 128">
//         <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#f3f4f6" strokeWidth="16" />
//         {arcs.map((arc, i) => (
//           <circle
//             key={i} cx={cx} cy={cy} r={radius} fill="none"
//             stroke={arc.color} strokeWidth="16" strokeLinecap="round"
//             strokeDasharray={`${arc.dash} ${arc.gap}`}
//             strokeDashoffset={-arc.offset + circumference * 0.25}
//             style={{ transition: "stroke-dasharray 0.6s ease" }}
//           />
//         ))}
//         <text x={cx} y={cy - 4} textAnchor="middle" fill="#1f2937" fontSize="20" fontWeight="800">{total}</text>
//         <text x={cx} y={cy + 15} textAnchor="middle" fill="#9ca3af" fontSize="10">کل کارمندان</text>
//       </svg>
//       <div className="flex flex-col gap-2.5">
//         {segments.map((seg) => (
//           <div key={seg.label} className="flex items-center gap-2">
//             <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
//             <span className="text-xs text-gray-500">{seg.label}</span>
//             <span className="text-xs font-bold text-gray-800 mr-0.5">{seg.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Request Row ─────────────────────────────────────────────────────────────
// function RequestRow({ req }: { req: RequestItem }) {
//   const typeLabel = req.requestType === "overtime" ? "اضافه‌کاری" : req.requestType === "leave" ? "مرخصی" : req.requestType;
//   return (
//     <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
//       <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
//         در انتظار
//       </span>
//       <div className="flex-1 text-right min-w-0">
//         <p className="text-sm font-medium text-gray-800 truncate">
//           {req.user?.name ?? "—"}{" "}
//           <span className="text-gray-400 font-normal">· {typeLabel}</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// // ─── Page ────────────────────────────────────────────────────────────────────
// export default function CustomerDashboardPage() {
//   const router = useRouter();
//   const greeting = useGreeting();
//   const { data: me } = useMe();

//   const [requests, setRequests] = useState<RequestItem[]>([]);
//   const [requestsLoading, setRequestsLoading] = useState(true);

//   const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useDashboardStats();

//   const fetchRequests = useCallback(async () => {
//     try {
//       setRequestsLoading(true);
//       const res = await apiClient.get("/api/v1/customer/requests?page=1&per_page=5");
//       const data = res.data?.data?.data ?? res.data?.data ?? [];
//       setRequests(Array.isArray(data) ? data : []);
//     } catch {
//       setRequests([]);
//     } finally {
//       setRequestsLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchRequests(); }, [fetchRequests]);

//   const pending = requests.filter((r) => r.status === "pending");
//   const refreshing = statsLoading || requestsLoading;

//   const handleRefresh = () => {
//     refetchStats();
//     fetchRequests();
//   };

//   const present = stats?.present ?? 0;
//   const absent = stats?.absent ?? 0;
//   const delayed = stats?.delayed ?? 0;
//   const stillWorking = stats?.stillWorking ?? 0;
//   const attendanceRate = stats?.totalStaff ? Math.round((present / stats.totalStaff) * 100) : 0;
//   const notCheckedInCount = stats?.notCheckedInCount ?? 0;
//   const notCheckedInNames = (stats?.notCheckedIn ?? []).map((u) => u.name).join("، ");
//   const avatarSrc = resolveImageUrl(me?.user?.profileImage);
//   return (
//     <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
//       <div className="flex-1 overflow-y-auto pb-24">
//         {/* Hero header */}
//         <div className="bg-gradient-to-br from-primary via-primary to-primary/85 px-5 pt-6 pb-16 rounded-b-[32px] relative overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-500">
//           <div className="absolute -left-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
//           <div className="absolute right-10 top-16 w-20 h-20 rounded-full bg-white/5" />

//           <div className="relative flex items-center justify-between mb-5">
//             <button
//               onClick={handleRefresh}
//               className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform border border-white/20"
//             >
//               <RefreshCw className={`w-4 h-4 text-primary-foreground ${refreshing ? "animate-spin" : ""}`} />
//             </button>
//             <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
//               <Bell className="w-4 h-4 text-primary-foreground" />
//             </div>
//           </div>

//           <div className="relative flex items-center gap-3">
//             <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center overflow-hidden flex-shrink-0">
//               {avatarSrc ? (
//                 <img src={avatarSrc} alt="" className="w-full h-full object-cover" />
//               ) : (
//                 <span className="text-primary-foreground text-lg font-bold">{getInitial(me?.user?.name)}</span>
//               )}
//             </div>
//             <div className="text-right">
//               <p className="text-primary-foreground/70 text-xs mb-0.5">{greeting} 👋</p>
//               <p className="text-primary-foreground text-lg font-bold">{me?.user?.name ?? "کارفرما"}</p>
//             </div>
//           </div>
//         </div>

//         {/* Floating attendance-rate card, overlapping the hero */}
//         {/* Floating "not checked in" card, overlapping the hero */}
//         <div className="px-4 -mt-10 relative z-10 animate-in fade-in-0 slide-in-from-bottom-3 duration-500" style={{ animationDelay: "80ms", animationFillMode: "backwards" }}>
//           <button
//             onClick={() => router.push("/customer/staff")}
//             className="w-full bg-white rounded-3xl p-5 shadow-lg shadow-black/5 border border-gray-100 flex items-center justify-between text-right active:scale-[0.98] transition-transform"
//           >
//             <ChevronLeft className="w-4 h-4 text-gray-300 flex-shrink-0" />

//             {notCheckedInCount === 0 ? (
//               <div className="flex items-center gap-3">
//                 <div className="text-right">
//                   <p className="text-sm font-bold text-gray-800">همه حاضرند ✅</p>
//                   <p className="text-xs text-gray-400 mt-0.5">هیچ کارمندی غایب نیست</p>
//                 </div>
//                 <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
//                   <UserCheck className="w-5 h-5 text-emerald-500" />
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center gap-3">
//                 <div className="text-right">
//                   <p className="text-sm font-bold text-gray-800">
//                     {notCheckedInCount} نفر هنوز ورود نزده‌اند
//                   </p>
//                   <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[180px]">
//                     {notCheckedInNames || "—"}
//                   </p>
//                 </div>
//                 <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center flex-shrink-0">
//                   <AlertCircle className="w-5 h-5 text-red-500" />
//                 </div>
//               </div>
//             )}
//           </button>
//         </div>

//         <div className="px-4 pt-5 space-y-4">
//           {statsLoading ? (
//             <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
//           ) : (
//             <>
//               {/* Stat tiles */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <StatTile label="کارمندان حاضر" value={present} icon={UserCheck} tone="emerald" delay={0} />
//                   <StatTile label="کارمندان غایب" value={absent} icon={UserX} tone="red" delay={60} />
//                   <StatTile label="ورود با تاخیر" value={delayed} icon={Clock} tone="amber" delay={120} />
//                   <StatTile label="در حال کار (بدون خروج)" value={stillWorking} icon={UserPlus} tone="blue" delay={180} />
//                 </div>

//                 <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 border border-gray-100 animate-in fade-in-0 slide-in-from-bottom-2 duration-500" style={{ animationDelay: "200ms", animationFillMode: "backwards" }}>
//                   <p className="text-sm font-bold text-gray-700">{attendanceRate}٪</p>
//                   <p className="text-xs text-gray-400">نرخ حضور از مجموع {stats?.totalStaff ?? 0} کارمند</p>
//                 </div>

//               {/* Chart card */}
//               <div
//                 className="bg-white rounded-2xl p-5 border border-gray-100 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
//                 style={{ animationDelay: "220ms", animationFillMode: "backwards" }}
//               >
//                 <p className="text-sm font-bold text-gray-700 text-right mb-4">وضعیت حضور امروز</p>
//                 <div className="flex justify-center">
//                   <DonutChart present={present} absent={absent} late={delayed} />
//                 </div>
//               </div>

//               {/* Quick links */}
//               <div
//                 className="flex gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
//                 style={{ animationDelay: "280ms", animationFillMode: "backwards" }}
//               >
//                 <QuickLink icon={MapPin} label="موقعیت‌ها" value={stats?.locationsCount ?? 0} onClick={() => router.push("/customer/location")} />
//                 <QuickLink icon={Clock} label="شیفت‌ها" value={stats?.shiftsCount ?? 0} onClick={() => router.push("/customer/shift")} />
//                 <QuickLink icon={ClipboardList} label="درخواست‌ها" value={stats?.pendingRequests ?? 0} onClick={() => router.push("/customer/request")} />
//               </div>

//               {/* Trend banner */}
//               <div
//                 className="bg-gradient-to-l from-primary to-primary/80 rounded-2xl p-5 text-white flex items-start gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
//                 style={{ animationDelay: "340ms", animationFillMode: "backwards" }}
//               >
//                 <TrendingUp className="w-5 h-5 opacity-80 flex-shrink-0 mt-0.5" />
//                 <div className="text-right">
//                   <p className="text-sm font-bold mb-1">نکته مدیریتی 💡</p>
//                   <p className="text-xs opacity-90 leading-6">
//                     {absent > 0
//                       ? `امروز ${absent} نفر غایب هستند. برای بررسی وضعیت به گزارشات مراجعه کنید.`
//                       : "همه کارمندان امروز حاضر بوده‌اند. عملکرد عالی است!"}
//                   </p>
//                 </div>
//               </div>

//               {/* Pending Requests */}
//               <div
//                 className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
//                 style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
//               >
//                 <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-50">
//                   <button
//                     onClick={() => router.push("/customer/request")}
//                     className="flex items-center gap-1 text-xs text-primary font-medium"
//                   >
//                     <ChevronLeft className="w-3.5 h-3.5" />
//                     همه
//                   </button>
//                   <p className="text-sm font-bold text-gray-700">آخرین درخواست‌ها</p>
//                 </div>

//                 <div className="px-5">
//                   {requestsLoading ? (
//                     <div className="py-8 flex justify-center">
//                       <RefreshCw className="w-5 h-5 text-gray-300 animate-spin" />
//                     </div>
//                   ) : pending.length === 0 ? (
//                     <p className="text-center text-sm text-gray-400 py-8">درخواست در انتظاری وجود ندارد</p>
//                   ) : (
//                     pending.slice(0, 4).map((req) => <RequestRow key={req._id} req={req} />)
//                   )}
//                 </div>

//                 <div className="px-5 pb-4 pt-2">
//                   <button
//                     onClick={() => router.push("/customer/request")}
//                     className="w-full bg-primary text-white text-sm font-medium py-3 rounded-xl active:scale-[0.98] transition-transform"
//                   >
//                     مشاهده همه درخواست‌ها
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import DashboardContainer from "@/components/customer/dashboard/DashboardContainer";

export default function CustomerDashboardPage() {
  return <DashboardContainer />;
}