'use client'

import { BarChart3, Package, AlertTriangle, TrendingUp } from 'lucide-react'
import StatsCard from '../components/StatsCard'
import RecentActivities from '../components/RecentActivities'

export default function Dashboard() {
  const stats: {
    title: string
    value: string
    subtitle: string
    icon: typeof Package
    color: "blue" | "green" | "yellow" | "purple"
  }[] = [
    {
      title: 'Total Materials',
      value: '156',
      subtitle: 'Items in inventory',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Active Projects',
      value: '8',
      subtitle: 'Ongoing projects',
      icon: BarChart3,
      color: 'green'
    },
    {
      title: 'Low Stock Alerts',
      value: '12',
      subtitle: 'Items need restocking',
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      title: 'Total Inventory Value',
      value: '$45,800.00',
      subtitle: 'Current stock value',
      icon: TrendingUp,
      color: 'purple'
    }
  ]

  const activities = [
    {
      action: 'Added 50 bags of Portland Cement to inventory',
      time: '2 hours ago',
      type: 'add'
    },
    {
      action: 'New project "Residential House A" created',
      time: '4 hours ago',
      type: 'project'
    },
    {
      action: 'Steel rebar stock running low (5 pieces remaining)',
      time: '6 hours ago',
      type: 'alert'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">BuildStock Dashboard</h1>
        <p className="text-gray-400">Monitor your building materials inventory and project progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <RecentActivities activities={activities} />
    </div>
  )
}