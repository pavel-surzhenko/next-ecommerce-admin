import axios from 'axios';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ProductData } from '../products/new/page';

export default function ProductForm({
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
}: Partial<ProductData>) {
    const [mounted, setMounted] = useState(false);
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    console.log(title);

    async function saveProduct(ev: React.FormEvent) {
        ev.preventDefault();
        const data: ProductData = {
            title,
            description,
            price,
        };

        await axios.post<ProductData>('/api/products', data);
        setGoToProducts(true);
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (goToProducts) {
        return redirect('/products');
    }

    if (!mounted) return <></>;

    return (
        <form onSubmit={saveProduct}>
            <h1>New Product</h1>
            <label>Product name</label>
            <input
                type='text'
                placeholder='product name'
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            <label>Description</label>
            <textarea
                placeholder='description'
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
            ></textarea>
            <label>Price</label>
            <input
                type='number'
                placeholder='price'
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
            />
            <button
                type='submit'
                className='btn-primary'
            >
                Save
            </button>
        </form>
    );
}
