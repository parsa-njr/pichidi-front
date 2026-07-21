import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon: LucideIcon;
    message: string;
}

export default function EmptyState({ icon: Icon, message }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center pt-20 gap-3">
            <Icon className="w-12 h-12 text-gray-200" />
            <p className="text-gray-400 text-sm">{message}</p>
        </div>
    );
}