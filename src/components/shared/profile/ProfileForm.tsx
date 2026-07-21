"use client";

import { User, Phone, Lock } from "lucide-react";
import FieldCard from "@/components/shared/FieldCard";
import ProfileAvatarUpload from "./ProfileAvatarUpload";

interface ProfileFormProps {
    name: string;
    phone: string;
    password: string;
    avatarSrc?: string;
    onNameChange: (v: string) => void;
    onPhoneChange: (v: string) => void;
    onPasswordChange: (v: string) => void;
    onFileSelect: (file: File) => void;
    onSaveClick: () => void;
    passwordPlaceholder?: string;
    saveLabel?: string;
}

export default function ProfileForm({
    name,
    phone,
    password,
    avatarSrc,
    onNameChange,
    onPhoneChange,
    onPasswordChange,
    onFileSelect,
    onSaveClick,
    passwordPlaceholder = "رمز عبور جدید خود را وارد کنید",
    saveLabel = "ذخیره تغییرات",
}: ProfileFormProps) {
    return (
        <>
            <ProfileAvatarUpload name={name} avatarSrc={avatarSrc} onFileSelect={onFileSelect} />

            <FieldCard label="نام" icon={User}>
                <input
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="نام خود را وارد کنید"
                    dir="rtl"
                    className="w-full border-b border-gray-200 pb-2 text-sm text-gray-800 text-right bg-transparent focus:outline-none focus:border-primary transition-colors"
                />
            </FieldCard>

            <FieldCard label="شماره تماس" icon={Phone}>
                <input
                    value={phone}
                    onChange={(e) => onPhoneChange(e.target.value)}
                    placeholder="شماره تماس خود را وارد کنید"
                    dir="rtl"
                    type="tel"
                    className="w-full border-b border-gray-200 pb-2 text-sm text-gray-800 text-right bg-transparent focus:outline-none focus:border-primary transition-colors"
                />
            </FieldCard>

            <FieldCard label="رمز عبور" icon={Lock}>
                <input
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    placeholder={passwordPlaceholder}
                    dir="rtl"
                    type="password"
                    className="w-full border-b border-gray-200 pb-2 text-sm text-gray-800 text-right bg-transparent focus:outline-none focus:border-primary transition-colors"
                />
            </FieldCard>

            <button
                onClick={onSaveClick}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-medium text-sm mb-3 flex items-center justify-center gap-2"
            >
                {saveLabel}
            </button>
        </>
    );
}