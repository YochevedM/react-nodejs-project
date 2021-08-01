import { combineReducers } from 'redux';

import cartReducer from './reducer.cart';
import userReducer from './reducer.user';
import totalReducer from './reducer.total';
import productsReducer from './reducer.products'


const rootReducer = combineReducers(
    {
        products:productsReducer,
        user:userReducer,
        cart:cartReducer,
        total:totalReducer
    }
);

export default rootReducer;
