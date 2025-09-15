'use client'

import { useState } from 'react'
import { Settings as SettingsIcon, Moon, Database, Download, Upload, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const [isDark, setIsDark] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your application preferences and data</p>
      </div>

      {/* Appearance Settings */}
  <div className="card p-6 bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <SettingsIcon className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Appearance</h2>
        </div>
        <p className="text-gray-400 mb-6">Customize the look and feel of your application</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Theme</h3>
              <p className="text-gray-400 text-sm">Switch between light and dark themes</p>
            </div>
            <Button onClick={() => setIsDark(!isDark)} variant="secondary" className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              {isDark ? 'Dark' : 'Light'}
            </Button>
          </div>
        </div>
      </div>

      {/* Data Management */}
  <div className="card p-6 bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-semibold text-white">Data Management</h2>
        </div>
        <p className="text-gray-400 mb-6">Import, export, and backup your inventory data</p>

        <div className="space-y-4">
          <Button className="w-full flex items-center justify-center gap-2" variant="secondary">
            <Download className="w-4 h-4" />
            Export Data
          </Button>

          <Button className="w-full flex items-center justify-center gap-2" variant="secondary">
            <Upload className="w-4 h-4" />
            Import Data
          </Button>

          <Button className="w-full flex items-center justify-center gap-2">
            <Database className="w-4 h-4" />
            Create Backup
          </Button>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}