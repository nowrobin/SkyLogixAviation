"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "./_components/AdminSidebar";
import AdminHeader from "./_components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const isSignInPage = pathname === "/admin/signIn";

  useEffect(() => {
    if (isSignInPage) {
      setIsAuth(false);
      return;
    }

    fetch("/api/admin/auth/check")
      .then((res) => {
        if (res.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
          router.replace("/admin/signIn");
        }
      })
      .catch(() => {
        setIsAuth(false);
        router.replace("/admin/signIn");
      });
  }, [pathname, isSignInPage, router]);

  if (isSignInPage) {
    return <>{children}</>;
  }

  if (isAuth === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-[#0A1628]" />
          <p className="text-xs text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
