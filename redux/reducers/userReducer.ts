import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import { getUser, loginUser, logoutUser, registerUser } from '../thunks/userThunks';

interface UserState {
    user: User | undefined,
    loading: boolean,
    error: string | undefined
}

const initialState: UserState = {
    user: undefined,
    loading: false,
    error: undefined
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload
        },
        setError(state, action: PayloadAction<null>) {
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = undefined;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = undefined;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = "An Error Occured. Please try again later!";
                }
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = undefined;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.user = undefined;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = "An Error Occured. Please try again later!";
                }
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = undefined;
            })
    }
})

export const {
    setUser,
    setError
} = userSlice.actions;
export default userSlice.reducer;