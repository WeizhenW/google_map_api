import { combineReducers } from 'redux';

const currentLocation = (state={}, action) => {
    switch(action.type){
        case 'SET_CURRENT_LOCATION':
            return action.payload;
        default:
            return state;
    }
}





const rootReducer = combineReducers({
    currentLocation,
})

export default rootReducer;