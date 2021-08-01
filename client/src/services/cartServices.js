const API_URL = "http://localhost:8080"

const API_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json"
}

export function getUserCart(userId) {/**return user cart by user id */
    return fetch(`${API_URL}/userCart?userId=${userId}`).then((res) => res.json())
        .then(
            res => {
                return res.length > 0 ? res.shift() : null;
            }).catch(e=>alert(e))
        ;
}

/**get uuser id delete his cart from json */
export function deleteCart(userId) {
    return fetch(`${API_URL}/userCart?userId=${userId}`,
        {
            headers: API_HEADERS,
            method: "DELETE"
        }).then(res => res.json()).catch(e=>alert(e))
}


export function updateProductInCart(cartToUpdate, updatedProduct) {/**get user cart and product and update product */
    /**remove product from cart */
    const filterdCart = cartToUpdate.cart.
        filter(product => product.productId != updatedProduct.productId)

    /**create updated cart */
    const updatedCart = {
        id: cartToUpdate._id,
        userId: cartToUpdate.userId,
        cart: updatedProduct.quantity === 0 ? filterdCart : filterdCart.concat(updatedProduct)
    }

    if (updatedCart.cart.length > 0) {
        return fetch(`${API_URL}/userCart/${cartToUpdate._id}`, {
            headers: API_HEADERS,
            method: "PUT",
            body: JSON.stringify(updatedCart)
        }).then(res => res.json()).catch(e=>alert(e))
    }

    /**if cart is empty delete it */
    deleteCart(cartToUpdate.userId);
}


export function createUserCart(userCart) {
    return fetch(`${API_URL}/userCart`, {
        headers: API_HEADERS,
        method: "POST",
        body: JSON.stringify(userCart)
    }).then(res => res.json()).catch(e=>alert(e))
}


export function updateUserCart(userId, productId, count) {/**add count to quantity to prooduct with productId in user cart */
    return getUserCart(userId).then(res => {
        if (res) {

            //update product quantity
            const product = res.cart.filter(product => product.productId == productId);/**get productby id from user cart */

            if (product.length > 0) {/**if product alredy exist in cart */
                updateProductInCart(res, { productId, quantity: product.shift().quantity + count });

            }
            else {
                updateProductInCart(res, { productId, quantity: count });

            }
        }
        else {/**if user does not have a cart in DB */
            createUserCart({userId, cart: [{ productId: productId, quantity: 1 }] });
        }
    }
    ).catch(e=>alert(e))
}
