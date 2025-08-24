import ProjectsCards from "@/src/components/dashboard/Projects";
import StatsCards from "@/src/components/dashboard/TotalStats";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans px-6 py-8">
      <div className="mx-auto flex flex-col gap-8">
        {/* Stats Section */}
        <StatsCards />

        {/* Projects Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">
            My Projects
          </h2>
          <ProjectsCards />
        </div>
      </div>
    </div>
  );
}
