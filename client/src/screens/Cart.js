import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IconButton, makeStyles } from '@material-ui/core';
import { RemoveCircle, Payment } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import CartItem from '../components/CartItem'
import { getAllProducts } from '../services/productsServices';
import { setCart, setTotal, updateAllProducts } from '../actions';
import { deleteCart } from '../services/cartServices';

const useStyles = makeStyles({
    removeIcon: {
        width: "100%",
        textAlign: "center"
    },
});

/**disalay items in cart */
const Cart = (props) => {

    const classes = useStyles();
    
    const clearCartClick = () => {
        
        /**update state */
        props.nullifyTotal()
        props.clearCart();
        getAllProducts().then(res => {
            props.loadProducts(res)
        }
        )

        deleteCart(props.userId);/**delete user cart from json */
    }


    return (
        <>
            {props.userCart.length === 0 ? <p>
                🥺 העגלה עדין ריקה</p> :
                <>

                    <div className={classes.removeIcon}>
                        <p> {`${props.total}:סהכ לתשלום`}</p>
                        <IconButton>
                            <RemoveCircle onClick={clearCartClick} /> נקה עגלה
                        </IconButton>
                        <br/>
                    
                        <Link to='/checkout'>מעבר לתשלום</Link>
                    </div>

                        {props.userCart.map((item) =>
                            <CartItem
                                key={item.productId}
                                productId={item.productId}
                            />)
                        }

                </>}

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userCart: state.cart,
        userId: state.user._id,
        total: state.total
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: function () {
            dispatch(setCart([]));
        },
        nullifyTotal: function () {
            dispatch(setTotal(0))
        },
        loadProducts: function (products) {
            dispatch(updateAllProducts(products));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);