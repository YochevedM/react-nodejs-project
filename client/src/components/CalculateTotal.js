import React, { useEffect, useState } from 'react';
import {useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { updateQuantity, updateSingleProduct, updateTotal } from '../actions';
import { getSingleProduct } from '../services/productsServices'
import { updateUserCart } from '../services/cartServices'
import '../styles/CalculateTotal.css' 




/**CalculateTotal gets a product and count of units user invited and check if there is enough units in inventory */
const CalculateTotal = (props) => {

    const [isEnough, setIsEnough] = useState(true);
  
    const [dbQuantity,setDbQuantity]=useState(0)/**quantity that there is now in inventory */

    useEffect(() => {
        getSingleProduct(props.product.productId).then(res => {
            setDbQuantity(res.quantity)
            if (res.quantity < props.product.quantity) {/**there is not enough units in inventory */
                setIsEnough(false);
            }
            else {
                props.cb((prevDetails) => ({/**this variable store num of products that was checked */
                    avaliableProd: prevDetails.avaliableProd + 1
                }))
            }
        }
        )
    }, [])


    const totalSchema=Yup.object().shape(
        {
            qu: Yup.number().required('יש למלא גם את השדה הזה').min(0,'מספר המוצרים לא חוקי').max(dbQuantity,'מספר המוצרים שהזנת חורג מכמות הקימת במלאי'),
        }
    )

    const handleSubmit = (values) => {
        const num = props.product.quantity - values.qu /**num of products that were canceled */
        

        /**update state */
        props.updateTotal(-(num*props.currentProduct.price))
        props.updateQuantity({ /**in cart */
            productId: props.product.productId,
            quantity: values.qu
        })
        props.updateSingleProduct({ ...props.currentProduct, ...{ quantity: dbQuantity - values.qu } })

        updateUserCart(props.userId, props.product.productId, -num);//update DB
        
        props.cb((prevDetails) => ({
            avaliableProd: prevDetails.avaliableProd + 1
        }))
        setIsEnough(true);
        
    }

    const formik = useFormik({
        initialValues: { qu:null },
        validationSchema: totalSchema,
        onSubmit: handleSubmit,
    });

    return (
        <>
            {
                !isEnough ? /**ask user how many units he want to buy depending on the quantity exists in inventory */
                    <form noValidate onSubmit={formik.handleSubmit} id="form">
                            <label htmlFor="updateQuantity">
                                 הזמנת {props.product.quantity} יחידות<br/>
                               {props.currentProduct.title} מהמוצר <br/> 
                            מספר היחידות הקימות במלאי: {dbQuantity}<br/>
                                הכנס את מספר היחידות שברצונך להזמין<br/>
                            </label>
                            
                            <TextField
                            variant="outlined"
                            name="qu"
                            type="string"
                            id="qu"
                            autoComplete="current-password"
                            onChange={formik.handleChange}
                            error={formik.touched.qu && Boolean(formik.errors.qu)}
                            helperText={formik.touched.qu && formik.errors.qu}
                        />
                    <br/>
                    <Button type="submit">עדכן עגלה</Button>
                    </form>
                    : null
            }
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    const productId = ownProps.product.productId;
    return {
        currentProduct: state.products.filter(item => item._id == productId).shift(),
        userId: state.user._id,
        total: state.total
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        updateQuantity: (product) => dispatch(updateQuantity(product)),
        updateTotal: (count) => dispatch(updateTotal(count)),
        updateSingleProduct: (updatedProduct) => dispatch(updateSingleProduct(updatedProduct))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalculateTotal);