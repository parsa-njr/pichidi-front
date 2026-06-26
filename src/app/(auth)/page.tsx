// // "use client";

// // import { useState } from "react";
// // import AuthCard from "@/components/auth/AuthCard";
// // // import { useLogin } from "@/hooks/useAuth";

// // export default function LoginPage() {
// //   // const login = useLogin();

// //   const [form, setForm] = useState({
// //     phone: "",
// //     password: "",
// //   });

// //   return (
// //     <AuthCard title="ورود">
// //       <div className="space-y-4">
// //         <input
// //           className="w-full p-3 rounded-xl bg-white/10 text-white outline-none border border-white/10"
// //           placeholder="شماره موبایل"
// //           onChange={(e) => setForm({ ...form, phone: e.target.value })}
// //         />

// //         <input
// //           type="password"
// //           className="w-full p-3 rounded-xl bg-white/10 text-white outline-none border border-white/10"
// //           placeholder="رمز عبور"
// //           onChange={(e) => setForm({ ...form, password: e.target.value })}
// //         />

// //         <button
// //           // onClick={() => login.mutate(form)}
// //           // disabled={login.isPending}
// //           className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition"
// //         >
// //           {/* {login.isPending ? "در حال ورود..." : "ورود"} */}
// //           ورود
// //         </button>

// //         {/* {login.isError && (
// //           <p className="text-red-400 text-sm text-center">
// //             خطا در ورود
// //           </p>
// //         )} */}
// //       </div>
// //     </AuthCard>
// //   );
// // }


// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";

// import { Input } from "@/components/ui/input";

// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";

// import { Loader2 } from "lucide-react";

// type LoginForm = {
//   phone: string;
//   password: string;
// };

// type OtpForm = {
//   phone: string;
//   code: string;
// };

// type RegisterForm = {
//   name: string;
//   phone: string;
//   password: string;
//   location: string;
//   shift: string;
// };

// export default function LoginPage() {
//   const [otpSent, setOtpSent] = useState(false);

//   const [loading, setLoading] = useState(false);

//   // -----------------------------
//   // Password Login
//   // -----------------------------

//   const loginForm = useForm<LoginForm>({
//     defaultValues: {
//       phone: "",
//       password: "",
//     },
//   });

//   // -----------------------------
//   // OTP Login
//   // -----------------------------

//   const otpForm = useForm<OtpForm>({
//     defaultValues: {
//       phone: "",
//       code: "",
//     },
//   });

//   // -----------------------------
//   // Register
//   // -----------------------------

//   const registerForm = useForm<RegisterForm>({
//     defaultValues: {
//       name: "",
//       phone: "",
//       password: "",
//       location: "",
//       shift: "",
//     },
//   });

//   // -----------------------------
//   // Password Login Submit
//   // -----------------------------

//   const onPasswordLogin = async (
//     data: LoginForm
//   ) => {
//     try {
//       setLoading(true);

//       await axios.post(
//         "http://localhost:3000/api/auth/login",
//         data,
//         {
//           withCredentials: true,
//         }
//       );

//       alert("ورود موفق");
//     } catch (error: any) {
//       alert(
//         error?.response?.data?.message ||
//           "خطا در ورود"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -----------------------------
//   // Send OTP
//   // -----------------------------

//   const sendOtp = async () => {
//     try {
//       setLoading(true);

//       const phone =
//         otpForm.getValues("phone");

//       await axios.post(
//         "http://localhost:3000/api/auth/send-otp",
//         {
//           phone,
//         }
//       );

//       setOtpSent(true);

//       alert(
//         "کد تایید ارسال شد (1234)"
//       );
//     } catch (error: any) {
//       alert(
//         error?.response?.data?.message ||
//           "خطا در ارسال کد"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -----------------------------
//   // Verify OTP
//   // -----------------------------

//   const verifyOtp = async (
//     data: OtpForm
//   ) => {
//     try {
//       setLoading(true);

//       await axios.post(
//         "http://localhost:3000/api/auth/verify-otp",
//         data,
//         {
//           withCredentials: true,
//         }
//       );

//       alert("ورود موفق");
//     } catch (error: any) {
//       alert(
//         error?.response?.data?.message ||
//           "کد اشتباه است"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -----------------------------
//   // Register Submit
//   // -----------------------------

//   const onRegister = async (
//     data: RegisterForm
//   ) => {
//     try {
//       setLoading(true);

//       await axios.post(
//         "http://localhost:3000/api/auth/sign-up",
//         data,
//         {
//           withCredentials: true,
//         }
//       );

