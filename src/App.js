import React, {useEffect} from 'react'; 
import './App.css';
import Header from './Header.js';
import Home from './Home.js';
import Checkout from './Checkout.js';
import Login from './Login.js';
import Payment from './Payment.js';
import Orders from './Orders.js';
import {useStateValue} from './StateProvider';
import {auth} from './firebase';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const promise = loadStripe(
  'pk_test_51IbJk7SDSwLlnSzSVKFCuqtCjGmXZGqxdHX8UadfAzzChWVEcCV0D4KDffQcRp67ruir1xDUeMpareiGziqPs0f000WIk1SAtU'
  );



function App() {

  const [{basket, user}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {

      console.log('AUTH USER', authUser);

      authUser ? dispatch({ 
          type: 'SET_USER',
          user: authUser
        }) 
               : 
           dispatch({  
           type: 'SET_USER',
           user: null 
         })

    })
  }, [])



  return (

  <Router>

        <div className="App">

       <Switch>

            <Route path='/orders'>
              <Header/>
              <Orders/>
            </Route>

            <Route path='/login'>
              <Login/> 
            </Route>

            <Route path='/checkout'>
                  <Header/>
                  <Checkout/>
            </Route>

            <Route path='/payment'>
               <Header/>
              <Elements stripe={promise}>
                <Payment/>
              </Elements>
            </Route>

            <Route path='/'>
                  <Header/>
                  <Home/>
            </Route>

        </Switch>

        </div>

  </Router>
  );
}

export default App;

      //   src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' 

