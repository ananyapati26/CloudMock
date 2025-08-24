"use client";

import Navbar from "@/src/components/navbar/Navbar";
// import Navbar from "@/src/components/navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-slate-300">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />
      <div className="mx-auto px-6 py-8">{children}</div>
    </main>
  );
}
