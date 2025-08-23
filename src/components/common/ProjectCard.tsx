"use client";
import { Ellipsis, Link, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ProjectCardProps {
  id: number;
  name: string;
  desc: string;
  endpoints: number;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, desc, endpoints }) => {
   const router = useRouter();
  function handleClick() {
    console.log("hi from", id);
    router.push(`/project/${id}`);
  }
  return (
    <div className="flex items-start justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200 w-[347px] h-[140px] gap-2">
      <div className="flex flex-col justify-between items-start w-full h-full">
        <span className="text-sm font-medium text-black">{name}</span>
        <div className="text-gray-500">{desc}</div>
        <div className="flex gap-2 text-xs text-gray-400">
          <Link size={15} /> {endpoints} endpoints
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <Ellipsis size={20} className="cursor-pointer" />
        <SquareArrowOutUpRight
          size={20}
          className="cursor-pointer"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
export default ProjectCard;
