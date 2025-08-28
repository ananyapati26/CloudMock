"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../common/ProjectCard";

interface Project {
  id: string;
  name: string;
  desc: string | null;
  slug: string;
  status?: 'Active' | 'Draft' | 'Inactive';
  _count: {
    collections: number;
    endpoints?: number;
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
        // limit: 5,
      });
      
      const projectsWithStatus = response.data.map((project: Project, index: number) => ({
        ...project,
        status: index === 0 ? 'Active' : index === 1 ? 'Active' : 'Draft',
        _count: {
          ...project._count,
          endpoints: Math.floor(Math.random() * 20) + 5 
        }
      }));
      
      setProjects(projectsWithStatus);
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
      <div className="flex flex-row flex-wrap justify-start items-start gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full h-[140px] bg-slate-900/60 rounded-xl p-5 animate-pulse flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-700 rounded-xl flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="w-32 h-5 bg-slate-700 rounded"></div>
              <div className="w-48 h-4 bg-slate-700 rounded"></div>
              <div className="flex gap-4 text-sm">
                <div className="w-20 h-4 bg-slate-700 rounded"></div>
                <div className="w-24 h-4 bg-slate-700 rounded"></div>
              </div>
            </div>
            <div className="flex flex-col justify-between h-full py-1">
              <div className="w-16 h-6 bg-slate-700 rounded-full"></div>
              <div className="w-5 h-5 bg-slate-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="w-[350px] h-[140px] bg-slate-900/60 rounded-xl p-5 text-center flex flex-col justify-center items-center">
        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4">
          <span className="text-2xl">📁</span>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
        <p className="text-slate-400 text-sm">Create your first project to get started</p>
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
          status={project.status}
          endpointsCount={project._count.endpoints}
        />
      ))}
    </div>
  );
}