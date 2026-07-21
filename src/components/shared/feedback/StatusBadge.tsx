interface StatusBadgeProps {
    label: string;
    className?: string;
}

export default function StatusBadge({ label, className = "" }: StatusBadgeProps) {
    return (
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${className}`}>
            {label}
        </span>
    );
}