import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: JSON.parse(localStorage.getItem('token') || 'null'),
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        clearToken: (state) => {
            state.token = null;
        }
    }
});

export const {setToken, clearToken} = authSlice.actions;

export default authSlice.reducer;