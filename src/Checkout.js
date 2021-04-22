import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal.js';
import CheckoutProduct from './CheckoutProduct.js';
import {useStateValue} from './StateProvider';
import EmptyCartMessage from './EmptyCartMessage.js';

const Checkout = () => {

	const [{basket}] = useStateValue();

	return (
		<div className='checkout'>


	        <div className='checkout-left'>

				<img className='checkout-ad' 
					 src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"/>
				
				<div className='checkout-title'>
					{(basket?.length >= 1) 
					 ? <h2>Your Shopping Basket</h2>
					 :  <EmptyCartMessage/> }
				</div>

                 { basket?.map(item => (

				<CheckoutProduct
					id={item.id}
					title={item.title}
					image={item.image}
					price={item.price}
					rating={item.rating}
					/>
				))}

			</div>

          <div className='checkout-right'>

         {(basket?.length >= 1) ? <Subtotal/> : '' }

          </div>
			
          
		</div>
	)
}

export default Checkout;