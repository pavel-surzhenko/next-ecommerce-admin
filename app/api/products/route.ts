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

export async function GET(request: Request) {
    await mongooseConnect()
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const product: ProductData | null = await Product.findById(id)!
        return NextResponse.json(product)
    } else {
        const products: ProductData[] = await Product.find().maxTimeMS(20000)

        return NextResponse.json(products)
    }

}