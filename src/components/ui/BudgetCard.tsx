import * as React from "react";
import { motion } from "framer-motion";
import { Edit } from "lucide-react";

interface BudgetCardProps {
  totalBudget: number;
  spent: number;
  remaining: number;
  onEdit: () => void;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({
  totalBudget,
  spent,
  remaining,
  onEdit,
}) => (
  <motion.div
    className="rounded-xl shadow-lg bg-white p-6 flex flex-col gap-4 border border-gray-200 hover:shadow-2xl transition-shadow"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    layout
  >
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-gray-900 mb-1">Project Budget</h3>
      <button
        className="rounded-full p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
        onClick={onEdit}
        title="Edit Budget"
      >
        <Edit className="w-5 h-5" />
      </button>
    </div>
    <div className="flex gap-6 text-sm">
      <div>
        <span className="block text-gray-400">Total Budget</span>
        <span className="font-semibold text-gray-800">${totalBudget.toFixed(2)}</span>
      </div>
      <div>
        <span className="block text-gray-400">Spent</span>
        <span className="font-semibold text-gray-800">${spent.toFixed(2)}</span>
      </div>
      <div>
        <span className="block text-gray-400">Remaining</span>
        <span className="font-semibold text-gray-800">${remaining.toFixed(2)}</span>
      </div>
    </div>
  </motion.div>
);
