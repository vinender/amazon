import React, {useState, useEffect} from 'react';
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct.js';
import './Payment.css';
import { Link, useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from './reducer';
import { CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from './axios';
import {db} from './firebase';


const Payment = () => {

	const [{basket, user}, dispatch] = useStateValue();
	const history = useHistory();

	const [disabled, setDisabled] = useState(true);
	const [error, setError] = useState(null);
	const[processing, setProcessing] = useState('');
	const[succeeded, setSucceeded] = useState(false);
	const[clientSecret, setclientSecret] = useState(true);

	useEffect(() => {
		const getClientSecret = async () =>{
			const response = await axios({
				method: 'post',
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`
			});
			setclientSecret(response.data.clientSecret)
		}
		getClientSecret();
	}, [basket])

	console.log('client secret', clientSecret);
	console.log('user is', user);

	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);

		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement)
			}
		}).then( ({paymentIntent}) => {
			// console.log(paymentIntent.status);

			db
			.collection('users')
			.doc(user?.uid)
			.collection('orders')
			.doc(paymentIntent.id)
			.set({
				basket: basket,
				amount: paymentIntent.amount,
				created: paymentIntent.created

			})




			setSucceeded(true);
			setError(null);
			setProcessing(false);

			dispatch({
				type: 'EMPTY-BASKET'
			})

			history.replace('/orders')
		})

	}

	const handleChange = (e) => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : '');
	}

	return (
		  <div className='payment'>
            <div className='payment-container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment-section'>
                    <div className='payment-title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment-address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment-section'>
                    <div className='payment-title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment-items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
            

                {/* Payment section - Payment method */}
                <div className='payment-section'>
                    <div className="payment-title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment-details">
                            {/* Stripe magic will go */}

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className='payment-priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"₹"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>

                                  {/* Errors */}
                                {error && <div>{error}</div>}
                            </form>
                    </div>
                </div>
            </div>
        </div>
	)
}

export default Payment;