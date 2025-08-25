"use client";
import { useEffect, useState } from "react";
import axios from "axios"; // 1. Import axios
// import { formatDistanceToNow } from "date-fns"; 

interface Activity {
  id: string;
  type: string;
  title: string;
  project: string;
//   time: string;
  status: string;
  method: string;
}

interface EndpointResponse {
  id: string;
  method: string;
  collection: {
    id: string;
    name: string;
  };
  createdAt: string; 
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Fetch data from the API inside useEffect
  useEffect(() => {
    const fetchRecentEndpoints = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await axios.post<EndpointResponse[]>(
          "/api/AllEndpoints",
          {
            userId: userId,
            limit: 5, 
          }
        );

        const transformedActivities = response.data.map((endpoint) => ({
          id: endpoint.id,
          type: "endpoint",
          title: "Endpoint Created",
          project: endpoint.collection.name, 
        //   time: formatDistanceToNow(new Date(endpoint.createdAt), {
        //     addSuffix: true,
        //   }),
          status: "success", 
          method: endpoint.method,
        }));

        setActivities(transformedActivities);
      } catch (err) {
        console.error("Failed to fetch recent activity:", err);
        setError("Could not load activity. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEndpoints();
  }, []);

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "text-sky-400";
      case "POST":
        return "text-green-400";
      case "PUT":
        return "text-orange-400";
      case "DELETE":
        return "text-red-400";
      case "PATCH":
        return "text-yellow-400";
      default:
        return "text-slate-400";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-400";
      case "draft":
        return "bg-yellow-400";
      case "updated":
        return "bg-orange-400";
      default:
        return "bg-slate-400";
    }
  };

  if (loading) {
    return (
      <div>
        <h3 className="text-xl font-bold mb-4 text-white">Recent Activity</h3>
        <div className="bg-slate-900/50 rounded-xl p-4">
          <div className="text-center text-slate-400 py-6">
            Loading activity...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h3 className="text-xl font-bold mb-4 text-white">Recent Activity</h3>
        <div className="bg-slate-900/50 rounded-xl p-4">
          <div className="text-center text-red-400 py-6">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-white">Recent Activity</h3>
      <div className="bg-slate-900/50 rounded-xl p-4">
        {activities.length === 0 ? (
          <div className="text-center text-slate-400 py-6">
            No recent activity
          </div>
        ) : (
          <div className="space-y-2">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full ${getStatusDot(
                    activity.status
                  )}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className={`font-mono text-xs font-bold w-12 text-center py-0.5 rounded ${getMethodColor(
                        activity.method
                      )} bg-slate-800`}
                    >
                      {activity.method}
                    </span>
                    <span className="font-medium text-sm text-slate-200 truncate">
                      {activity.title}
                    </span>
                  </div>
                  <div className="text-sm text-slate-400 pl-[64px] -mt-1">
                    In{" "}
                    <span className="font-medium text-slate-300">
                      {activity.project}
                    </span>{" "}
                    {/* • {activity.time} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
