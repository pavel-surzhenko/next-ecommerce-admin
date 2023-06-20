'use client';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from 'react';
import { ProductData } from '../products/new/page';
import { GetProductData } from '../products/page';
import Image from 'next/legacy/image';
import Spinner from './Spinner';
import { ICategory } from '../categories/page';

export default function ProductForm({
    _id,
    title: existingTitle,
    images: existingImages,
    description: existingDescription,
    price: existingPrice,
    category: existingCategory,
}: Partial<GetProductData>) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const [images, setImages] = useState(existingImages || []);
    const [uploading, setUploading] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [category, setCategory] = useState(existingCategory || '');

    useEffect(() => {
        axios.get('/api/categories').then((result) => {
            setCategories(result.data);
        });
    }, []);

    async function saveProduct(ev: React.FormEvent) {
        ev.preventDefault();
        const data: ProductData = {
            title,
            images,
            description,
            price,
            category,
        };

        if (_id) {
            await axios.put<GetProductData>('/api/products', { ...data, _id });
        } else {
            await axios.post<ProductData>('/api/products', data);
        }

        setGoToProducts(true);
    }

    if (goToProducts) {
        return redirect('/products');
    }

    async function uploadImages(ev: ChangeEvent<HTMLInputElement>) {
        const files = Array.from(ev.target.files!);
        if (files.length > 0) {
            setUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages([...images, res.data.link]);
            setUploading(false);
        }
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input
                type='text'
                placeholder='product name'
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            <label>Category</label>
            <select
                value={category}
                onChange={(ev) => setCategory(ev.target.value)}
            >
                <option value=''>Uncategorized</option>
                {categories.length > 0 &&
                    categories.map((category) => (
                        <option
                            key={category._id}
                            value={category._id}
                        >
                            {category.name}
                        </option>
                    ))}
            </select>
            <label>Photos</label>
            <div className='mb-2 flex flex-wrap gap-1'>
                {!!images?.length &&
                    images.map((link) => (
                        <div
                            key={link}
                            className='h-24'
                        >
                            <Image
                                width={96}
                                height={96}
                                src={link}
                                alt='image'
                                className='rounded-lg'
                            />
                        </div>
                    ))}
                {uploading && (
                    <div className='h-24 flex items-center'>
                        <Spinner />
                    </div>
                )}
                <label className='w-24 h-24 cursor-pointer text-center flex text-sm gap-1 text-gray-500 rounded-lg items-center bg-gray-200 justify-center'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
                        />
                    </svg>
                    <div>Upload</div>
                    <input
                        type='file'
                        className='hidden'
                        onChange={uploadImages}
                    />
                </label>
            </div>
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
