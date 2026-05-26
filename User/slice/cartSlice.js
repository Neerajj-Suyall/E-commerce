import { createSlice } from "@reduxjs/toolkit";


const initialState = []



export const cartSlice = createSlice({
        name: 'carts',
        initialState,
        reducers: {
                //starting mai update hoga db sai
                cartValue: (state, action) => {
                        // console.log("action.payload", action.payload);
                        state = action.payload
                        // console.log("action.payload", state);
                        return state
                },
                //abhi api call kai add hone par idhar add hoga usestate sai 
                addReduxCart: (state, action) => {
                        // console.log("action.payload", action.payload);
                        state.push(action.payload)
                        return state
                },
                //abhi api call kai remove hone par idhar remove hoga usestate sai 
                removeReduxCart: (state, action) => {
                        let temp = state.filter((ittr) => ittr.productid !== action.payload) 
                        return temp
                },
                //abhi api call kai countupdate hone par idhar countupdate hoga usestate sai
                CountCart: (state, action) => {
                        // console.log(action.payload );
                        let value = action.payload
                        const temp =  state.map((ittr) => ittr.productid == action.payload.productid ? { ...ittr, ...value } : ittr) 
                        return temp
                },
                //jitna bhi cart items ko buy kar l.iya hai wo sabhi ko delete karane ka theka iss ni liya hai
                deleteBuyCart: (state, action) => {
                        console.log(action.payload);
                        const temp = state.reduce((initial, ittr) => {
                                        if (action.payload.some(e => e?.productid == ittr?.productid)) {
                                                return initial
                                        }
                                        return [...initial, ittr]
                                }, [])
                        return temp
                },
                //sabhi kuch delete
                userLogout: (state, action) => {
                        // console.log("userLogout", action.payload);
                        state = []
                        return state
                },

                //yai check kar kai batyeaga ki home mai jo random product show ho rahe hai wo items ka cart status kya hai (add to cart/ cart added)
                cartStatus: (state, action) => {
                        state.map((ittr) => {
                                if (ittr.productid == action.payload) {
                                        return ittr.status = !ittr.status
                                }
                        })
                },

        },


})

export const { addReduxCart, removeReduxCart, cartValue, CountCart, cartStatus, deleteBuyCart, userLogout } = cartSlice.actions

export default cartSlice.reducer