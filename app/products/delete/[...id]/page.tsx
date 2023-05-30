'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GetProductData } from '../../page';

export default function DeleteProductPage({
    params,
}: {
    params: { id: string[] };
}) {
    const router = useRouter();
    const id = params.id.join('');
    const [productInfo, setProductInfo] = useState<GetProductData>();

    function goBack() {
        router.push('/products');
    }
    async function deleteProduct() {
        await axios.delete('/api/products?id=' + id);
        goBack();
    }
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get<GetProductData>('/api/products?id=' + id).then((response) => {
            setProductInfo(response.data);
        });
    }, [id]);

    return (
        <>
            <h1 className='text-center'>
                Do you really want to delete &quot;{productInfo?.title}&quot;?
            </h1>
            <div className='flex gap-2 justify-center'>
                <button
                    className='btn-red'
                    onClick={deleteProduct}
                >
                    Yes
                </button>
                <button
                    className='btn-default'
                    onClick={goBack}
                >
                    No
                </button>
            </div>
        </>
    );
}
