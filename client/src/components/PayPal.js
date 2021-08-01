import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import {connect} from 'react-redux'

import { setCart, setTotal, updateSingleProduct } from '../actions';
import { deleteCart } from '../services/cartServices';
import { updateProductQuantity } from '../services/productsServices';



/**paypal button */
const PayPal = (props) => {
    const onSuccess = (payment) => {
        

        /**update state */
        props.clearCart();
        props.nullifyTotal();
        
        /**delete uuser cart from json */
        deleteCart(props.userId);
        
         /**update products quantity in json */
        for(let i=0;i<props.userCart.length;i++){
            updateProductQuantity(props.userCart[i].productId,-props.userCart[i].quantity)
        }
    }

    const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    }

    const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    }

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state
    let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
        sandbox: 'AYHjY7ndv-2IXfuOrpMiOXnQBNLqaEd2fKTQvDLGJey58ECGQH4xVNfW9nBNkLAeNXin9ZmPt2LDcXDL',
        production: 'YOUR-PRODUCTION-APP-ID',
    }
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
    return (
        <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
    );
}

const mapStateToProps=(state)=>{
    return{
        userId:state.user._id,
        userCart:state.cart,
        products:state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: function () {
            dispatch(setCart([]));
        },nullifyTotal:function(){
            dispatch(setTotal(0))
        },
        updateSingleProductInDB:function(updatedProduct){
            dispatch(updateSingleProduct(updatedProduct))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayPal);