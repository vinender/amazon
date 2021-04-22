import React, {useState} from 'react';
import './Header.css';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SearchIcon from '@material-ui/icons/Search';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import {Link} from 'react-router-dom';
import {useStateValue} from './StateProvider';
import {auth} from './firebase';


const Header = () => {

	const [{basket,user}, dispatch] = useStateValue();

	const [text, setText] = useState('');

	const inputHandler = (e) => {
		e.preventDefault();
		setText(e.target.value);
	}

	const signInsignOut = () => {
		if (user) {
 			auth.signOut();
		}
	}

	
	return (
		<div className='header'>

           <Link to='/'>
			 <img  className='header-logo' 
				   src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'/>
           </Link>

			<div className='user-address-navbar'>

			   <RoomOutlinedIcon className='location-icon'/>
				<div className='address'>
					<span className='option1' >Deliver to vinender</span>
					<span className='option2'> District...174101</span>
				</div>

			</div>


			<div className='header-search'>

			    <input className='header-searchInput'
			           onChange={inputHandler} 
			           type='text' 
			           value={text}
			            /> 
			    <SearchIcon className='header-searchIcon'/>

			 </div>

			    <div className='header-nav'>

			     <Link to= {!user && './login'}>
			    	<div onClick={signInsignOut} 
			    		className='header-option'>
			    		<span className='option1' >
			    			Hello { !user ? 'Guest' : user.email}
			    		</span>
			    		<span className='option2'>
			    			{ user ? 'Sign out' : 'Sign In' }
			    		</span>
			    	</div>
			     </Link>

			     
                   <Link to='./orders'>
			    	<div className='header-option'>
			    		<span className='option1' >Return</span>
			    		<span className='option2'> & Orders</span>
			    	</div>
			    </Link>

			    	<div className='header-option'>
			    		<span className='option1' >Yours</span>
			    		<span className='option2'>Prime</span>
			    	</div>

                   <Link to='/checkout'>
			    	<div className='header-optionBasket'>
			    		<ShoppingBasketIcon className='basket-icon'/>
			    		<span className='header-basketCounter'>{basket?.length}</span>
			    	</div>
			    	</Link>

			    </div>
			    
		</div>
	)
}

export default Header;