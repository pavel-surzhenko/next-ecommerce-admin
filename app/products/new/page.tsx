'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function NewProduct() {
    const [mounted, setMounted] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    async function saveProduct(ev: React.FormEvent) {
        ev.preventDefault();
        const data = {
            title,
            description,
            price,
        };

        await axios.post('/api/products', data);
    }

    useEffect(() => {
        setMounted(true);
    }, []);

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

export interface ProductData {
    title: string;
    description: string;
    price: string;
}
