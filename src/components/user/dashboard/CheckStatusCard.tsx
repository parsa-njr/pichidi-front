import { Loader2, CheckCircle2, Clock, MapPin } from "lucide-react";
import { LocationStatus } from "@/hooks/useGeolocation";
import CheckButton from "./CheckButton";

interface CheckStatusCardProps {
    statusLoading: boolean;
    isCheckedIn: boolean;
    checkInTime: string | null;
    acting: boolean;
    onCheckClick: () => void;
    locationStatus: LocationStatus;
    onRetryLocation: () => void;
}

export default function CheckStatusCard({
    statusLoading, isCheckedIn, checkInTime, acting, onCheckClick,
    locationStatus, onRetryLocation,
}: CheckStatusCardProps) {
    return (
        <div className="px-4 -mt-10 relative z-10 animate-in fade-in-0 slide-in-from-bottom-3 duration-500" style={{ animationDelay: "80ms", animationFillMode: "backwards" }}>
            <div className="bg-white rounded-3xl p-6 shadow-lg shadow-black/5 border border-gray-100 flex flex-col items-center">
                {statusLoading ? (
                    <div className="py-10"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
                ) : (
                    <>
                        <div className={`w-full flex items-center justify-start gap-2 p-3 rounded-xl mb-6 transition-colors duration-300 ${isCheckedIn ? "bg-emerald-50" : "bg-amber-50"
                            }`}>
                            {isCheckedIn ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                    <span className="text-emerald-700 text-sm font-medium">حضور شما ثبت شده است</span>
                                </>
                            ) : (
                                <>
                                    <Clock className="w-5 h-5 text-amber-500" />
                                    <span className="text-amber-700 text-sm font-medium">در انتظار ثبت حضور</span>
                                </>
                            )}
                        </div>

                        <CheckButton isCheckedIn={isCheckedIn} loading={acting} onClick={onCheckClick} />

                        {isCheckedIn && checkInTime && (
                            <div className="mt-5 w-full bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center justify-start gap-2 animate-in fade-in-0">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span className="text-blue-800 text-sm">
                                    زمان ورود: <span className="font-bold">{checkInTime}</span>
                                </span>
                            </div>
                        )}

                        {locationStatus === "denied" && (
                        <div className="mt-3 w-full bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-red-500" />
                                <span className="text-red-700 text-xs">دسترسی به موقعیت مکانی رد شده است</span>
                            </div>
                            <button onClick={onRetryLocation} className="text-primary text-xs font-medium">تلاش مجدد</button>
                        </div>
                        )}
                        {locationStatus === "unavailable" && (
                            <div className="mt-3 w-full bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center justify-start gap-2">
                                <MapPin className="w-4 h-4 text-red-500" />
                                <span className="text-red-700 text-xs">موقعیت مکانی در دسترس نیست</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}