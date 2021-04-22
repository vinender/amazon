import React from 'react';
import './Home.css';
import Product from './Product.js';
import {auth} from './firebase';
import {useStateValue} from './StateProvider';


const Home = () => {

	const[{basket, user}] = useStateValue();


	return (
		<div className='home'>

			<div className='home-container'>

			<img className='home-image' 
				src='https://images-eu.ssl-images-amazon.com/images/G/31/img21/Audio/Sony/AprAudioFest/Sony_Gw_1500x600._CB654983955_.jpg'/>
			
			
			<div className='home-row'>

				<Product
					id={893292382}
					title={'Apple iPhone 12 Mini (64GB) - Blue'}
					price={65000.00}
					rating={4}
					image={'https://m.media-amazon.com/images/I/71sNNCTfMuL._AC_UY218_.jpg'}
				/>
				<Product
				    title={'Autobiography of a Yogi (Complete Paperback Edition)'}
					price={89.00}
					rating={5}
					image={'https://m.media-amazon.com/images/I/71RRPCXcM7L._AC_UY218_.jpg'}
				/>

			</div>


			<div className='home-row'>

				<Product
					id={273892984}
				    title={'Samsung 253 L 2 Star Inverter Frost-Free Double Door Refrigerator (RT28T3932CR/HL, Camellia Purple'}
					price={23790.00}
					rating={4}
					image={'https://m.media-amazon.com/images/I/7140rbJD8ZL._AC_UL320_.jpg'}
				/>
				<Product
					id={3909023412}
				    title={'Samsung Galaxy S21 Plus 5G(Phantom Violet, 8GB, 128GB Storage)'}
					price={76999.00}
					rating={4}
					image={'https://m.media-amazon.com/images/I/91QuYeAEXVL._AC_UY218_.jpg'}
				/>
				<Product
					id={999459245}
				    title={'Samsung Galaxy Watch Active 2 (Bluetooth, 44 mm) - Silver, Aluminium Dial, Silicon Straps'}
					price={28490.00}
					rating={5}
					image={'https://m.media-amazon.com/images/I/71mqg2OccrL._AC_UY218_.jpg'}
				/>
				

			</div>


			<div className='home-row'>

				<Product
					id={4023502353}
				    title={'Samsung 163 cm (65 Inches) Q Series 4K Ultra HD QLED Smart TV QA65Q6FNAK (Black) (2018 model)'}
					price={178999.00}
					rating={4}
					image={'https://m.media-amazon.com/images/I/81Lp5qoZmGL._AC_UY218_.jpg'}
				/>

			</div>
			</div>
        </div>

	)
}

export default Home