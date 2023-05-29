import { ProductData } from "@/app/products/new/page"
import mongooseConnect from "@/lib/mongoose"
import { Product } from "@/models/Product"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const { method } = request

    await mongooseConnect()
    if (method === 'POST') {
        const body = await request.json()
        const { title, description, price }: ProductData = body

        const productDoc = await Product.create({
            title, description, price
        })

        return NextResponse.json(productDoc)
    }
}