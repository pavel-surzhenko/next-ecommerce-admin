import mongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await mongooseConnect()

    return NextResponse.json(await Order.find().sort({ createdAt: -1 }))

}