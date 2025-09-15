"use client";
import { Input } from '@/components/ui/input'

import { useState, useEffect } from 'react'
import { BudgetCard } from '@/components/ui/BudgetCard'
import { Button } from '@/components/ui/button'
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'

interface BudgetItem {
  id: number
  name: string
  category: string
  available: number
  required: number
  allocated: number
  unitPrice: number
  totalCost: number
  status: 'sufficient' | 'insufficient'
}

export default function BudgetPage() {
  const [projectName, setProjectName] = useState('Residential House A')
  const [budget, setBudget] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<any>({})
  const [dialogOpen, setDialogOpen] = useState(false)

  const fetchBudget = async () => {
    setLoading(true)
    const res = await fetch('/api/budget')
    const data = await res.json()
    setBudget(data)
    setFormData(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchBudget()
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: Number(value) }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/budget', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    setDialogOpen(false)
    fetchBudget()
  }

  const handleReset = async () => {
    await fetch('/api/budget', { method: 'DELETE' })
    fetchBudget()
  }

  if (loading || !budget) {
    return <div className="text-center text-gray-400">Loading budget...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Budget Estimation for {projectName}</h1>
          <p className="text-gray-400">Allocate materials and calculate project costs</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          Edit Budget
        </Button>
      </div>

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" asChild>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          </Dialog.Overlay>
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 shadow-lg focus:outline-none">
            <Dialog.Title className="text-xl font-bold mb-4">Edit Budget</Dialog.Title>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  name="materialsCost"
                  type="number"
                  value={formData.materialsCost || 0}
                  onChange={handleFormChange}
                  placeholder="Materials Cost"
                  required
                />
                <Input
                  name="estimatedLabor"
                  type="number"
                  value={formData.estimatedLabor || 0}
                  onChange={handleFormChange}
                  placeholder="Estimated Labor"
                  required
                />
                <Input
                  name="contingency"
                  type="number"
                  value={formData.contingency || 0}
                  onChange={handleFormChange}
                  placeholder="Contingency"
                  required
                />
                <Input
                  name="totalBudget"
                  type="number"
                  value={formData.totalBudget || 0}
                  onChange={handleFormChange}
                  placeholder="Total Budget"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Dialog.Close asChild>
                  <Button type="button" variant="secondary">Cancel</Button>
                </Dialog.Close>
                <Button type="submit">Update Budget</Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BudgetCard
          totalBudget={budget.totalBudget}
          spent={budget.materialsCost + budget.estimatedLabor + budget.contingency}
          remaining={budget.totalBudget - (budget.materialsCost + budget.estimatedLabor + budget.contingency)}
          onEdit={() => setDialogOpen(true)}
        />
        <div className="rounded-xl shadow-lg bg-white p-6 flex flex-col gap-2 border border-gray-200">
          <span className="text-gray-400 text-sm">Materials Cost</span>
          <span className="text-2xl font-bold text-gray-900">${budget.materialsCost?.toFixed(2)}</span>
        </div>
        <div className="rounded-xl shadow-lg bg-white p-6 flex flex-col gap-2 border border-gray-200">
          <span className="text-gray-400 text-sm">Estimated Labor (30%)</span>
          <span className="text-2xl font-bold text-gray-900">${budget.estimatedLabor?.toFixed(2)}</span>
        </div>
        <div className="rounded-xl shadow-lg bg-white p-6 flex flex-col gap-2 border border-gray-200">
          <span className="text-gray-400 text-sm">Contingency (10%)</span>
          <span className="text-2xl font-bold text-gray-900">${budget.contingency?.toFixed(2)}</span>
        </div>
      </motion.div>

      <div className="rounded-xl shadow-lg bg-white p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Budget Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Materials Cost:</span>
            <span className="text-gray-900 font-semibold">${budget.materialsCost?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Estimated Labor (30%):</span>
            <span className="text-gray-900 font-semibold">${budget.estimatedLabor?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Contingency (10%):</span>
            <span className="text-gray-900 font-semibold">${budget.contingency?.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between text-lg">
              <span className="text-gray-900 font-bold">Total Project Budget:</span>
              <span className="text-green-600 font-bold">${budget.totalBudget?.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button type="button" variant="secondary" onClick={handleReset}>Reset</Button>
        </div>
      </div>
    </div>
  )
}