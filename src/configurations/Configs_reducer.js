import { combineReducers } from 'redux';
//import Authentications from '../container/Login/_Reducers';
//import FetchingToken from '../navigator/Auth/_Reducers';
//import FetchSalesStatus from '../container/SalesStatus/_Reducers';
// import OrderReducer from '../container/SalesStatusNew/_Reducers';
//import FetchForgotPassword from '../container/ForgotPassword/_Reducers';
//import ProductReducer from '../container/Product/_Reducers';

// const error
const SetErrorServer = (state = {}, action) => {
    switch (action.type) {
        case "ERROR_SERVER":
            return {
                ...state,
                error: {
                    isError: true,
                    message: action.payload
                }
            }
        default:
            return null
    }
}

const SetToastMessage = (state = {}, action) => {
    switch (action.type) {
        case "TOAST_MESSAGE":
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                duration: action.payload.duration,
                timestamp: Math.floor(Date.now())
            }
        default:
            return state
    }
}

const globalStates = {
    auth_token: '',
    profile: ''
}

const GlobalStatesReducer = (state = globalStates, action) => {
    switch (action.type) {
        case "SET_GLOBAL_STATES":
            return {
                ...state,
                auth_token: action.payload.auth_token ? action.payload.auth_token : state.auth_token,
                profile: action.payload.profile ? action.payload.profile : state.profile
            }
        case "REMOVE_GLOBAL_STATES":
            return {
                ...globalStates
            }
        default:
            return state
    }
}

const stateCounterReducer = {
    order: {
        UNPAID: 0,
        NEW_ORDER: 0,
        ON_PROCESS: 0,
        SENT: 0,
        DELIVERED: 0,
        PURCHASED_CONFIRM: 0,
    },
    home: {
        UNPAID: 0,
        NEW_ORDER: 0,
        ON_PROCESS: 0,
        SENT: 0,
        DELIVERED: 0,
        PURCHASED_CONFIRM: 0,
    }
}

const counterReducer = (state = stateCounterReducer, action) => {
    switch (action.type) {
        case "FETCH_ORDER_COUNTER":
            let newState = state
            if (action.counterType == 'home') {
                newState = {
                    ...state,
                    home: {
                        ...state.home,
                        ...action.payload,
                    },
                }
            }
            if (action.counterType == 'order') {
                newState = {
                    ...state,
                    order: {
                        ...state.order,
                        ...action.payload,
                    }
                }
            }
            return newState
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    GlobalStates: GlobalStatesReducer,
    ToastMessage: SetToastMessage,
    ErrorServer: SetErrorServer,
    Counter: counterReducer,
//    Login: Authentications,
//    Loading: FetchingToken,
//    SalesStatus: FetchSalesStatus,
//    ForgotPassword: FetchForgotPassword,
//    Product: ProductReducer,
    // Order: OrderReducer,
});

