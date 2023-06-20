'use client';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';

const Categories = () => {
    const [name, setName] = useState<string>('');
    const [categories, setCategories] = useState<categoryData[]>([]);
    const [isFetch, setIsFetch] = useState<boolean>(false);

    useEffect(() => {
        axios
            .get<categoryData[]>('/api/categories')
            .then((result: AxiosResponse<categoryData[]>) => {
                setCategories(result.data);
                setIsFetch(true);
            });
    }, []);

    async function saveCategory(ev: React.FormEvent): Promise<void> {
        ev.preventDefault();

        await axios.post<string>('/api/categories', { name });
        setName('');
    }
    return (
        <>
            <h1>Categories</h1>
            <label>New category name</label>
            <form
                onSubmit={saveCategory}
                className='flex gap-1'
            >
                <input
                    type='text'
                    placeholder='Category name'
                    className='mb-0'
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                />
                <button
                    type='submit'
                    className='btn-primary py-1'
                >
                    Save
                </button>
            </form>
            <table className='basic mt-4'>
                <thead>
                    <tr>
                        <td>Category name</td>
                    </tr>
                </thead>
                <tbody>
                    {!isFetch && (
                        <div className='h-24 flex items-center justify-center'>
                            <Spinner />
                        </div>
                    )}
                    {categories?.length > 0 &&
                        categories.map((category) => (
                            <tr key={category._id}>
                                <td>{category.name}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};
export default Categories;

type categoryData = {
    _id: string;
    name: string;
    __v: number;
};
