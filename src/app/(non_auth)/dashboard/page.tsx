import ProjectsCards from "@/components/dashboard/Projects";
import StatsCards from "@/components/dashboard/TotalStats";
import React from "react";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col pt-6 gap-5">

        <StatsCards />
        <div className="font-bold underline text-xl ml-2">My Projects</div>
        <ProjectsCards />
      </div>
    </>
  );
}
