import { Folder, Link2, TrendingUp, Users } from "lucide-react";
import StatCard from "../common/StatCard";
export default function StatsCards(): React.ReactNode {
  return (
    <div className="flex flex-row flex-wrap justify-start items-start gap-4">
      <StatCard
        title="Total Projects"
        value="0"
        icon={<Folder size={20} color={"blue"} />}
      />
      <StatCard
        title="Active Endpoints"
        value="0"
        icon={<Link2 size={20} color={"green"} />}
      />
      <StatCard
        title="API Calls Today"
        value="0"
        icon={<TrendingUp size={20} color={"purple"} />}
      />
      <StatCard
        title="Team Members"
        value="0"
        icon={<Users size={20} color={"orange"} />}
      />
    </div>
  );
}
