"use client";
import { Folder, Link2, TrendingUp, Users } from "lucide-react";
import StatCard from "../common/StatCard";
import { useEffect, useState } from "react";
import axios from "axios";

// interface Project {
//   id: string;
//   name: string;
//   desc: string | null;
//   slug: string;
//   _count: {
//     collections: number;
//   };
// }

export default function StatsCards() {
  const [projectsCount, setProjectsCount] = useState(0);
  const [endpointsCount, setEndpointsCount] = useState(0);
  const [collectionCount, setCollectionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await axios.post("/api/projects/AllProjects", {
          userId,
        });

        setProjectsCount(response.data.length);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

     const fetchCollections = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await axios.post("/api/projects/AllCollections", {
          userId,
        });
        setCollectionCount(response.data.length);
      } catch (error) {
        console.error("Error fetching endpoints:", error);
      }
    };

    const fetchEndpoints = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await axios.post("/api/projects/AllEndpoints", {
          userId,
        });
        setEndpointsCount(response.data.length);
      } catch (error) {
        console.error("Error fetching endpoints:", error);
      }
    };

    fetchProjects();
    fetchCollections();
    fetchEndpoints();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Projects"
        value={projectsCount}
        icon={<Folder className="h-5 w-5 text-blue-400" />}
        iconBg="bg-blue-500/10"
      />
      <StatCard
        title="Active Endpoints"
        value={endpointsCount}
        icon={<Link2 className="h-5 w-5 text-green-400" />}
        iconBg="bg-green-500/10"
      />
      <StatCard
        title="Active Collections"
        value={collectionCount}
        icon={<TrendingUp className="h-5 w-5 text-purple-400" />}
        iconBg="bg-purple-500/10"
      />
      <StatCard
        title="Team Members"
        value={0}
        icon={<Users className="h-5 w-5 text-orange-400" />}
        iconBg="bg-orange-500/10"
      />
    </div>
  );
}
