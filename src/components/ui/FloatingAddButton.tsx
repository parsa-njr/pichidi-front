"use client";
import { Plus } from "lucide-react";

interface FloatingAddButtonProps {
    onClick: () => void;
    icon?: React.ReactNode;
}

export default function FloatingAddButton({ onClick, icon }: FloatingAddButtonProps) {
    return (
        <button
            onClick={onClick}
            className="absolute bottom-24 right-5 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center z-30 active:scale-95 transition-transform"
        >
            {icon ?? <Plus className="w-6 h-6 text-white" />}
        </button>
    );
}