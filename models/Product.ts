import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    title: { typeof: String, required: true },
    description: String,
    price: { typeof: Number, required: true },
})

const Product = model('product', ProductSchema)