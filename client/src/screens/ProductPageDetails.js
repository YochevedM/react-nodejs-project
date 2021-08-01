import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { updateUserCart } from '../services/cartServices'
import ControlledAccordions from '../components/Accordination'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {useAlert} from 'react-alert'

import { addToCart, updateSingleProduct, updateTotal } from '../actions';
import translateCategory from '../utils/translateCategory.js';

const useStyles = makeStyles(() => ({
    hebrewDirec: {
        direction: 'rtl'
    }
}));


const ProductPageDetails = (props) => {
    const classes = useStyles();

    const alert=useAlert();

    const addToCartClick = () => {

        alert.success(` נוסף לעגלה ${props.product.title}`)
        /**update state */
        props.addToCart(props.product._id);//redux-update state
        props.updateTotal(props.product.price)
        props.updateProduct({ ...props.product, ...{ quantity: props.product.quantity - 1 } })

        /**update DB */
        updateUserCart(props.userId, props.productId, 1);
    }

    return (
        <>
            <Box marginLeft={6} marginTop={3}>
                <Grid container
                    direction="row"
                    spacing={3}
                    justify="flex-end">
                    <Grid item xs={3}>
                        <Grid container spacing={2} justify="flex-end" alignItems="flex-end" alignContent="flex-end">
                            <Grid item>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Typography color="textPrimary">{props.product.title}</Typography>

                                    <Link color="inherit" href={`/${props.product.category}`}>
                                        {translateCategory(props.product.category)}
                                    </Link>
                                    <Link color="inherit" href="/">
                                        דף בית
                                    </Link>
                                
                                </Breadcrumbs></Grid>
                            <Grid item xs={12} className={classes.hebrewDirec}> <Typography variant="h4">{props.product.title}</Typography></Grid>
                            <Grid item xs={12} className={classes.hebrewDirec}> <Typography variant="h8" >{props.product.description}</Typography></Grid>
                            <Grid item xs={12}> <Typography variant="h5" className={classes.hebrewDirec}> {props.product.price} ש"ח </Typography></Grid>
                            <Grid item xs={12} className={classes.hebrewDirec}><Link onClick={(e)=>{e.preventDefault();window.open(props.product.comparePricesLink)}} className={classes.hebrewDirec}>אני רוצה להשוות מחירים</Link></Grid>
                            <Grid item><Button variant="contained" onClick={addToCartClick}  disabled={props.product.quantity>0?false:true}>
                            {props.product.quantity>0?'הוסף לסל':'אזל מהמלאי'}
                            </Button></Grid>
                            <Grid item ><ControlledAccordions dimensions={props.product.dimensions} maintenance={props.product.maintenance} /></Grid>
                        </Grid>




                    </Grid>

                    <Grid item xs={6}>
                        <div className="slide-container">
                            <Slide > 
                                {props.product.srcImg.map((img, index) =>
                                    <div className="each-slide" key={index}>
                                        <div className="image-slide" style={{ 'backgroundImage': `url(products/${img})`, width: '100%', height: '800px' }}>
                                        </div>
                                    </div>)}
                            </Slide>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    const productId = ownProps.productId
    return {
        product: state.products.filter(item => item._id == productId).shift(),
        userId: state.user._id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: function (productId) {
            dispatch(addToCart(productId));
        },
        updateProduct: function (updatedProduct) {
            dispatch(updateSingleProduct(updatedProduct))
        },
        updateTotal: function (count) {
            dispatch(updateTotal(count))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageDetails);