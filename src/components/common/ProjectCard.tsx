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
  status?: 'Active' | 'Draft' | 'Inactive';
  endpointsCount?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  slug,
  name,
  desc,
  collectionsCount,
  status = 'Active',
  endpointsCount = 0,
}) => {
  const router = useRouter();
  
  function handleClick() {
    router.push(`/project/${slug}`);
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Active':
        return `${baseClasses} bg-blue-600 text-white`;
      case 'Draft':
        return `${baseClasses} bg-yellow-500/20 text-yellow-400 border border-yellow-500/30`;
      case 'Inactive':
        return `${baseClasses} bg-slate-500/20 text-slate-400`;
      default:
        return `${baseClasses} bg-blue-600 text-white`;
    }
  };

  const getProjectIcon = (name: string) => {
    if (name.toLowerCase().includes('ecommerce') || name.toLowerCase().includes('commerce')) {
      return '🛒';
    } else if (name.toLowerCase().includes('user') || name.toLowerCase().includes('auth')) {
      return '👥';
    } else if (name.toLowerCase().includes('content') || name.toLowerCase().includes('blog')) {
      return '📝';
    }
    return '🔧';
  };

  return (
    <div className="flex items-start justify-between p-5 bg-slate-900/60 backdrop-blur-lg rounded-xl border border-slate-800 w-full h-[140px] gap-3 shadow-md hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 group">
      {/* Left side - Icon and Project Info */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
            <span className="text-lg">{getProjectIcon(name)}</span>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
              {name}
            </h3>
          </div>
          <p className="text-slate-400 text-sm line-clamp-2 mb-3">
            {desc}
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Layers size={14} />
              <span>{collectionsCount} collections</span>
            </div>
            <div className="flex items-center gap-1">
              <span>•</span>
              <span>{endpointsCount} endpoints</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Status and Actions */}
      <div className="flex flex-col justify-between items-end h-full">
        <div className="flex items-center gap-2">
          <span className={getStatusBadge(status)}>
            {status}
          </span>
          <Ellipsis 
            size={18} 
            className="cursor-pointer hover:text-white transition text-slate-400" 
          />
        </div>
        <SquareArrowOutUpRight
          size={18}
          className="cursor-pointer hover:text-blue-400 transition text-slate-400"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default ProjectCard;