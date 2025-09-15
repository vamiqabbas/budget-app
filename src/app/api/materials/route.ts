import { NextResponse } from 'next/server'

let materials = [
  {
    id: 1,
    name: 'Portland Cement',
    category: 'Cement',
    description: 'Type I Portland cement for general construction',
    quantity: 45,
    unit: 'bags',
    unitPrice: 8.50,
    totalValue: 382.50,
    status: 'in-stock'
  },
  // Add more initial materials as needed
]

export async function GET() {
  return NextResponse.json(materials)
}


export async function POST(request: Request) {
  const data = await request.json()
  const newMaterial = { ...data, id: materials.length + 1 }
  materials.push(newMaterial)
  return NextResponse.json(newMaterial, { status: 201 })
}

export async function PUT(request: Request) {
  const data = await request.json()
  const idx = materials.findIndex(m => m.id === data.id)
  if (idx === -1) {
    return NextResponse.json({ error: 'Material not found' }, { status: 404 })
  }
  materials[idx] = { ...materials[idx], ...data }
  return NextResponse.json(materials[idx])
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  const idx = materials.findIndex(m => m.id === id)
  if (idx === -1) {
    return NextResponse.json({ error: 'Material not found' }, { status: 404 })
  }
  const deleted = materials.splice(idx, 1)
  return NextResponse.json(deleted[0])
}
