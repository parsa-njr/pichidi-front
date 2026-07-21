import { LogOut } from "lucide-react";

interface LogoutButtonProps {
    label: string;
    onClick: () => void;
}

export default function LogoutButton({ label, onClick }: LogoutButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-full bg-red-50 text-red-600 py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 border border-red-100"
        >
            <LogOut className="w-4 h-4" />
            {label}
        </button>
    );
}