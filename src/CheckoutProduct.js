import React from 'react';
import './CheckoutProduct.css';
import {useStateValue} from './StateProvider';

const CheckoutProduct = ({title, image, rating, price, id, hideButton}) => {

	const [{basket}, dispatch] = useStateValue();

	const removeFromBasket = () => {
		dispatch({
			type: 'REMOVE_FROM_BASKET',
			id: id
		})
	}

	return (
		<div className='checkout-product'>
           
           <div className='checkout-product-image'>
           		<img src={image}/>
           </div>  
		

			<div className='checkout-product-info'>
				<p className='checkout-product-title'>{title}</p>
				<p className='checkout-product-price'>
					<sup>₹</sup>
					<span>{price}</span>
				</p>

				<div className='checkout-product-rating'>

					{Array(rating)
						.fill()
						.map((_,i) => (
					<p>⭐</p>
					))}
					
				</div>

				{!hideButton && (
					<button onClick={removeFromBasket}>
					Remove from Basket
				</button>
					)}
			</div>
			
		</div>
	)
}

export default CheckoutProduct;