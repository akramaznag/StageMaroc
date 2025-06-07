import {configureStore} from "@reduxjs/toolkit";
import userReducer  from "./UserSlice"
const store = configureStore({
    reducer:{
        User:userReducer,
    }
})
export default store;