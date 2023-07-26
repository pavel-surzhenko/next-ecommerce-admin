'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from '../components/Spinner';

const Orders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [isFetch, setIsFetch] = useState<boolean>(false);
    useEffect(() => {
        axios.get('/api/orders').then((response) => {
            setOrders(response.data);
            setIsFetch(true);
        });
    }, []);

    return (
        <>
            <h1>Order</h1>
            <table className='basic'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {!isFetch && (
                        <tr>
                            <td
                                className='text-center'
                                colSpan={3}
                            >
                                <div className='h-24 flex items-center justify-center'>
                                    <Spinner />
                                </div>
                            </td>
                        </tr>
                    )}
                    {isFetch &&
                        orders.length > 0 &&
                        orders.map((order) => (
                            <tr key={order._id}>
                                <td>
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>
                                <td>
                                    {order.name} {order.email} <br />
                                    {order.city} {order.postalCode} <br />
                                    {order.country} <br />
                                    {order.streetAddress}
                                </td>
                                <td>
                                    {order.line_items.map((i) => (
                                        <>
                                            {i.price_data.product_data.name} x
                                            {i.quantity} <br />
                                        </>
                                    ))}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};
export default Orders;

type ItemsType = {
    price_data: {
        currency: string;
        product_data: { name: string };
        unit_amount: number;
    };
    quantity: number;
};

interface IOrder {
    city: string;
    country: string;
    email: string;
    line_items: ItemsType[];
    name: string;
    paid: boolean;
    postalCode: string;
    streetAddress: string;
    __v: number;
    _id: string;
    createdAt: string;
}
