"use client";

import { Ellipsis, Layers, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ProjectCardProps {
  id: string;
  name: string;
  desc: string;
  slug: string;
  collectionsCount: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  slug,
  name,
  desc,
  collectionsCount,
}) => {
  const router = useRouter();

  function handleClick() {
    router.push(`/project/${slug}`);
  }

  return (
    <div className="flex items-start justify-between p-5 bg-slate-900/60 backdrop-blur-lg rounded-xl border border-slate-800 w-[350px] h-[140px] gap-3 shadow-md hover:shadow-lg hover:border-blue-500/50 transition-all duration-300">
      <div className="flex flex-col justify-between items-start w-full h-full">
        <span className="text-lg font-semibold text-white">{name}</span>
        <div className="text-slate-400 text-sm line-clamp-2">{desc}</div>
        <div className="flex gap-2 text-slate-500 text-sm">
          <Layers size={16} /> {collectionsCount} collections
        </div>
      </div>
      <div className="flex flex-col justify-between h-full text-slate-400">
        <Ellipsis size={20} className="cursor-pointer hover:text-white transition" />
        <SquareArrowOutUpRight
          size={20}
          className="cursor-pointer hover:text-blue-400 transition"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
