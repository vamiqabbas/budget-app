import * as React from "react";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import clsx from "clsx";

interface MaterialCardProps {
  name: string;
  description: string;
  status: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
  onEdit: () => void;
  onDelete: () => void;
}

const statusColors: Record<string, string> = {
  "in-stock": "bg-green-100 text-green-700",
  "out-of-stock": "bg-red-100 text-red-700",
  "low-stock": "bg-yellow-100 text-yellow-700",
};

export const MaterialCard: React.FC<MaterialCardProps> = ({
  name,
  description,
  status,
  category,
  quantity,
  unit,
  unitPrice,
  totalValue,
  onEdit,
  onDelete,
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
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <span className={clsx(
          "px-3 py-1 rounded-full text-xs font-semibold",
          statusColors[status] || "bg-gray-100 text-gray-700"
        )}>{status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</span>
      </div>
      <div className="flex gap-2">
        <button
          className="rounded-full p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
          onClick={onEdit}
          title="Edit"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          className="rounded-full p-2 bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
          onClick={onDelete}
          title="Delete"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
    <p className="text-gray-600 mb-2">{description}</p>
    <div className="flex gap-6 text-sm">
      <div>
        <span className="block text-gray-400">Category</span>
        <span className="font-semibold text-gray-800">{category}</span>
      </div>
      <div>
        <span className="block text-gray-400">Quantity</span>
        <span className="font-semibold text-gray-800">{quantity} {unit}</span>
      </div>
      <div>
        <span className="block text-gray-400">Unit Price</span>
        <span className="font-semibold text-gray-800">${unitPrice.toFixed(2)}</span>
      </div>
      <div>
        <span className="block text-gray-400">Total Value</span>
        <span className="font-semibold text-gray-800">${totalValue.toFixed(2)}</span>
      </div>
    </div>
  </motion.div>
);
