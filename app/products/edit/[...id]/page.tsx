'use client';
import ProductForm from '@/app/components/ProductForm';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductData } from '../../new/page';

export default function EditProductPage({
    params,
}: {
    params: { id: string[] };
}) {
    const id = params.id.join('');
    const [productInfo, setProductInfo] = useState<ProductData>();

    useEffect(() => {
        axios.get('/api/products?id=' + id).then((response) => {
            setProductInfo(response.data);
        });
    }, [id]);
    console.log('data:', productInfo);

    return <>{productInfo && <ProductForm {...productInfo} />}</>;
}
