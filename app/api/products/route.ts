import { ProductData } from "@/app/products/new/page"
import mongooseConnect from "@/lib/mongoose"
import { Product } from "@/models/Product"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    await mongooseConnect()
    const body = await request.json()
    const { title, description, price }: ProductData = body

    const productDoc = await Product.create({
        title, description, price
    })

    return NextResponse.json(productDoc)
}

export async function GET() {
    const products: ProductData[] = await Product.find()

    return NextResponse.json(products)
}