"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../common/ProjectCard";

interface Project {
  id: string;
  name: string;
  desc: string | null;
  slug: string;
  _count: {
    collections: number;
  };
}

export default function ProjectsCards(): React.ReactNode {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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
        limit: 5,
      });

      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-slate-400 bg-slate-900 rounded-xl shadow-md">
        Loading projects...
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="p-6 text-center text-slate-400 bg-slate-900 rounded-xl shadow-md">
        No projects found. Create your first project!
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap justify-start items-start gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          desc={project.desc || "No description"}
          slug={project.slug}
          collectionsCount={project._count.collections}
        />
      ))}
    </div>
  );
}
