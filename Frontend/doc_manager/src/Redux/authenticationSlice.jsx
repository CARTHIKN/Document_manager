import { createSlice } from "@reduxjs/toolkit";



export const authenticationSlice = createSlice(
    {
        name :'authentication_user',
        initialState : {
            username : null,
            isAuthenticated : false
        },

        reducers : {
            set_Authentication : (state, action) => {
                state.username = action.payload.username,
                state.isAuthenticated = action.payload.isAuthenticated
                
            }
        }
    }
)



export const {set_Authentication} = authenticationSlice.actions
export default authenticationSlice.reducer