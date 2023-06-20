import Nav from '../components/Nav';

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Nav />
            <div className='bg-white flex-grow mt-2 mr-2 rounded-lg mb-2 p-4'>
                {children}
            </div>
        </>
    );
};
export default ProductsLayout;
