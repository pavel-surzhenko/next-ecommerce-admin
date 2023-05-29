'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect } from 'react';

const Products = () => {
    useEffect(() => {
        axios
            .get('/api/products')
            .then((response) => console.log(response.data));
    });
    return (
        <Link
            className='btn-primary'
            href={'/products/new'}
        >
            Add new product
        </Link>
    );
};
export default Products;