//       alert("ثبت نام موفق");
//     } catch (error: any) {
//       alert(
//         error?.response?.data?.message ||
//           "خطا در ثبت نام"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center px-4">
//       <Card className="w-full max-w-md border border-secondary/20 shadow-2xl rounded-3xl">
//         <CardHeader className="space-y-2 text-center">
//           <CardTitle className="text-3xl font-black text-primary">
//             Pichidi
//           </CardTitle>

//           <p className="text-secondary text-sm">
//             ورود و ثبت نام مدرن
//           </p>
//         </CardHeader>

//         <CardContent>
//           <Tabs defaultValue="password">
//             <TabsList className="grid grid-cols-3 mb-6">
//               <TabsTrigger value="password">
//                 رمز عبور
//               </TabsTrigger>

//               <TabsTrigger value="otp">
//                 کد تایید
//               </TabsTrigger>

//               <TabsTrigger value="register">
//                 ثبت نام
//               </TabsTrigger>
//             </TabsList>

//             {/* -------------------------------- */}
//             {/* PASSWORD LOGIN */}
//             {/* -------------------------------- */}

//             <TabsContent value="password">
//               <form
//                 onSubmit={loginForm.handleSubmit(
//                   onPasswordLogin
//                 )}
//                 className="space-y-4"
//               >
//                 <Input
//                   placeholder="شماره موبایل"
//                   {...loginForm.register(
//                     "phone"
//                   )}
//                   className="h-12 rounded-2xl"
//                 />

//                 <Input
//                   type="password"
//                   placeholder="رمز عبور"
//                   {...loginForm.register(
//                     "password"
//                   )}
//                   className="h-12 rounded-2xl"
//                 />

//                 <Button
//                   disabled={loading}
//                   className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90"
//                 >
//                   {loading ? (
//                     <Loader2 className="animate-spin" />
//                   ) : (
//                     "ورود"
//                   )}
//                 </Button>
//               </form>
//             </TabsContent>

//             {/* -------------------------------- */}
//             {/* OTP LOGIN */}
//             {/* -------------------------------- */}

//             <TabsContent value="otp">
//               <form
//                 onSubmit={otpForm.handleSubmit(
//                   verifyOtp
//                 )}
//                 className="space-y-4"
//               >
//                 <Input
//                   placeholder="شماره موبایل"
//                   {...otpForm.register(
//                     "phone"
//                   )}
//                   className="h-12 rounded-2xl"
//                 />

//                 {/* {otpSent && ( */}
//                   <Input
//                     placeholder="کد تایید"
//                     {...otpForm.register(
//                       "code"
//                     )}
//                     className="h-12 rounded-2xl"
//                   />
//                 {/* )} */}

//                 {!otpSent ? (
//                   <Button
//                     type="button"
//                     onClick={sendOtp}
//                     disabled={loading}
//                     className="w-full h-12 rounded-2xl bg-secondary text-white hover:bg-secondary/90"
//                   >
//                     {loading ? (
//                       <Loader2 className="animate-spin" />
//                     ) : (
//                       "ارسال کد تایید"
//                     )}
//                   </Button>
//                 ) : (
//                   <Button
//                     disabled={loading}
//                     className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90"
//                   >
//                     {loading ? (
//                       <Loader2 className="animate-spin" />
//                     ) : (
//                       "تایید کد"
//                     )}
//                   </Button>
//                 )}
//               </form>
//             </TabsContent>

//             {/* -------------------------------- */}
//             {/* REGISTER */}
//             {/* -------------------------------- */}

//             <TabsContent value="register">
//               <form
//                 onSubmit={registerForm.handleSubmit(
//                   onRegister
//                 )}
//                 className="space-y-4"
//               >
//                 <Input
//                   placeholder="نام"
//                   {...registerForm.register(
//                     "name"
//                   )}
//                   className="h-12 rounded-2xl"
//                 />

//                 <Input
//                   placeholder="شماره موبایل"
//                   {...registerForm.register(
//                     "phone"
//                   )}
//                   className="h-12 rounded-2xl"
//                 />

//                 <Input
//                   type="password"
//                   placeholder="رمز عبور"
//                   {...registerForm.register(
//                     "password"
//                   )}
//                   className="h-12 rounded-2xl"
//                 />

//                 <Input
//                   placeholder="Location ID"
//                   {...registerForm.register(
//                     "location"
//                   )}
//                   className="h-12 rounded-2xl"
//                 />

//                 <Input
//                   placeholder="Shift ID"
//                   {...registerForm.register(
//                     "shift"
//                   )}
//                   className="h-12 rounded-2xl"
//                 />

//                 <Button
//                   disabled={loading}
//                   className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90"
//                 >
//                   {loading ? (
//                     <Loader2 className="animate-spin" />
//                   ) : (
//                     "ثبت نام"
//                   )}
//                 </Button>
//               </form>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Loader2, Mail, Lock, Phone, KeyRound, Eye, EyeOff, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type LoginForm = {
    phone: string;
    password: string;
};

