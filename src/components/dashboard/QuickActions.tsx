"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuickActions() {
  const router = useRouter();
  const [showNewProject, setShowNewProject] = useState(false);
  const [open, setOpen] = useState(false);


  const actions = [
    {
      id: 1,
      title: "New Project",
      description: "Create a new API project",
      icon: "➕",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
      onClick: () => setShowNewProject(true), 
    },
    {
      id: 2,
      title: "Import Collection",
      description: "Import from Postman/OpenAPI",
      icon: "📥",
      bgColor: "bg-green-500/10",
      iconColor: "text-green-400",
      onClick: () => alert("Import feature coming soon!"),
    },
    {
      id: 3,
      title: "Run Tests",
      description: "Test all endpoints",
      icon: "🧪",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
      onClick: () => router.push("/apitesting"),
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-white">Quick Actions</h3>
      <div className="bg-slate-900/50 rounded-xl p-4 space-y-3 mt-6">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors group cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center`}
            >
              <span className={`text-lg ${action.iconColor}`}>{action.icon}</span>
            </div>
            <div className="text-left">
              <div className="font-medium text-white group-hover:text-blue-300 transition-colors">
                {action.title}
              </div>
              <div className="text-sm text-slate-400">{action.description}</div>
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}
