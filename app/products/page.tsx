import Link from 'next/link';
import Nav from '../components/Nav';

const Products = () => {
    return (
        <Link
            className='bg-blue-900 text-white rounded-md py-1 px-2'
            href={'/products/new'}
        >
            Add new product
        </Link>
    );
};
export default Products;
