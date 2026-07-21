"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/AppModal";
import ProfileForm from "@/components/shared/profile/ProfileForm";
import LogoutButton from "@/components/shared/profile/LogoutButton";
import { useCustomerProfile, useUpdateCustomerProfile } from "@/api/customer/profile/queries";
import { useLogout } from "@/api/auth/queries";
import { resolveImageUrl } from "@/utils/resolveImageUrl";

export default function ProfileContainer() {
    const { data: profile, isLoading } = useCustomerProfile();
    const updateProfile = useUpdateCustomerProfile();
    const logout = useLogout();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [showLogout, setShowLogout] = useState(false);
    const [showSave, setShowSave] = useState(false);

    useEffect(() => {
        if (profile) {
            setName(profile.name ?? "");
            setPhone(profile.phone ?? "");
        }
    }, [profile]);

    const handleFileSelect = (file: File) => {
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSave = () => {
        updateProfile.mutate(
            { name, phone, password: password || undefined, profileImage: imageFile },
            {
                onSuccess: () => {
                    setPassword("");
                    setImageFile(null);
                    setShowSave(false);
                },
            }
        );
    };

    const handleLogout = () => {
        setShowLogout(false);
        logout.mutate();
    };

    if (isLoading) {
        return (
            <div dir="rtl" className="flex items-center justify-center min-h-full">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
        );
    }

    const avatarSrc = previewUrl ?? resolveImageUrl(profile?.profileImage);

    return (
        <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
            <div className="bg-white px-5 pt-6 pb-4 shadow-sm">
                <p className="text-base font-bold text-gray-800 text-right">پروفایل</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5 pb-24">
                <ProfileForm
                    name={name}
                    phone={phone}
                    password={password}
                    avatarSrc={avatarSrc}
                    onNameChange={setName}
                    onPhoneChange={setPhone}
                    onPasswordChange={setPassword}
                    onFileSelect={handleFileSelect}
                    onSaveClick={() => setShowSave(true)}
                    saveLabel="ویرایش پروفایل"
                />

                <LogoutButton label="خروج از حساب" onClick={() => setShowLogout(true)} />
            </div>

            <ConfirmDialog
                open={showSave}
                title="آیا مطمئن هستید که می‌خواهید اطلاعات را ویرایش کنید؟"
                onClose={() => setShowSave(false)}
                onConfirm={handleSave}
                loading={updateProfile.isPending}
            />

            <ConfirmDialog
                open={showLogout}
                title="می‌خواهید از حساب خود خارج شوید؟"
                onClose={() => setShowLogout(false)}
                onConfirm={handleLogout}
                loading={logout.isPending}
                variant="danger"
            />
        </div>
    );
}