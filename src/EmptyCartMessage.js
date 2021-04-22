import React from 'react';
import './EmptyCartMessage.css';
import {Link} from 'react-router-dom';

const EmptyCartMessage = () => {
	return (
		<div className='empty-cart'>
			<h1>Your Amazon Cart is Empty</h1>
			<small>Your shopping cart is waiting. 
				Give it purpose – fill it with groceries,
				 clothing, household supplies, electronics 
				 and more. Continue shopping on the <Link to ='/'>
				 Amazon.in
				</Link> 
				
				 </small>
		</div>
	)
}

export default EmptyCartMessage;