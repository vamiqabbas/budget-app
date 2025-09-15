import { NextResponse } from 'next/server'

let budget = {
  totalBudget: 150000,
  materialsCost: 80000,
  estimatedLabor: 24000,
  contingency: 8000
}

export async function GET() {
  return NextResponse.json(budget)
}


export async function POST(request: Request) {
  const data = await request.json()
  budget = { ...budget, ...data }
  return NextResponse.json(budget)
}

export async function PUT(request: Request) {
  const data = await request.json()
  budget = { ...budget, ...data }
  return NextResponse.json(budget)
}

export async function DELETE() {
  budget = {
    totalBudget: 0,
    materialsCost: 0,
    estimatedLabor: 0,
    contingency: 0
  }
  return NextResponse.json({ message: 'Budget reset' })
}
