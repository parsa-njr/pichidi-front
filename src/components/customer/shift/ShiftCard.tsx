import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface IShift {
    _id: string;
    shiftName: string;
    startDate: string;
    endDate: string;
    formalHolidays: boolean;
    shiftDays: { day: number }[];
}

function toJalali(iso?: string) {
    if (!iso) return "—";
    try {
        return new Intl.DateTimeFormat("fa-IR", {
            year: "numeric", month: "2-digit", day: "2-digit", calendar: "persian",
        }).format(new Date(iso));
    } catch { return iso.slice(0, 10); }
}

interface ShiftCardProps {
    shift: IShift;
    menuOpen: boolean;
    onToggleMenu: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export default function ShiftCard({ shift, menuOpen, onToggleMenu, onEdit, onDelete }: ShiftCardProps) {
    return (
        <div dir="rtl" className="bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100">
            <div className="flex items-start gap-2">
                <div className="relative">
                    <button
                        onClick={onToggleMenu}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
                    >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 top-9 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-40 min-w-[130px]">
                            <button
                                onClick={onEdit}
                                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 w-full"
                            >
                                <Pencil className="w-3.5 h-3.5" /> ویرایش
                            </button>
                            <button
                                onClick={onDelete}
                                className="flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 w-full"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> حذف
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex-1 text-right">
                    <p className="text-sm font-bold text-gray-800 mb-3">{shift.shiftName}</p>
                    <div className="h-px bg-gray-100 mb-3" />
                    <div className="flex justify-between">

                        <div className="text-right">
                            <p className="text-xs text-gray-400 mb-0.5">از تاریخ</p>
                            <p className="text-sm text-gray-600 font-medium">{toJalali(shift.startDate)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400 mb-0.5">تا تاریخ</p>
                            <p className="text-sm text-gray-600 font-medium">{toJalali(shift.endDate)}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-2">
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {shift.shiftDays.length} روز
                        </span>
                        {shift.formalHolidays && (
                            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                تعطیلات رسمی
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}