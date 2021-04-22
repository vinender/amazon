import React,{useState, useEffect} from 'react';
import './Orders.css';
import {useStateValue} from './StateProvider.js';
import Order from './Order.js';
import {db} from './firebase';
 
const Orders = () => {

	const[orders, setOrders] = useState([]);

	const [{user, basket}] = useStateValue();

	 useEffect(() => {
    if(user) {
        db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    } else {
        setOrders([])
    }

  }, [user])

	 console.log('orders',orders);

	return (
		<div className='orders'>
            <h1>Your Orders</h1>

            <div className='order-container'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
	)
}

export default Orders;