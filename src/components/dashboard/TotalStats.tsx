import { Folder, Link2, TrendingUp, Users } from "lucide-react";
import StatCard from "../common/StatCard";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Projects"
        value="0"
        icon={<Folder className="h-5 w-5 text-blue-400" />}
        iconBg="bg-blue-500/10"
      />
      <StatCard
        title="Active Endpoints"
        value="0"
        icon={<Link2 className="h-5 w-5 text-green-400" />}
        iconBg="bg-green-500/10"
      />
      <StatCard
        title="API Calls Today"
        value="0"
        icon={<TrendingUp className="h-5 w-5 text-purple-400" />}
        iconBg="bg-purple-500/10"
      />
      <StatCard
        title="Team Members"
        value="0"
        icon={<Users className="h-5 w-5 text-orange-400" />}
        iconBg="bg-orange-500/10"
      />
    </div>

  );
}
