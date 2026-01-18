import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    res: null,
    fcmToken: null, // ✅ add this
    isPhoneVerified: false,
    phone:null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;

    },
    setRes: (state, action) => {
      state.res = action.payload;
    },
    // setPlayerType: (state, action) => {
    //   state.player_type = action.payload;
    // },
    // logout: (state,action)=>{
    //     state.user = null;
    //     state.token = null;
    // }
    setPhoneVerified: (state, action) => {
      state.isPhoneVerified = action.payload;
    },
     setPhone: (state, action) => {
      state.phone = action.payload;
    },

    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.user = user;
      state.isAuthenticated = true;

      // Persist to AsyncStorage
      AsyncStorage.setItem('accessToken', accessToken);
      if (user) {
        AsyncStorage.setItem('user', JSON.stringify(user));
      }
    },
    setFCMToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    clearAuth: state => {
      state.token = null;
      state.user = null;
      // state.player_type = null;
    },
  },
});

export const { setToken, setUser, clearAuth, setFCMToken, setRes , setCredentials, setPhoneVerified , setPhone} =
  authReducer.actions;

export default authReducer.reducer;
