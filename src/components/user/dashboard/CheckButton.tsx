import { Loader2, LogIn, LogOut } from "lucide-react";

interface CheckButtonProps {
    isCheckedIn: boolean;
    loading: boolean;
    onClick: () => void;
}

export default function CheckButton({ isCheckedIn, loading, onClick }: CheckButtonProps) {
    return (
        <div className="relative w-44 h-44 flex items-center justify-center">
            {isCheckedIn && (
                <span className="absolute inset-0 rounded-full animate-ping opacity-10 bg-emerald-500" />
            )}
            <div
                className={`absolute inset-0 rounded-full border-4 transition-colors duration-500 ${isCheckedIn ? "border-emerald-400" : "border-primary/30"
                    }`}
            />
            <button
                onClick={onClick}
                disabled={loading}
                className={`relative w-36 h-36 rounded-full flex flex-col items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-95 hover:scale-[1.03]
          ${isCheckedIn
                        ? "bg-gradient-to-br from-red-400 to-red-500 shadow-red-200"
                        : "bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-emerald-200"
                    }`}
            >
                {loading ? (
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                ) : isCheckedIn ? (
                    <>
                        <LogOut className="w-7 h-7 text-white animate-pop-success" />
                        <span className="text-white text-sm font-bold">خروج</span>
                    </>
                ) : (
                    <>
                        <LogIn className="w-7 h-7 text-white animate-pop-success" />
                        <span className="text-white text-sm font-bold">ورود</span>
                    </>
                )}
            </button>
        </div>
    );
}