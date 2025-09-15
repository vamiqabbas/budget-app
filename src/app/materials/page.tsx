"use client";
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MaterialCard } from '@/components/ui/MaterialCard'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'

interface Material {
  id: number
  name: string
  category: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  totalValue: number
  status: 'in-stock' | 'out-of-stock' | 'low-stock'
}

function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<Material>>({})
  const [editId, setEditId] = useState<number | null>(null)

  const fetchMaterials = async () => {
    setLoading(true)
    const res = await fetch('/api/materials')
  }

  useEffect(() => {
    fetchMaterials();
  }, []);


  const handleDelete = async (id: number) => {
    await fetch('/api/materials', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchMaterials()
  }

  const handleEdit = (material: Material) => {
    setFormData(material)
    setEditId(material.id)
    setDialogOpen(true)
  }

  const handleAdd = () => {
    setFormData({})
    setEditId(null)
    setDialogOpen(true)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'unitPrice' || name === 'quantity' ? Number(value) : value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...formData,
      totalValue: (formData.quantity || 0) * (formData.unitPrice || 0)
    }
    if (editId) {
      await fetch('/api/materials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, id: editId })
      })
    } else {
      await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    }
    setDialogOpen(false)
    setFormData({})
    setEditId(null)
    fetchMaterials()
  }

  // Filtered materials logic
  const filteredMaterials = materials.filter(
    (mat) =>
      (selectedCategory === 'All Categories' || mat.category === selectedCategory) &&
      (mat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mat.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // ...existing code...
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Materials Inventory</h1>
          <p className="text-gray-400">Manage your building materials stock and pricing</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Material
        </Button>
      </div>

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" asChild>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          </Dialog.Overlay>
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 shadow-lg focus:outline-none">
            <Dialog.Title className="text-xl font-bold mb-4">{editId ? 'Edit Material' : 'Add Material'}</Dialog.Title>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  name="name"
                  value={formData.name || ''}
                  onChange={handleFormChange}
                  placeholder="Material Name"
                  required
                />
                <Input
                  name="category"
                  value={formData.category || ''}
                  onChange={handleFormChange}
                  placeholder="Category"
                  required
                />
                <Input
                  name="quantity"
                  type="number"
                  value={formData.quantity || ''}
                  onChange={handleFormChange}
                  placeholder="Quantity"
                  required
                />
                <Input
                  name="unit"
                  value={formData.unit || ''}
                  onChange={handleFormChange}
                  placeholder="Unit (e.g. bags, pieces)"
                  required
                />
                <Input
                  name="unitPrice"
                  type="number"
                  step="0.01"
                  value={formData.unitPrice || ''}
                  onChange={handleFormChange}
                  placeholder="Unit Price"
                  required
                />
                <Select
                  name="status"
                  value={formData.status || 'in-stock'}
                  onChange={handleFormChange}
                  required
                >
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                  <option value="low-stock">Low Stock</option>
                </Select>
              </div>
              <Textarea
                name="description"
                value={formData.description || ''}
                onChange={handleFormChange}
                placeholder="Description"
                required
              />
              <div className="flex gap-2 justify-end">
                <Dialog.Close asChild>
                  <Button type="button" variant="secondary">Cancel</Button>
                </Dialog.Close>
                <Button type="submit">{editId ? 'Update' : 'Add'} Material</Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-4 w-full"
          />
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-field w-full sm:w-48"
        >
          <option>All Categories</option>
          <option>Cement</option>
          <option>Masonry</option>
          <option>Aggregates</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading materials...</div>
      ) : (
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredMaterials.map((material) => (
              <MaterialCard
                key={material.id}
                name={material.name}
                description={material.description}
                status={material.status}
                category={material.category}
                quantity={material.quantity}
                unit={material.unit}
                unitPrice={material.unitPrice}
                totalValue={material.totalValue}
                onEdit={() => handleEdit(material)}
                onDelete={() => handleDelete(material.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default MaterialsPage;