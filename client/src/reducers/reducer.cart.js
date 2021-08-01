import {ADD_TO_CART,REMOVE_FROM_CART,SET_CART,UPDATE_QUANTITY} from '../actions/actionTypes';

const searchProduct=(shoppingCart,productId)=>{/**check if product is in cart */
    return shoppingCart.find(item=>item.productId===productId);
}

const findIndex=(arr,id)=>{/**find index of product in cart */
    for(let i=0;i<arr.length;i++){
        if(arr[i].productId==id){
            return i
        }
    }
    return 0;
}

const updateQuantity=function(shoppingCart,updatedproduct){/**update quantity of prooduct in cart */
    if(updatedproduct.quantity===0){
        return shoppingCart.filter((item) => item.productId !== updatedproduct.productId)

    }
    return shoppingCart.map((item) => {

        if (item.productId!==updatedproduct.productId) {
          // This isn't the item we care about - keep it as-is
          return item
        }
    
        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          ...updatedproduct
        }
      })
}

const productQuantity=(shoppingCart,productId)=>{/**return quantity of product in user cart */
    return shoppingCart[findIndex(shoppingCart,productId)].quantity
}


const cartReducer=function(state=[],action){
    
    switch (action.type) {
        case SET_CART:
            return action.payload
        case ADD_TO_CART:
            if(!searchProduct(state,action.payload)){/**if product doesn't exist in cart */
                return state.concat({
                    productId:action.payload,
                    quantity:1
                })
            }
            else{/**pproduct is already exist we hav to incraese quantity */
                return updateQuantity(state,{
                    productId:action.payload,
                    quantity:productQuantity(state,action.payload)+1 
                });
            }
        case REMOVE_FROM_CART:
            return state.filter((item) => item.productId !== action.payload)
        case UPDATE_QUANTITY:
            return updateQuantity(state,action.payload);
        default:
            return state;
    }
}

export default cartReducer;