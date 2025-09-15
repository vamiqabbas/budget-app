
'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface Project {
  id: number
  name: string
  description: string
  status: 'in-progress' | 'completed' | 'planned'
  materials: number
  estimatedBudget: number
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<Project>>({})
  const [editId, setEditId] = useState<number | null>(null)

  const fetchProjects = async () => {
    setLoading(true)
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'All Status' || project.status === statusFilter.toLowerCase()?.replace(' ', '-'))
  )

  const getStatusBadge = (status: Project['status']) => {
    const statusMap = {
      'in-progress': 'status-badge status-in-progress',
      'completed': 'status-badge status-in-stock',
      'planned': 'status-badge status-warning'
    }
    const statusText = {
      'in-progress': 'In Progress',
      'completed': 'Completed',
      'planned': 'Planned'
    }
    return (
      <span className={statusMap[status]}>
        {statusText[status]}
      </span>
    )
  }

  const handleDelete = async (id: number) => {
    await fetch('/api/projects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchProjects()
  }

  const handleEdit = (project: Project) => {
    setFormData(project)
    setEditId(project.id)
    setShowForm(true)
  }

  const handleAdd = () => {
    setFormData({})
    setEditId(null)
    setShowForm(true)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'estimatedBudget' || name === 'materials' ? Number(value) : value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { ...formData }
    if (editId) {
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, id: editId })
      })
    } else {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    }
    setShowForm(false)
    setFormData({})
    setEditId(null)
    fetchProjects()
  }

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>Construction Projects</Typography>
          <Typography color="text.secondary">Plan and manage your building projects</Typography>
        </Box>
        <Button variant="contained" startIcon={<Plus />} onClick={handleAdd} sx={{ fontWeight: 600, boxShadow: 2 }}>
          New Project
        </Button>
      </Box>

      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Project' : 'Add Project'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, display: 'grid', gap: 2 }} onSubmit={handleFormSubmit}>
            <TextField name="name" label="Project Name" value={formData.name || ''} onChange={handleFormChange} required fullWidth />
            <TextField name="materials" label="Materials Count" type="number" value={formData.materials || ''} onChange={handleFormChange} required fullWidth />
            <TextField name="estimatedBudget" label="Estimated Budget" type="number" value={formData.estimatedBudget || ''} onChange={handleFormChange} required fullWidth />
            <TextField
              name="status"
              label="Status"
              select
              value={formData.status || 'in-progress'}
              onChange={handleFormChange}
              required
              fullWidth
            >
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="planned">Planned</MenuItem>
            </TextField>
            <TextField name="description" label="Description" value={formData.description || ''} onChange={handleFormChange} required multiline rows={3} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowForm(false)} color="secondary">Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained">{editId ? 'Update' : 'Add'} Project</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          type="text"
          label="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1 }}
        />
        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="All Status">All Status</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="planned">Planned</MenuItem>
        </TextField>
      </Box>

      {loading ? (
        <Typography align="center" color="text.secondary">Loading projects...</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {filteredProjects.map((project) => (
            <Box key={project.id} sx={{ flex: '1 1 300px', minWidth: 300, maxWidth: 400 }}>
              <Card elevation={4} sx={{ borderRadius: 3, background: 'rgba(255,255,255,0.95)', boxShadow: 6 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" fontWeight={700} color="primary.main">{project.name}</Typography>
                    <Typography variant="caption" sx={{ px: 1.5, py: 0.5, borderRadius: 2, bgcolor: project.status === 'in-progress' ? 'info.light' : project.status === 'completed' ? 'success.light' : 'warning.light', color: project.status === 'in-progress' ? 'info.dark' : project.status === 'completed' ? 'success.dark' : 'warning.dark', fontWeight: 600 }}>{project.status?.replace('-', ' ')?.replace(/\b\w/g, l => l.toUpperCase())}</Typography>
                  </Box>
                  <Typography color="text.secondary" fontWeight={500} gutterBottom>{project.materials} materials</Typography>
                  <Typography color="text.secondary" mb={1}>{project.description}</Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Est. Budget</Typography>
                      <Typography fontWeight={600}>${project.estimatedBudget.toLocaleString()}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button size="small" color="primary" variant="outlined" onClick={() => handleEdit(project)} sx={{ fontWeight: 600 }}>Edit</Button>
                    <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(project.id)} sx={{ fontWeight: 600 }}>Delete</Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ProjectsPage