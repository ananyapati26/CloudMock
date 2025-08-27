"use client";
import Navbar from "@/src/components/navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);

    if (!id) {
      router.replace("/login");
    }
  }, [router]);

  if (userId === null) return null; 
  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />
      <div className="mx-auto px-6 py-8">{children}</div>
    </main>
  );
}
