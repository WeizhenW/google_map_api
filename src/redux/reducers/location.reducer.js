import { combineReducers } from 'redux';

const currentLocation = (state={}, action) => {
    switch(action.type){
        case 'SET_CURRENT_LOCATION':
            return action.payload;
        default:
            return state;
    }
}

const searchResult = (state=[], action) => {
    switch(action.type){
        
        case 'SET_DATABASE_RESULT':
            return action.payload;
        default:
            return state;
    }
}

const googleResult = (state = [], action) => {
    switch(action.type){
        case 'SET_SEARCH_RESULT':
            return action.payload;
        
        default:
            return state;
    }
}




const rootReducer = combineReducers({
    currentLocation,
    searchResult,
    googleResult,
})

export default rootReducer;