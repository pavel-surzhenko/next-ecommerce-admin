import { ProductData } from "@/app/products/new/page"
import mongooseConnect from "@/lib/mongoose"
import { Product } from "@/models/Product"
import { NextApiRequest, NextApiResponse } from "next"

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    await mongooseConnect()
    if (method === 'POST') {
        const { title, description, price }: ProductData = req.body
        const productDoc = await Product.create({
            title, description, price
        })
        res.json(productDoc)
    }
}