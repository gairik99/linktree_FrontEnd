import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        token: '',
        userName: '',
        imageurl: '',
        name: '',
        category: '',
        bio: '',
        bannerBackground: '',
        bannerColor: '',
        buttonAlignment: '',
        buttonStyle: '',
        buttonColor: '',
        buttonFontColor: '',
        theme: '',
        email: '',
        id: '',
    },
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = {
                token: '',
                userName: '',
                imageurl: '',
                name: '',
                category: '',
                bio: '',
                bannerBackground: '',
                bannerColor: '',
            };
            localStorage.removeItem('user');
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;