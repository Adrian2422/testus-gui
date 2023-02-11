import {UserEntity} from '../api/openapi';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
    user: UserEntity | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        LOG_IN: (state, action: PayloadAction<AuthState>) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        LOG_OUT: (state, action: PayloadAction<AuthState>) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { LOG_IN, LOG_OUT } = authSlice.actions;
export  default authSlice.reducer;
