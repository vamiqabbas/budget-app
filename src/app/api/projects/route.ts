import { NextResponse } from 'next/server'

let projects = [
  {
    id: 1,
    name: 'Residential House A',
    description: 'Two-story family home with 3 bedrooms and 2.5 bathrooms',
    status: 'in-progress',
    materials: 15,
    estimatedBudget: 125000.00
  }
  // Add more initial projects as needed
]

export async function GET() {
  return NextResponse.json(projects)
}


export async function POST(request: Request) {
  const data = await request.json()
  const newProject = { ...data, id: projects.length + 1 }
  projects.push(newProject)
  return NextResponse.json(newProject, { status: 201 })
}

export async function PUT(request: Request) {
  const data = await request.json()
  const idx = projects.findIndex(p => p.id === data.id)
  if (idx === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }
  projects[idx] = { ...projects[idx], ...data }
  return NextResponse.json(projects[idx])
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  const idx = projects.findIndex(p => p.id === id)
  if (idx === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }
  const deleted = projects.splice(idx, 1)
  return NextResponse.json(deleted[0])
}
