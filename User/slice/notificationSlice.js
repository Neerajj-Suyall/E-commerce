import { createSlice } from "@reduxjs/toolkit";


const initialState = []



export const notificationSlice = createSlice({
        name: 'notification',
        initialState,
        reducers: {
                //usernotificion for 3 second timer based
                userNotification: (state, action) => {
                        const temp = (state.length >= 1) ? [...state, action.payload] : [action.payload]
                        return temp
                },
                allNotificationEnd: (state, action) => {
                        const temp = []
                        return temp
                },
                notificationKill: (state, action) => {
                        const temp = state.filter((e, i) => i != 0)
                        return temp
                },
                oneNotification: (state, action) => {
                        const temp = state.filter((e, i) => i != action.payload)
                        return temp
                },
                autoKillNotification: (state, action) => {
                        console.log("calling to hide noti..");
                        
                        setTimeout(() => {
                                const temp = state.filter((e, i) => i > 0)
                                return temp
                        }, 3000)

                },

        },
})

export const { userNotification, allNotificationEnd, notificationKill, oneNotification, autoKillNotification } = notificationSlice.actions

export default notificationSlice.reducer