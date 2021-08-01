import React, { useState } from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { setUser } from '../actions';
import Header from '../components/Header';
import Paypal from '../components/PayPal';
import { updateUser } from '../services/userServices';
import CalculateTotal from '../components/CalculateTotal'
import { Link } from '@material-ui/core';


const checkoutSchema = Yup.object().shape({
    firstName: Yup.string().required('יש למלא גם את השדה הזה'),
    lastName: Yup.string().required('יש למלא גם את השדה הזה'),
    email: Yup.string().required('יש למלא גם את השדה הזה').email('כתובת המייל שהזנת אינה תקינה'),
    city: Yup.string().required('יש למלא גם את השדה הזה'),
    address: Yup.string().required('יש למלא גם את השדה הזה'),
    apartmentNum: Yup.number('מספר הדירה שהזנת אינו תקין').min(0, 'יש להזין מספר שאינו שלילי'),
    postalCode: Yup.string().required('יש למלא גם את השדה הזה').matches(/\d{7}/, 'מיקוד שהזנת אינו תקין יש להזין מספר עם 7 ספרות'),
    phoneNumber: Yup.string().matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, "מספר לא חוקי")
})

/**when user wnat to pay for his order we have to check that there are enough
 * units in storsge (because maybe after user added to cart another user  boughthis product and now
 * he cnnot buy the quantity he has in cart
 * so we sent every product to component CalculateTotal 
 * that check if there are Sufficient quantity in stock if not it asks the user to update the order accordingly)
 */


const Checkout = (props) => {

    const [updateProducts, setUpdatedProducts] = useState({ prodNum: props.userCart.length, avaliableProd: 0 });//num of products that was calculated
    const [isSubmit, setIsSubmit] = useState(false)/**is order details were sent */

    const initialValues = {
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        email: props.user.email,
        city: props.user.city,
        address: props.user.address,
        apartmentNum: props.user.apartmentNum,
        postalCode: props.user.postalCode,
        phoneNumber: props.user.phoneNumber
    }

    const handleSubmit = (values) => {
        values["id"] = props.user.id;
        values["password"] = props.user.password
        if (props.user.id !== 0) {//update DB if user is registered
            updateUser(values);
            props.setUser(values);//update state
        }

        setIsSubmit(true)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: checkoutSchema,
        onSubmit: handleSubmit,
    });


    return (
        <>
            <Header />
            {props.userCart.map((product) =>
                <CalculateTotal
                    key={product.id}
                    product={product}
                    cb={setUpdatedProducts} />)}
            {(updateProducts.avaliableProd >= props.userCart.length) &&/**if all products were checked */
                <>
                    <Box width="40%" marginLeft='auto' marginRight="auto" marginTop="5%">
                        <Typography variant="h6" gutterBottom>
                            פרטי משלוח                 </Typography>
                        <form noValidate onSubmit={formik.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="firstName"
                                        name="firstName"
                                        label="שם פרטי"
                                        fullWidth
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="lastName"
                                        name="lastName"
                                        label="שם משפחה"
                                        fullWidth
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="city"
                                        name="city"
                                        label="עיר"
                                        fullWidth
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        error={formik.touched.city && Boolean(formik.errors.city)}
                                        helperText={formik.touched.city && formik.errors.city}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="address"
                                        name="address"
                                        label="כתובת"
                                        fullWidth
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="apartmentNum"
                                        name="apartmentNum"
                                        label="מספר דירה"
                                        fullWidth
                                        value={formik.values.apartmentNum}
                                        onChange={formik.handleChange}
                                        error={formik.touched.apartmentNum && Boolean(formik.errors.apartmentNum)}
                                        helperText={formik.touched.apartmentNum && formik.errors.apartmentNum}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="כתובת מייל"
                                        fullWidth
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="postalCode"
                                        name="postalCode"
                                        label="מיקוד"
                                        fullWidth
                                        value={formik.values.postalCode}
                                        onChange={formik.handleChange}
                                        error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                                        helperText={formik.touched.postalCode && formik.errors.postalCode}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="מספר טלפון"
                                        fullWidth
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary">בצע הזמנה</Button>

                                </Grid>
                            </Grid>
                        </form>

                        {isSubmit &&<>
                        <br/>
                         <Link href="https://www.paypal.com/">PayPal</Link>  <bdr>לחץ לתשלום מאובטח באמצעות </bdr>
                         <br/>
                         <Paypal history={props.history} total={props.total} />
                         </>}
                    </Box>
                    {props.userCart.length === 0 && <p>העגלה התרוקנה</p>}

                </>}
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        userCart: state.cart,
        total: state.total
    }

}

const mapDispatchToPros = (dispatch) => {
    return {
        setUser: function (user) {
            dispatch(setUser(user))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(Checkout);

