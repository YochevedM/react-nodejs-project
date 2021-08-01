import React from 'react';
import ProductPageDetails from './ProductPageDetails';
import Header from '../components/Header';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const SingleProduct = (props) => {

    const { productId } = useParams();/**get prooductId from url */
    
    return (
        <>
            <Header/>
            <ProductPageDetails productId={productId}/>
        </>
    )
}

export default SingleProduct;