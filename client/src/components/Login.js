import React, {useState } from 'react';
import {useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { hashString } from 'react-hash-string';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { setUser, setCart, updateAllProducts, setTotal } from '../actions';
import { getUserCart } from '../services/cartServices';
import { getUser } from '../services/userServices';
import {getAllProducts} from '../services/productsServices'
import '../styles/Form.css'


const loginSchema = Yup.object().shape(
    {
        email: Yup.string().required('יש למלא גם את השדה הזה').email('כתובת המייל שהזנת אינה תקינה'),
        password: Yup.string().required('יש למלא גם את השדה הזה')
    }
)


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        colr:'#806650'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


/**the function gets userCart and products and calculate amount of money he has to pay */
const calculateTotal=function(cart,products){
    let total=0;
    for (let i=0;i<cart.length;i++){
        let product=products.filter(item=>item._id==cart[i].productId).shift();
        total+=cart[i].quantity*product.price
    }
    return total
}


const Login = (props) => {

    const classes = useStyles();

    const [isError, setIsError] = useState(false);/**save if user exists or not */
    const [showPassword,setShowPassword]=useState(false);

    const handleShowpasswordClick=()=>{
        setShowPassword(!showPassword)
    }

    const handleSubmit = (values) => {
        getUser(values.email).then(
            res => {
                if (res && res.password == hashString(values.password)) {/**if user is logged in and ppassword is suitable */
                    setIsError(false);/**user exists */
                    
                    /**initialize state */
                    getAllProducts().then(ret => {
                        props.loadProducts(ret)
                      })
                    props.handleLogin(res);
                    getUserCart(res._id).then(res => {
                        if (res) {
                            props.loadCart(res.cart);
                            props.setTotal(calculateTotal(res.cart,props.state.products))
                        }

                    }
                    )
                    

                }
                else {/**user does not exist */
                    setIsError(true);

                }
            })
    }

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: handleSubmit,
    });

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        התחברות
        </Typography>
                    <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="כתובת מייל"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="סיסמא"
                            type={showPassword?"string":"password"}
                            id="password"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                      <IconButton onClick={handleShowpasswordClick}>
                                     {showPassword?<Visibility/>:<VisibilityOff/>}
                                     </IconButton>
                                  </InputAdornment>
                                ),
                              }}

                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            התחבר
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={()=>props.changeTab(1)}>
                                    !עדין אינך רשום? הירשם עכשיו
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={3}>
                <Typography variant="body2" color="textSecondary" align="center">{
                        isError && <p id="error">משתמש אינו קים</p>
                    }</Typography>
                </Box>
            </Container>


        </>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: function (newUser) {
            return dispatch(setUser(newUser));
        },
        loadCart: function (newUserCart) {
            return dispatch(setCart(newUserCart));
        },
        loadProducts: function (products) {
            dispatch(updateAllProducts(products))
        },
        setTotal: function (total) {
            dispatch(setTotal(total))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Login);