"use client";
import ProjectsCards from "@/src/components/dashboard/Projects";
import QuickActions from "@/src/components/dashboard/QuickActions";
import RecentActivity from "@/src/components/dashboard/RecentActivity";
import StatsCards from "@/src/components/dashboard/TotalStats";
import { useEffect, useState } from "react";
import AddProject from "@/src/components/dashboard/AddProject";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) setUserId(storedId);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans px-6 py-8">
      <div className="mx-auto flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-slate-400">
              Manage your API mocks and collections
            </p>
          </div>

          <AddProject open={open} setOpen={setOpen} userId={userId} />
        </div>

        <StatsCards />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Projects</h2>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                View All
              </button>
            </div>
            <ProjectsCards />
          </div>

          <div className="flex flex-col gap-8">
            <QuickActions />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
