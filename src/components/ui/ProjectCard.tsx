import * as React from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  name: string;
  description: string;
  status: string;
  materials: number;
  estimatedBudget: number;
  onEdit: () => void;
  onDelete: () => void;
  onBudget: () => void;
}

const statusColors: Record<string, string> = {
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  planned: "bg-yellow-100 text-yellow-700",
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  status,
  materials,
  estimatedBudget,
  onEdit,
  onDelete,
  onBudget,
}) => (
  <motion.div
    className="rounded-xl shadow-lg bg-white/70 backdrop-blur-md p-6 flex flex-col gap-4 border border-gray-200 hover:shadow-2xl transition-shadow"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    layout
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-semibold",
          statusColors[status] || "bg-gray-100 text-gray-700"
        )}>{status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="icon" onClick={onEdit} title="Edit">
          <Edit className="w-5 h-5" />
        </Button>
        <Button variant="destructive" size="icon" onClick={onDelete} title="Delete">
          <Trash2 className="w-5 h-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={onBudget} title="Budget">
          <Calculator className="w-5 h-5" />
        </Button>
      </div>
    </div>
    <p className="text-gray-600 mb-2">{description}</p>
    <div className="flex gap-6 text-sm">
      <div>
        <span className="block text-gray-400">Materials</span>
        <span className="font-semibold text-gray-800">{materials}</span>
      </div>
      <div>
        <span className="block text-gray-400">Est. Budget</span>
        <span className="font-semibold text-gray-800">${estimatedBudget.toLocaleString()}</span>
      </div>
    </div>
  </motion.div>
);
