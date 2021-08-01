import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Routing from './Route.js';
import { getAllProducts } from '../services/productsServices';
import { setCart, setTotal, updateAllProducts } from '../actions';
import { loadState } from '../utils/sessionStorage';
import '../styles/App.css';


/**If user is logged in when he close the browser/tab his state is saved
 * and next time he will enter the page he will continue with the state he had when he left,
 * otherwise (if the user is guest) his cart is deleted when he close the tab
 * 
 in order to know when the user close the tab I saved the state in sessionStorage
 * 
 
 */



const App = (props) => {

  useEffect(() => {

    // if browser/tab was closed and sessionStorage is empty  and user is guest state is initialized
    if (!loadState() && props.userId == 0) {
      console.log('enter')
      getAllProducts().then(res => {
        
        props.loadProducts(res)
      }
      )
      props.clearCart()
      props.nullifyTotal()
    }
  })
  return (
    <Routing />
  )
}

const mapStateToProps=(state)=>{
  return{
    userId:state.user._id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: function (products) {
      dispatch(updateAllProducts(products))
    },
    clearCart: function () {
      dispatch(setCart([]))
    },
    nullifyTotal: function () {
      dispatch(setTotal(0))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
