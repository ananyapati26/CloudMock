"use client";

export default function QuickActions() {
  const actions = [
    {
      id: 1,
      title: "New Project",
      description: "Create a new API project",
      icon: "➕",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      id: 2,
      title: "Import Collection",
      description: "Import from Postman/OpenAPI",
      icon: "📥",
      bgColor: "bg-green-500/10",
      iconColor: "text-green-400",
    },
    {
      id: 3,
      title: "Run Tests",
      description: "Test all endpoints",
      icon: "🧪",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-white">Quick Actions</h3>
      <div className="bg-slate-900/50 rounded-xl p-4 space-y-3">
        {actions.map((action) => (
          <button
            key={action.id}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors group"
          >
            <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center`}>
              <span className={`text-lg ${action.iconColor}`}>{action.icon}</span>
            </div>
            <div className="text-left">
              <div className="font-medium text-white group-hover:text-blue-300 transition-colors">
                {action.title}
              </div>
              <div className="text-sm text-slate-400">
                {action.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}