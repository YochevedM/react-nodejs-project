/**Create action with type and payload */

import {
    ADD_TO_CART, REMOVE_FROM_CART, SET_CART, SET_USER,
    UPDATE_QUANTITY,
     UPDATE_TOTAL, UPDATE_ALL_PRODUCTS
    , UPDATE_SINGLE_PRODUCT, SET_TOTAL
} from './actionTypes';

export function addToCart(payload) {/**payload is productId */
    return ({
        type: ADD_TO_CART,
        payload: payload
    });
}

export function removeFromCart(payload) {/**payload is productId */
    return ({
        type: REMOVE_FROM_CART,
        payload: payload
    });
}

export function updateQuantity(payload) {/**payload is updatedProduct */
    return ({
        type: UPDATE_QUANTITY,
        payload: payload
    });
}

export function setCart(payload){
    return{
        type:SET_CART,
        payload:payload
    }
} /**payload is new cart */

export function setUser(payload) {/**payload is userDetails */ 
    return {
        type: SET_USER,
        payload: payload
    }
}


export function updateTotal(payload) { /**payload is count to add/sub */
    return {
        type: UPDATE_TOTAL,
        payload: payload
    }
}

export function updateSingleProduct(payload) { /**payload is updatedProduct */
    return {
        type: UPDATE_SINGLE_PRODUCT,
        payload: payload
    }
}

export function updateAllProducts(payload) { /**payload is updatedProducts */
    return {
        type: UPDATE_ALL_PRODUCTS,
        payload: payload
    }
}

export function setTotal(payload) {/**payload is new total */
    return {
        type: SET_TOTAL,
        payload: payload
    }
}