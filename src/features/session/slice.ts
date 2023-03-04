import {createSlice} from '@reduxjs/toolkit'

export const createSession = createSlice({
    name: 'createSession',
    initialState: {
        session: null,
    },
    reducers: {
        setSession: (state, action) => {
            state.session = action.payload;
        },
        clearSession: (state) => {
            state.session = null;
        }
    }
});

export const {setSession, clearSession} = createSession.actions;

export default createSession.reducer;