import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import {useAlert} from 'react-alert'

import { addToCart, updateSingleProduct, updateTotal } from '../actions';
import { updateUserCart } from '../services/cartServices';
import { updateProductQuantity } from '../services/productsServices';


/**get productId and create a link to page that display product details */
const createLink = (id) => {
    return '/products/' + id;
}

const UseStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        textAlign: 'center',
        width: '140px',
        height: '140px',
        margin: 'auto'
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    hebrewDirec: {
        direction: 'rtl'
    }
}));

/**Product item get productId and display a csrd with a few deatils about it and a button of adding to cart */
const ProductItem = (props) => {

    const classes = UseStyles();

    const alert=useAlert()

    const addToCartClick = () => {

        alert.success(` נוסף לעגלה ${props.currentProduct.title}`)

        /**update state */
        props.addToCart(props.currentProduct._id);//redux-update state
        props.updateTotal(props.currentProduct.price)
        props.updateProduct({ ...props.currentProduct, ...{ quantity: props.currentProduct.quantity - 1 } })

        /**update DB */
        updateUserCart(props.userId, props.productId, 1);
    }


    return (<Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
            <Link href={createLink(props.currentProduct._id)}>
                <CardMedia
                    className={classes.cardMedia}
                    image={`../products/${props.currentProduct.srcImg[0].slice(2,)}`}
                    title={props.currentProduct.title}
                />
            </Link>
            <CardContent className={classes.cardContent}>
                <Link href={createLink(props.currentProduct._id)}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.currentProduct.title}
                    </Typography>
                </Link>
                <Typography className={classes.hebrewDirec}>
                    {props.currentProduct.description}
                </Typography>
                <Typography variant="h6" className={classes.hebrewDirec}>
                {props.currentProduct.price} ש"ח
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={addToCartClick} disabled={props.currentProduct.quantity>0?false:true}>
                    {props.currentProduct.quantity>0?'הוסף לסל':'אזל מהמלאי'}
                    </Button>
                    {!props}
            </CardActions>
        </Card>
    </Grid>
    )
}

const mapStateToProps = (state, ownProps) => {
    const productId = ownProps.productId;
    return {
        currentProduct: state.products.filter(item => item._id == productId).shift(),
        userId: state.user._id,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: function (productId) {
            dispatch(addToCart(productId));
        },
        updateProduct: (updatedProduct) => dispatch(updateSingleProduct(updatedProduct)),
        updateTotal: (count) => dispatch(updateTotal(count))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);