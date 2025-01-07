import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './ui-slice';
import cartReducer from './cart-slice';
import authReducer from './auth-slice';

const store = configureStore({
    reducer : {
        ui : uiReducer,
        cart : cartReducer,
        auth : authReducer,
    }
})

export default store;