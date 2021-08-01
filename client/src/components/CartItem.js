import React, { useState } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import RemoveIcon from '@material-ui/icons/Remove';
import { updateQuantity, removeFromCart, updateTotal, updateSingleProduct } from '../actions';
import { updateUserCart } from '../services/cartServices';
import { DeleteForever } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { useLocation } from 'react-router';

const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 800,
    },
    hebrewDirec: {
        direction: 'rtl'
    }
});


/**display product in cart */
const CartItem = (props) => {
    const classes = useStyles()

    const product = props.currentProduct
    const location = useLocation().pathname

    const addClick = () => {
        if (product.quantity - 1 < 0) {
            return;
        }

        props.updateTotal(product.price)

        props.updateQuantity({
            productId: props.productId,
            quantity: props.cartQuantity + 1
        });
        props.updateProduct({ ...product, ...{ quantity: product.quantity - 1 } })


        updateUserCart(props.userId, props.productId, 1);

    };

    const subClick = () => {
        if (props.cartQuantity - 1 < 0) {
            return;
        }
        props.updateQuantity({
            productId: props.productId,
            quantity: props.cartQuantity - 1
        });

        props.updateTotal(-product.price);

        props.updateProduct({ ...props.currentProduct, ...{ quantity: product.quantity + 1 } })


        updateUserCart(props.userId, props.productId, -1);
    }

    const removeClick = () => {
        props.removeFromCart(props.productId);
        props.updateProduct({ ...product, ...{ quantity: product.quantity + props.cartQuantity } })
        props.updateTotal(-(props.cartQuantity));

    }

    return (

        <Grid item xs={12}>
            <CardActionArea >
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Link href={`/products/${props.currentProduct._id}`}><Typography component="h4" variant="h7">
                                {product.title}
                            </Typography></Link>

                            <IconButton onClick={subClick}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography> {props.cartQuantity}</Typography>
                            <IconButton onClick={addClick}>
                                <AddBoxIcon />
                            </IconButton>
                            <IconButton onClick={removeClick}>
                                <DeleteForever />הסר
                            </IconButton>
                        </CardContent>
                    </div>
                    <Hidden xsDown>
                        <CardMedia className={classes.cardMedia}
                            image={location.slice(-1) == "/" && location.length > 1 ? props.currentProduct.srcImg[0] : `../products/${props.currentProduct.srcImg[0].slice(2,)}`}
                            title={product.title}
                        />
                    </Hidden>
                </Card>
            </CardActionArea>
        </Grid>
    )
}

const mapStateToProps = (state, ownProps) => {
    const productId = ownProps.productId;
    return {
        currentProduct: state.products.filter(item => item._id == productId).shift(),
        cartQuantity: state.cart.filter(item => item.productId === productId).shift().quantity,
        userId: state.user._id,
        total: state.total
    }
}

const mapDispatcToProps = (dispatch) => {
    return {
        updateQuantity: (product) => dispatch(updateQuantity(product)),
        removeFromCart: (productId) => dispatch(removeFromCart(productId)),
        updateProduct: (updatedProduct) => dispatch(updateSingleProduct(updatedProduct)),
        updateTotal: (count) => dispatch(updateTotal(count))
    }
}

export default connect(mapStateToProps, mapDispatcToProps)(CartItem);