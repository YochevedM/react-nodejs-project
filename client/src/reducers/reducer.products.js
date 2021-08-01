import { UPDATE_SINGLE_PRODUCT, UPDATE_ALL_PRODUCTS } from '../actions/actionTypes'


const productsReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATE_SINGLE_PRODUCT:
            return state.map((product) => {

                if (product._id !== action.payload._id) {
                    // This isn't the item we care about - keep it as-is
                    return product
                }

                // Otherwise, this is the one we want - return an updated value
                return {
                    ...product,
                    ...action.payload
                }
            })
        case UPDATE_ALL_PRODUCTS:
            return action.payload
        default: return state
    }
}

export default productsReducer;