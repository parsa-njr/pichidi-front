import { User } from "lucide-react";

interface AvatarProps {
    name: string;
    image?: string | null;
    size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
};

export default function Avatar({ name, image, size = "md" }: AvatarProps) {
    const sizeClass = SIZE_MAP[size];

    if (image) {
        return (
            <img
                src={image}
                alt={name}
                className={`${sizeClass} rounded-full object-cover border-2 border-primary/20`}
            />
        );
    }

    return (
        <div className={`${sizeClass} rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 flex-shrink-0`}>
            <User className="w-5 h-5 text-primary" />
        </div>
    );
}