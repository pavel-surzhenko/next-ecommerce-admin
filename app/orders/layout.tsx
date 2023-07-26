import Nav from '../components/Nav';

const OrdersLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Nav />
            <div className='flex-grow p-4'>{children}</div>
        </>
    );
};
export default OrdersLayout;
