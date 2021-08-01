import { UPDATE_TOTAL,SET_TOTAL } from '../actions/actionTypes'

const totalReducer = (state = 0, action) => {
    switch (action.type) {
        case UPDATE_TOTAL:
            return state + action.payload
            case SET_TOTAL:
                return action.payload;
        default: return state
    }
}

export default totalReducer;