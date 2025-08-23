import React from "react";
import { ReactNode } from "react";
interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}
const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="flex flex-col items-start p-5 bg-white rounded-xl shadow-sm border border-gray-200 w-[347px]">
      <div className="flex justify-between items-center w-full mb-3">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className="p-2 bg-gray-100 rounded-lg text-gray-500">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
};
export default StatCard;
