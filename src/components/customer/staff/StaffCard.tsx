import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import Avatar from "@/components/shared/Avatar";
import { resolveImageUrl } from "@/utils/resolveImageUrl";

interface IUser {
    _id: string;
    name: string;
    phone: string;
    profileImage?: string;
    location: { _id: string; name: string };
    shift: { _id: string; shiftName: string };
}

interface StaffCardProps {
    user: IUser;
    menuOpen: boolean;
    onToggleMenu: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export default function StaffCard({ user, menuOpen, onToggleMenu, onEdit, onDelete }: StaffCardProps) {
    return (
        <div dir="rtl" className="bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center gap-3">
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
            <Avatar name={user.name} image={resolveImageUrl(user.profileImage)} />
            <div className="flex-1 text-right">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{user.phone}</p>
                <div className="flex items-center justify-end gap-2 mt-1.5">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {user.shift?.shiftName ?? "—"}
                    </span>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {user.location?.name ?? "—"}
                    </span>
                </div>
            </div>


        </div>
    );
}