import Link from 'next/link';
import Nav from '../components/Nav';

const Products = () => {
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
