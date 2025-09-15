'use client'

import { useState } from 'react'
import { Moon, Sun, Menu, Bell } from 'lucide-react'

export default function Header() {
  const [isDark, setIsDark] = useState(true)

  return (
    <header 
      className="h-16 flex items-center justify-between px-6"
      style={{ backgroundColor: '#2a2a2a', borderBottom: '1px solid #3a3a3a' }}
    >
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 rounded-lg"
          style={{ backgroundColor: 'transparent' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Menu className="w-5 h-5" style={{ color: '#9ca3af' }} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button 
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'transparent' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Bell className="w-5 h-5" style={{ color: '#9ca3af' }} />
        </button>
        
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'transparent' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          {isDark ? (
            <Moon className="w-5 h-5" style={{ color: '#9ca3af' }} />
          ) : (
            <Sun className="w-5 h-5" style={{ color: '#9ca3af' }} />
          )}
        </button>
      </div>
    </header>
  )
}