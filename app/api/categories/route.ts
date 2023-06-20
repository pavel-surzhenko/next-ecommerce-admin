import mongooseConnect from "@/lib/mongoose"
import { Category } from "@/models/Category"
import { NextResponse } from "next/server"

export async function POST(request: Request): Promise<NextResponse> {
    await mongooseConnect()

    const body: { name: string } = await request.json()

    const { name } = body
    const categoryDoc = await Category.create({ name })

    return NextResponse.json(categoryDoc)
}

export async function GET(request: Request): Promise<NextResponse> {
    await mongooseConnect()

    return NextResponse.json(await Category.find())
}