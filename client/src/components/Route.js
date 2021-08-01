import React from 'react';
import {Switch,Route} from 'react-router-dom';
import HomePage from '../screens/HomePage';
import About from '../screens/About.js';
import Cart from '../screens/Cart.js';
import ProductList from '../screens/ProductList.js';
import Login from './Login.js';
import Register from './Register.js';
import SingleProduct from '../screens/SingleProduct.js';
import Checkout from '../screens/Checkout';

const Routing= ()=>{
    return(
        <Switch>
            <Route exact path="/about" component={About}/>
            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/checkout" component={Checkout}/>
            <Route exact path="/:category" component={ProductList}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path='/products/:productId' component={SingleProduct}/>
            <Route path="/" component={HomePage}/>
    </Switch>
    );
}

export default Routing;