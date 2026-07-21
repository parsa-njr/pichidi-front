"use client";

import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMe } from "@/api/auth/queries";
import LoginForm from "./LoginForm";
import OtpForm from "./OtpForm";
import RegisterForm from "./RegisterForm";

export default function AuthContainer() {
  const { data: me, isSuccess } = useMe();

  useEffect(() => {
    if (isSuccess && me) {
      window.location.href = me.role === "customer" ? "/customer" : "/user";
    }
  }, [isSuccess, me]);

  return (
    <div dir="rtl" className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col items-center gap-3 pt-10 pb-6 px-6">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-primary-foreground text-2xl font-black">P</span>
          </div>
          <h1 className="text-foreground text-xl font-bold tracking-tight">Pichidi</h1>
          <p className="text-muted-foreground text-xs">دروازهٔ ورود به پنل مدیریت</p>
        </div>

        <div className="px-6 pb-10">
          <Tabs defaultValue="password">
            <TabsList className="grid grid-cols-2 mb-6 bg-muted rounded-2xl p-1 h-11">
              <TabsTrigger value="password" className="rounded-xl text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                ورود
              </TabsTrigger>
              <TabsTrigger value="register" className="rounded-xl text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                ثبت‌نام
              </TabsTrigger>
            </TabsList>

            <TabsContent value="password">
              <Tabs defaultValue="pass-tab" className="w-full">
                <TabsList className="w-full bg-muted rounded-xl p-1 h-9 mb-4">
                  <TabsTrigger value="pass-tab" className="flex-1 text-xs data-[state=active]:bg-secondary rounded-lg">
                    رمز عبور
                  </TabsTrigger>
                  <TabsTrigger value="otp-tab" className="flex-1 text-xs data-[state=active]:bg-secondary rounded-lg">
                    کد یک‌بارمصرف
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pass-tab">
                  <LoginForm />
                </TabsContent>

                <TabsContent value="otp-tab">
                  <OtpForm />
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}