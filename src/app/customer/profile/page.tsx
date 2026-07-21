// "use client";

// import { useState, useEffect, useRef } from "react";
// import { User, Phone, Lock, LogOut, Camera, Loader2 } from "lucide-react";
// import { ConfirmDialog } from "@/components/ui/AppModal";
// import { useCustomerProfile, useUpdateCustomerProfile } from "@/api/customer/profile/queries";
// import { useLogout } from "@/api/auth/queries";
// import { resolveImageUrl } from "@/utils/resolveImageUrl";

// function FieldCard({ label, icon: Icon, children }: {
//   label: string; icon: React.ElementType; children: React.ReactNode;
// }) {
//   return (
//     <div dir="rtl" className="bg-white rounded-2xl p-5 mb-3 shadow-sm border border-gray-100">
//       <div className="flex items-center justify-end gap-2 mb-3">
//         <p className="text-sm text-gray-500 font-medium">{label}</p>
//         <Icon className="w-4 h-4 text-gray-400" />
//       </div>
//       {children}
//     </div>
//   );
// }

// export default function CustomerProfilePage() {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const { data: profile, isLoading } = useCustomerProfile();
//   const updateProfile = useUpdateCustomerProfile();
//   const logout = useLogout();

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [showLogout, setShowLogout] = useState(false);
//   const [showSave, setShowSave] = useState(false);

//   useEffect(() => {
//     if (profile) {
//       setName(profile.name ?? "");
//       setPhone(profile.phone ?? "");
//     }
//   }, [profile]);

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImageFile(file);
//     setPreviewUrl(URL.createObjectURL(file));
//   };

//   const handleSave = () => {
//     updateProfile.mutate(
//       { name, phone, password: password || undefined, profileImage: imageFile },
//       {
//         onSuccess: () => {
//           setPassword("");
//           setImageFile(null);
//           setShowSave(false);
//         },
//       }
//     );
//   };

//   const handleLogout = () => {
//     setShowLogout(false);
//     logout.mutate();
//   };

//   if (isLoading) {
//     return (
//       <div dir="rtl" className="flex items-center justify-center min-h-full">
//         <Loader2 className="w-6 h-6 text-primary animate-spin" />
//       </div>
//     );
//   }

//   const avatarSrc = previewUrl ?? resolveImageUrl(profile?.profileImage);

//   return (
//     <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
//       <div className="bg-white px-5 pt-6 pb-4 shadow-sm">
//         <p className="text-base font-bold text-gray-800 text-right">پروفایل</p>
//       </div>

//       <div className="flex-1 overflow-y-auto px-4 py-5 pb-24">
//         <div className="flex flex-col items-center mb-6">
//           <div className="relative">
//             <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary/20 overflow-hidden flex items-center justify-center">
//               {avatarSrc ? (
//                 <img src={avatarSrc} alt={name} className="w-full h-full object-cover" />
//               ) : (
//                 <User className="w-10 h-10 text-primary" />
//               )}
//             </div>
//             <button
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//               className="absolute bottom-0 left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow"
//             >
//               <Camera className="w-3.5 h-3.5 text-white" />
//             </button>
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleFileSelect}
//             />
//           </div>
//           <p className="text-xs text-gray-400 mt-2">روی آیکون دوربین کلیک کنید تا عکس را تغییر دهید</p>
//         </div>

//         <FieldCard label="نام" icon={User}>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="نام خود را وارد کنید"
//             dir="rtl"
//             className="w-full border-b border-gray-200 pb-2 text-sm text-gray-800 text-right bg-transparent focus:outline-none focus:border-primary"
//           />
//         </FieldCard>

//         <FieldCard label="شماره تماس" icon={Phone}>
//           <input
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="شماره تماس خود را وارد کنید"
//             dir="rtl"
//             type="tel"
//             className="w-full border-b border-gray-200 pb-2 text-sm text-gray-800 text-right bg-transparent focus:outline-none focus:border-primary"
//           />
//         </FieldCard>

//         <FieldCard label="رمز عبور" icon={Lock}>
//           <input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="رمز عبور جدید خود را وارد کنید"
//             dir="rtl"
//             type="password"
//             className="w-full border-b border-gray-200 pb-2 text-sm text-gray-800 text-right bg-transparent focus:outline-none focus:border-primary"
//           />
//         </FieldCard>

//         <button
//           onClick={() => setShowSave(true)}
//           className="w-full bg-primary text-white py-3.5 rounded-xl font-medium text-sm mb-4 flex items-center justify-center gap-2"
//         >
//           ویرایش پروفایل
//         </button>

//         <button
//           onClick={() => setShowLogout(true)}
//           className="w-full bg-red-50 text-red-600 py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 border border-red-100"
//         >
//           <LogOut className="w-4 h-4" />
//           خروج از حساب کاربری
//         </button>
//       </div>

//       <ConfirmDialog
//         open={showSave}
//         title="آیا مطمئن هستید که می‌خواهید اطلاعات را ویرایش کنید؟"
//         onClose={() => setShowSave(false)}
//         onConfirm={handleSave}
//         loading={updateProfile.isPending}
//       />

//       <ConfirmDialog
//         open={showLogout}
//         title="می‌خواهید از حساب خود خارج شوید؟"
//         onClose={() => setShowLogout(false)}
//         onConfirm={handleLogout}
//         loading={logout.isPending}
//         variant="danger"
//       />
//     </div>
//   );
// }

import ProfileContainer from "@/components/customer/profile/ProfileContainer";

export default function CustomerProfilePage() {
  return <ProfileContainer />;
}