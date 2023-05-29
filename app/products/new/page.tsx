'use client';
import ProductForm from '@/app/components/ProductForm';

export default function NewProduct() {
    return <ProductForm />;
}

export interface ProductData {
    title: string;
    description: string;
    price: string;
}
