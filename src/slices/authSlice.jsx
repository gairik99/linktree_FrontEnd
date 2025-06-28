import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
    try {
        return (
            JSON.parse(localStorage.getItem('user')) || {
                token: '',
                userName: '',
                imageurl: '',
                name: '',
                category: '',
                bio: '',
                bannerBackground: '',
                bannerColor: '',
            }
        );
    } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return {
            token: '',
            userName: '',
        };
    }
};

const initialState = {
    user: getInitialUser(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
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