import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toastr } from '../../utils/toastr';
import { serverURL } from '../../config';
import axios from 'axios';
import { isEmpty } from '../../utils';

const initialState = {
    isAuthenticated: false,
    userInfo: {},
    userList: [],
    activeUser: 0,
    errors: {},
    redirect: false,
}

export const setUserRegister = createAsyncThunk(
    'auth/setUserRegister',
    async (param) => {
        try {
            const res = await axios.post(serverURL + '/api/user/clientregister', param);
            const data = await res.data;
            console.log('register :>> ', data);
            if (!data.status) {
                toastr.success("Successfully registered!");
            }
            return data;
        }
        catch (error) {

        }
    }
)   

export const setUserInformation = createAsyncThunk(
    'auth/setUserInformation',
    async (param) => {
        try {
            const res = await axios.post(serverURL + '/api/user/clientlogin', param);
            const data = await res.data;
            console.log("setuserinformationdata: ", data);
            if (data.status) {
                toastr.warning(data.message, 0);
                return {}
            } else {
                toastr.success(`Welcome ${data.user.firstname} ${data.user.lastname}`, 0);
                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('user_id', data.user.id);
                window.localStorage.setItem('user_email', data.user.email);
                axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token');
                return data.user;
            }

        } catch (error) {
            return {};
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async (param) => {
        try {
            axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token');
            const res = await axios.get(serverURL + '/api/user/current', param);
            const data = await res.data;
            if (data.status) {
                if (!isEmpty(data.message))
                    toastr.warning(data.message);
                return {}
            } else {
                return data.user;
            }

        } catch (error) {
            return {};
        }
    }
)


export const getUserList = createAsyncThunk(
    'auth/getUserList', 
    async(param) => {
        try{
            const res = await axios.post(serverURL + '/api/user/userlist', param);
            const data = await res.data;
            console.log("userlist", data);
            return data.users;
        }catch(err){

        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setErrors: (state, action) => { state.errors = action.payload },
        setRedirect: (state, action) => { state.redirect = action.payload },
        setTheme: (state, action) => { state.theme = action.payload },
        setActiveUser: (state, action) => { state.activeUser = action.payload.activeUser },
        setUser: (state, action) => {
            console.log('setUser occured', action.payload);
            state.userInfo = action.payload;
            state.isAuthenticated = !isEmpty(action.payload);
            axios.defaults.headers.common['Authorization'] = '';
            window.localStorage.setItem('token', '');
            window.localStorage.setItem('user_id', '');
            window.localStorage.setItem('role_name', '');
            window.localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setUserRegister.fulfilled, (state, action) => {
            const data = action.payload;
            console.log('action.payload :>> ', data);
            if (data.status) {
                state.errors = data.errors;
            }
            else {
                state.errors = {};
                state.redirect = true;
            }
        })
        builder.addCase(setUserInformation.fulfilled, (state, action) => {
            const data = action.payload;
            state.userInfo = data;
            console.log('storedata :>> ', data.userList);
            state.isAuthenticated = !isEmpty(action.payload);
            if (state.isAuthenticated) {
                state.redirect = true;
                state.errors = {};
            }
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.userInfo = action.payload;
            state.isAuthenticated = !isEmpty(action.payload);
            if (isEmpty(action.payload) && window.location.pathname !== '/member/auth/signin') {
                axios.defaults.headers.common['Authorization'] = '';
                window.localStorage.setItem('token', '');
            }
        })
        builder.addCase(getUserList.fulfilled, (state, action) => {
            const data = action.payload;
            state.userList = data;
        })
    }
})

export const { setUser, setErrors, setRedirect, setActiveUser } = authSlice.actions;

export default authSlice.reducer;

