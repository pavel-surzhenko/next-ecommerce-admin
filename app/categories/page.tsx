'use client';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from '../components/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Categories = () => {
    const [editedCategory, setEditedCategory] = useState<ICategory | null>(
        null
    );
    const [name, setName] = useState<string>('');
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isFetch, setIsFetch] = useState<boolean>(false);
    const [parentCategory, setParentCategory] = useState<string>('');

    function fetchCategories() {
        axios
            .get<ICategory[]>('/api/categories')
            .then((result: AxiosResponse<ICategory[]>) => {
                setCategories(result.data);
                setIsFetch(true);
            });
    }

    async function saveCategory(ev: React.FormEvent): Promise<void> {
        ev.preventDefault();

        const data = { name, parentCategory };
        if (editedCategory) {
            await axios.put('/api/categories', {
                ...data,
                _id: editedCategory._id,
            });
            setEditedCategory(null);
        } else {
            await axios.post('/api/categories', data);
        }

        setName('');
        fetchCategories();
    }

    function editCategory(category: ICategory) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
    }

    const MySwal = withReactContent(Swal);

    function deleteCategory(category: ICategory) {
        MySwal.fire({
            title: `Are you sure?`,
            text: `Do you want to delete ${category.name}`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, delete',
            reverseButtons: true,
            confirmButtonColor: '#d55',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete('/api/categories?_id=' + category._id);
                fetchCategories();
            }
        });
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <h1>Categories</h1>
            <label>
                {editedCategory
                    ? `Edit category ${editedCategory.name}`
                    : 'New category name'}
            </label>
            <form
                onSubmit={saveCategory}
                className=''
            >
                <div className='flex gap-1 mb-2'>
                    <input
                        type='text'
                        placeholder='Category name'
                        className='mb-0 w-auto'
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                    />
                    <select
                        className='mb-0 w-auto'
                        value={parentCategory}
                        onChange={(ev) => setParentCategory(ev.target.value)}
                    >
                        <option value=''>No parent category</option>
                        {categories?.length > 0 &&
                            categories.map((category) => (
                                <option
                                    value={category._id}
                                    key={category._id}
                                >
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className='flex gap-1'>
                    {editedCategory && (
                        <button
                            type='button'
                            onClick={() => {
                                setEditedCategory(null);
                                setName('');
                                setParentCategory('');
                            }}
                            className='btn-default'
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type='submit'
                        className='btn-primary py-1'
                    >
                        Save
                    </button>
                </div>
            </form>
            {!isFetch && (
                <div className='h-24 flex items-center justify-center'>
                    <Spinner />
                </div>
            )}
            {isFetch && !editedCategory && (
                <table className='basic mt-4'>
                    <thead>
                        <tr>
                            <td>Category name</td>
                            <td>Parent category</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.length > 0 &&
                            categories.map((category) => (
                                <tr key={category._id}>
                                    <td>{category.name}</td>
                                    <td>{category?.parent?.name}</td>
                                    <td className='flex'>
                                        <button
                                            onClick={() =>
                                                editCategory(category)
                                            }
                                            className='btn-primary mr-1 flex items-center gap-1'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='currentColor'
                                                className='w-4 h-4'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                                />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            className='btn-primary flex items-center gap-1'
                                            onClick={() =>
                                                deleteCategory(category)
                                            }
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='currentColor'
                                                className='w-4 h-4'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                                />
                                            </svg>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </>
    );
};
export default Categories;

type CategoryChild = {
    _id: string;
    name: string;
    __v: number;
};

export interface ICategory extends CategoryChild {
    parent: CategoryChild;
}
