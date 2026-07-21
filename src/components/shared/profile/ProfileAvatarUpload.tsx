"use client";

import { useRef } from "react";
import { User, Camera } from "lucide-react";

interface ProfileAvatarUploadProps {
    name: string;
    avatarSrc?: string;
    onFileSelect: (file: File) => void;
    hint?: string;
}

export default function ProfileAvatarUpload({
    name,
    avatarSrc,
    onFileSelect,
    hint = "روی آیکون دوربین کلیک کنید تا عکس را تغییر دهید",
}: ProfileAvatarUploadProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onFileSelect(file);
    };

    return (
        <div className="flex flex-col items-center mb-6">
            <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary/20 overflow-hidden flex items-center justify-center">
                    {avatarSrc ? (
                        <img src={avatarSrc} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-10 h-10 text-primary" />
                    )}
                </div>
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow"
                >
                    <Camera className="w-3.5 h-3.5 text-white" />
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">{hint}</p>
        </div>
    );
}