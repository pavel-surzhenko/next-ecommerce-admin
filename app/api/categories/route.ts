import mongooseConnect from "@/lib/mongoose"
import { Category } from "@/models/Category"
import { NextResponse } from "next/server"

export async function POST(request: Request): Promise<NextResponse> {
    await mongooseConnect()

    const body: { name: string, parentCategory: string } = await request.json()

    const { name, parentCategory } = body
    const categoryDoc = await Category.create({ name, parent: parentCategory || undefined })

    return NextResponse.json(categoryDoc)
}

export async function GET(request: Request): Promise<NextResponse> {
    await mongooseConnect()

    return NextResponse.json(await Category.find().populate('parent'))
}

export async function PUT(request: Request): Promise<NextResponse> {
    await mongooseConnect()

    const body: { name: string, parentCategory: string, _id: string } = await request.json()

    const { name, parentCategory, _id } = body
    const categoryDoc = await Category.updateOne({ _id }, { name, parent: parentCategory })

    return NextResponse.json(await Category.find().populate('parent'))
}

export async function DELETE(request: Request) {
    await mongooseConnect()

    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('_id');
    if (_id) {
        await Category.deleteOne({ _id })
        return NextResponse.json(true)
    }

}