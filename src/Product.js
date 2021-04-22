import React from 'react';
import './Product.css';
import {useStateValue} from './StateProvider';

const Product = ({title, price, image, rating, id}) => {

	const [{basket}, dispatch] = useStateValue();


	const addToBasket = () => {
		dispatch({
			type: 'ADD_TO_BASKET',
			item: {
				id: id,
				title: title,
				image: image,
				rating: rating,
				price: price
			}

		})
	}
	return (
		<div className='product'>

			<div className='product-info'>

				<p className='product-title'>{title}</p>

				<p className='product-price'>
					<sup>₹</sup>
					<span>{price}</span>
				</p>

				<p className='inStock-text'>In stock</p>

				<div className='product-rating'>

					{Array(rating)
						.fill()
						.map((_,i) => (
					<p>⭐</p>
					))}
					
				</div>

			</div>

			<img src={image} />

				<button onClick={addToBasket} >Add to Cart</button>
		</div>
	)
}

export default Product