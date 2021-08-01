import React from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { setCart, setUser, setTotal, updateAllProducts } from '../actions';
import { getAllProducts } from '../services/productsServices'


const Logout = (props) => {

    const logoutClick = () => {
        
        /**initialize state */
        props.logoutHandler();
        props.clearCart();
        props.nullifyTotal()
        getAllProducts().then(res => {
            props.loadProducts(res)
        }
        )
    }

    return (
        <Button onClick={logoutClick}>יציאה</Button>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutHandler: function () {
            dispatch(setUser({
                _id: 0,
                password: null,
                firstName: null,
                lastName: null,
                email: null,
                city: null,
                address: null,
                apartmentNum: null,
                postalCode: null,
                phoneNumber: null
            }));
        },
        clearCart: function () {
            dispatch(setCart([]))
        },
        loadProducts: function (products) {
            dispatch(updateAllProducts(products))
        },
        nullifyTotal: function () {
            dispatch(setTotal(0))
        }
    }
}

export default connect(undefined, mapDispatchToProps)(Logout);