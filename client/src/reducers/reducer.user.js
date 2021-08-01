import { SET_USER } from '../actions/actionTypes';

const initialState = 
    {
        _id: 0,
        password: null,
        firstName: null,
        lastName: null,
        email: null,
        city: null,
        address: null,
        apartmentNum: null,
        postalCode: null,
        phoneNumber: null
    }


const userReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        default:
            return state;
    }
}

export default userReducer;