type OtpForm = {
    phone: string;
    code: string;
};

type RegisterForm = {
    name: string;
    phone: string;
    password: string;
    role: "user" | "customer";
    location?: string;
    shift?: string;
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const API = "http://localhost:3000/api/auth";

const inputBase =
    "h-12 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary pr-10 text-right";

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function LoginPage() {
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);

    const loginForm = useForm<LoginForm>({ defaultValues: { phone: "", password: "" } });
    const otpForm = useForm<OtpForm>({ defaultValues: { phone: "", code: "" } });
    const regForm = useForm<RegisterForm>({ defaultValues: { name: "", phone: "", password: "", role: "user", location: "", shift: "" } });

    const selectedRole = regForm.watch("role");

    // ── Password Login ──────────────────────────
    const onPasswordLogin = async (data: LoginForm) => {
        try {
            setLoading(true);
            await axios.post(`${API}/login`, data, { withCredentials: true });
            alert("ورود موفق");
        } catch (err: any) {
            alert(err?.response?.data?.message || "خطا در ورود");
        } finally {
            setLoading(false);
        }
    };

    // ── Send OTP ────────────────────────────────
    const sendOtp = async () => {
        const phone = otpForm.getValues("phone");
        if (!phone) {
            otpForm.setError("phone", { message: "شماره موبایل را وارد کنید" });
            return;
        }
        try {
            setLoading(true);
            await axios.post(`${API}/send-otp`, { phone });
            setOtpSent(true);
            let t = 120;
            setOtpTimer(t);
            const iv = setInterval(() => {
                t -= 1;
                setOtpTimer(t);
                if (t <= 0) clearInterval(iv);
            }, 1000);
        } catch (err: any) {
            alert(err?.response?.data?.message || "خطا در ارسال کد");
        } finally {
            setLoading(false);
        }
    };

    // ── Verify OTP ──────────────────────────────
    const verifyOtp = async (data: OtpForm) => {
        try {
            setLoading(true);
            await axios.post(`${API}/verify-otp`, data, { withCredentials: true });
            alert("ورود موفق");
        } catch (err: any) {
            alert(err?.response?.data?.message || "کد اشتباه است");
        } finally {
            setLoading(false);
        }
    };

    // ── Register ────────────────────────────────
    const onRegister = async (data: RegisterForm) => {
        try {
            setLoading(true);
            await axios.post(`${API}/sign-up`, data, { withCredentials: true });
            alert("ثبت‌نام موفق");
        } catch (err: any) {
            alert(err?.response?.data?.message || "خطا در ثبت‌نام");
        } finally {
            setLoading(false);
        }
    };

    // ─────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-background flex items-center justify-center px-4"
        >
            {/* Card */}
            <div className="w-full max-w-sm rounded-3xl border border-border bg-card backdrop-blur-xl shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex flex-col items-center gap-3 pt-10 pb-6 px-6">
                    {/* Logo – replace with your <Image> */}
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                        <span className="text-primary-foreground text-2xl font-black">P</span>
                    </div>
                    <h1 className="text-foreground text-xl font-bold tracking-tight">Pichidi</h1>
                    <p className="text-muted-foreground text-xs">دروازهٔ ورود به پنل مدیریت</p>
                </div>

                {/* Tabs */}
                <div className="px-6 pb-10">
                    <Tabs defaultValue="password">

                        {/* Tab triggers – ورود / ثبت‌نام */}
                        <TabsList className="grid grid-cols-2 mb-6 bg-muted rounded-2xl p-1 h-11">
                            <TabsTrigger
                                value="password"
                                className="rounded-xl text-sm text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow transition-all"
                            >
                                ورود
                            </TabsTrigger>
                            <TabsTrigger
                                value="register"
                                className="rounded-xl text-sm text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow transition-all"
                            >
                                ثبت‌نام
                            </TabsTrigger>
                        </TabsList>

                        {/* ── PASSWORD / OTP LOGIN ──────────────── */}
                        <TabsContent value="password">
                            <Tabs defaultValue="pass-tab" className="w-full">
                                <TabsList className="w-full bg-muted rounded-xl p-1 h-9 mb-4">
                                    <TabsTrigger
                                        value="pass-tab"
                                        className="flex-1 text-xs text-muted-foreground data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground rounded-lg transition-all"
                                    >
                                        رمز عبور
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="otp-tab"
                                        className="flex-1 text-xs text-muted-foreground data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground rounded-lg transition-all"
                                    >
                                        کد یک‌بارمصرف
                                    </TabsTrigger>
                                </TabsList>

                                {/* Password sub-tab */}
                                <TabsContent value="pass-tab">
                                    <form onSubmit={loginForm.handleSubmit(onPasswordLogin)} className="space-y-3">
                                        <div className="relative">
                                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                placeholder="شماره موبایل"
                                                {...loginForm.register("phone", { required: true })}
                                                className={inputBase}
                                            />
                                        </div>

                                        <div className="relative">
                                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="رمز عبور"
                                                {...loginForm.register("password", { required: true })}
                                                className={`${inputBase} pl-10`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((v) => !v)}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        <button type="button" className="text-primary text-xs hover:text-primary/70 transition w-full text-left">
                                            فراموشی رمز
                                        </button>

                                        <Button
                                            disabled={loading}
                                            className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow shadow-primary/30 transition-all"
                                        >
                                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "ورود"}
                                        </Button>
                                    </form>
                                </TabsContent>

                                {/* OTP sub-tab */}
                                <TabsContent value="otp-tab">
                                    <form onSubmit={otpForm.handleSubmit(verifyOtp)} className="space-y-3">
                                        <div className="relative">
                                            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                placeholder="شماره موبایل"
                                                {...otpForm.register("phone", { required: true })}
                                                className={inputBase}
                                            />
                                        </div>

                                        {otpSent && (
                                            <div className="relative">
                                                <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="کد تایید"
                                                    maxLength={6}
                                                    {...otpForm.register("code", { required: true })}
                                                    className={inputBase}
                                                />
                                            </div>
                                        )}

                                        {!otpSent ? (
                                            <Button
                                                type="button"
                                                onClick={sendOtp}
                                                disabled={loading}
                                                className="w-full h-12 rounded-2xl bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold border border-border transition-all"
                                            >
                                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "ارسال کد تایید"}
                                            </Button>
                                        ) : (
                                            <>
                                                <Button
                                                    disabled={loading}
                                                    className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow shadow-primary/30 transition-all"
                                                >
                                                    {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "تایید کد"}
                                                </Button>
                                                {otpTimer > 0 ? (
                                                    <p className="text-center text-xs text-muted-foreground">
                                                        ارسال مجدد تا <span className="text-primary">{otpTimer}</span> ثانیه دیگر
                                                    </p>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={sendOtp}
                                                        className="text-primary text-xs hover:text-primary/70 transition w-full text-center"
                                                    >
                                                        ارسال مجدد کد
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </form>
                                </TabsContent>
                            </Tabs>
                        </TabsContent>

                        {/* ── REGISTER ──────────────────────────── */}
                        <TabsContent value="register">
                            <form onSubmit={regForm.handleSubmit(onRegister)} className="space-y-3">

                                <div className="relative">
                                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="نام و نام خانوادگی"
                                        {...regForm.register("name", { required: true })}
                                        className={inputBase}
                                    />
                                </div>

                                <div className="relative">
                                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="شماره موبایل"
                                        {...regForm.register("phone", { required: true })}
                                        className={inputBase}
                                    />
                                </div>

                                <div className="relative">
                                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="password"
                                        placeholder="رمز عبور"
                                        {...regForm.register("password", { required: true })}
                                        className={inputBase}
                                    />
                                </div>

                                {/* Role selector */}
                                <div className="grid grid-cols-2 gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => regForm.setValue("role", "user")}
                                        className={`flex items-center justify-center gap-2 h-11 rounded-2xl border text-sm font-medium transition-all
                      ${selectedRole === "user"
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-border bg-muted text-muted-foreground hover:border-primary/40"}`}
                                    >
                                        <User className="w-4 h-4" />
                                        کارمند
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => regForm.setValue("role", "customer")}
                                        className={`flex items-center justify-center gap-2 h-11 rounded-2xl border text-sm font-medium transition-all
                      ${selectedRole === "customer"
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-border bg-muted text-muted-foreground hover:border-primary/40"}`}
                                    >
                                        <Briefcase className="w-4 h-4" />
                                        کارفرما
                                    </button>
                                </div>

                                {/* Extra fields only for employee */}
                                {selectedRole === "user" && (
                                    <>
                                        <Input
                                            placeholder="Location ID"
                                            {...regForm.register("location")}
                                            className={inputBase}
                                        />
                                        <Input
                                            placeholder="Shift ID"
                                            {...regForm.register("shift")}
                                            className={inputBase}
                                        />
                                    </>
                                )}

                                <Button
                                    disabled={loading}
                                    className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow shadow-primary/30 transition-all mt-1"
                                >
                                    {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "ثبت‌نام"}
                                </Button>
                            </form>
                        </TabsContent>

                    </Tabs>
                </div>
            </div>
        </div>
    );
}
