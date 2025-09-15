'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BarChart3, 
  Package, 
  Building, 
  Calculator, 
  Settings,
  Database
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Materials', href: '/materials', icon: Package },
  { name: 'Projects', href: '/projects', icon: Building },
  { name: 'Budget Estimator', href: '/budget', icon: Calculator },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64" style={{ backgroundColor: '#2a2a2a', borderRight: '1px solid #3a3a3a' }}>
      <div className="flex items-center gap-3 p-6" style={{ borderBottom: '1px solid #3a3a3a' }}>
        <div style={{ width: '32px', height: '32px', backgroundColor: '#3b82f6', borderRadius: '8px' }} className="flex items-center justify-center">
          <Database className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">BuildStock</h1>
          <p className="text-sm" style={{ color: '#9ca3af' }}>Building Materials Management</p>
        </div>
      </div>

      <nav className="mt-6">
        <div className="px-6 text-xs font-semibold uppercase tracking-wider mb-3 text-gray-400">
          Navigation
        </div>
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 transition-colors cursor-pointer ${
                isActive 
                  ? 'text-white border-r-2' 
                  : 'text-gray-300 hover:text-white'
              }`}
              style={{
                backgroundColor: isActive ? '#2a2a2a' : 'transparent',
                borderRightColor: isActive ? '#3b82f6' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = '#2a2a2a'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-4 left-4 text-xs" style={{ color: '#6b7280' }}>
        Version 1.0.0
      </div>
    </div>
  )
}