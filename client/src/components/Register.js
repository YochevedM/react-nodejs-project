import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { v4 as uniqueId } from 'uuid';
import { hashString } from 'react-hash-string';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getAllProducts } from '../services/productsServices'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import emailjs from 'emailjs-com';

import { setUser, setCart, updateAllProducts, setTotal } from '../actions';
import { getUser, addUser } from '../services/userServices';
import '../styles/Form.css'
import { getDefaultNormalizer } from '@testing-library/dom';


const registerSchema = Yup.object().shape(
    {
        email: Yup.string().required('יש למלא גם את השדה הזה').email('כתובת המייל שהזנת אינה תקינה'),
        password: Yup.string().required('יש למלא גם את השדה הזה'),
        firstName: Yup.string().required('יש למלא גם את השדה הזה'),
        lastName: Yup.string().required('יש למלא גם את השדה הזה')
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const Register = (props) => {

    const classes = useStyles();

    const [isError, setIsError] = useState(false);/**store if user is already exists */
    const [showPassword, setShowPassword] = useState(false);

    const handleShowpasswordClick = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = (values) => {
        getUser(values.email).then(
            res => {
                if (res) {/**if user with such email is aready exists */
                    setIsError(true);
                }
                else {

                    setIsError(false);

                    /**initialize  state */
                    getAllProducts().then(res => {
                        props.loadProducts(res)
                    })
                    props.nullifyTotal()
                    props.clearCart()

                    const user = {
                        password: hashString(values.password),/**hash password */
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        city: null,
                        address: null,
                        apartmentNum: null,
                        postalCode: null,
                        phoneNumber: null
                    };
                    
                    
                    /**add user to json */
                    addUser(user).then(res=>props.handleRegister(res))

                    emailjs.send('service_8ikuddq', 'template_lc1gj18', {
                        customer_address:values.email,
                        to_name:values.firstName,
                        email:values.email,
                        password :values.password,
                        reply_to:'chevi7385@get.com'/**my email */
                    }, 
                        'user_R0WStZ4xWxHJmVf0ePR7E');
                }
            }
        )
    }


    const formik = useFormik({
        initialValues: { email: '', password: '', firstName: '', lastName: '' },
        validationSchema: registerSchema,
        onSubmit: handleSubmit,
    });


    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        הרשמה
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    fullWidth
                                    id="firstName"
                                    label="שם פרטי"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.email && formik.errors.firstName}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="lastName"
                                    label="שם משפחה"
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="סיסמא"
                                    type={showPassword ? "string" : "password"}
                                    id="password"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton onClick={handleShowpasswordClick}>
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                                הרשם
                            </Button>

                        </Grid>
                    </form>
                </div>
                <Box mt={3}>
                    <Typography variant="body2" color="textSecondary" align="center">{
                        isError && <p id="error">כתובת המייל נמצאת בשמוש ע"י משתמש אחר</p>
                    }</Typography>
                </Box>
            </Container>


        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleRegister: function (newUser) {
            dispatch(setUser(newUser));
        },
        clearCart: function () {
            dispatch(setCart([]));
        },
        loadProducts: function (products) {
            dispatch(updateAllProducts(products))
        },
        nullifyTotal: function () {
            dispatch(setTotal(0))
        }
    }
}

export default connect(undefined, mapDispatchToProps)(Register);