import { MoreVertical, Pencil, Trash2, MapPin } from "lucide-react";
import { LocationPayload } from "@/api/customer/location/api";

interface ILocation extends LocationPayload {
    _id: string;
}

interface LocationCardProps {
    location: ILocation;
    menuOpen: boolean;
    onToggleMenu: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export default function LocationCard({ location, menuOpen, onToggleMenu, onEdit, onDelete }: LocationCardProps) {
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
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-right">
                <p className="text-sm font-semibold text-gray-800">{location.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                    {location.latitude.toFixed(4)} / {location.longitude.toFixed(4)}
                </p>
                {/* <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1.5 inline-block">
                    شعاع: {location.range} متر
                </span> */}
            </div>
            <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1.5 inline-block">
                شعاع: {location.range} متر
            </span>

        </div>
    );
}