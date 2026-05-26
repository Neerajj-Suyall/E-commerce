import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slice/cartSlice.js";
import notificationReducer from "../slice/notificationSlice.js";

export const store = configureStore({
        reducer: {
                cart: productReducer,
                notification: notificationReducer,
        },
});

//  reducer: {
//     inputs: productReducer,
//   },


//  reducer: productReducer,  