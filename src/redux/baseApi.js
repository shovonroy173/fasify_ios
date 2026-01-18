// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

// export const baseApi = createApi({
//   reducerPath: 'baseApi',
//   // baseQuery: fetchBaseQuery({ baseUrl: 'https://basketball-52yg.onrender.com' }),
//   // baseQuery: fetchBaseQuery({ baseUrl: 'http://10.0.60.53:5000/api/v1' }),
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://timothy-backend.vercel.app/api/v1' }),

//   endpoints: () => ({}),
// });

// export const baseApi = createApi({
//   reducerPath: 'baseApi',
//   baseQuery: fetchBaseQuery({baseUrl: 'http://10.0.60.53:8000'}),
//   prepareHeaders: (headers, {getState}) => {
//     const token = getState().auth.token;
//     console.log('LINE AT 21 ', token);

//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },

//   endpoints: () => ({}),
//   tagTypes: ['players'],
// });

// export const baseApi = createApi({
//   reducerPath: 'baseApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://basketball-52yg.onrender.com',
//     prepareHeaders: (headers, {getState, endpoint}) => {
//       const skipAuth = baseApi.endpoints[endpoint]?.definition?.meta?.skipAuth;

//       if (!skipAuth) {
//         const token = getState().auth.token;
//         console.log('LINE AT 21 — token from store:', token);
//         if (token) {
//           headers.set('Authorization', `Bearer ${token}`);
//           console.log('Authorization header:', headers.get('Authorization'));
//         } else {
//           console.log('❌ No token found in Redux');
//         }
//       } else {
//         console.log(`🔓 Skipping Authorization for endpoint: ${endpoint}`);
//       }

//       return headers;
//     },
//   }),
//   endpoints: () => ({}),
//   tagTypes: ['players'],
// });

// export const baseApi = createApi({
//   reducerPath: 'baseApi',
//   // baseQuery: fetchBaseQuery({
//   //   // baseUrl: 'https://basketball-52yg.onrender.com',
//   //   // baseUrl: 'https://bbe96cdaf568.ngrok-free.app',
//   //   // baseUrl: 'http://10.10.7.76:8001',

//   //   }),
//   tagTypes: [
//     'ProviderProfile',
//     'CreateProviderHotels',
//     'UpdateProviderSingleHotel',
//     'CreateProviderSecurity',
//     'UpdateProviderSingleSecurity',
//     'CreateProviderCar',
//     'UpdateProviderSingleBusiness',
//     'UpdateProviderSingleListing',
//     'CreateProviderAttraction',
//     'UpdateProviderSingleAttraction',

//     'CreateBookingHotels',
//     'AddFavouriteHotel',

//     'CreateBookingSecurity',

//     'CreateBookingAttraction',

//     'CreateBookingCar',

//     'CancelBookingHotels',

//     'CancelBookingSecurity',

//     'BookedItems',

//     'CreateSupport',

//     'CancelBookingCars',

//     'CancelBookingAttraction',

//     'CreateProviderHotelRoom',

//     'CreateProviderSecurityListing',

//     'CreateProviderCarListing',

//     'CreateProviderAttractionListing',
//     'UpdateProviderAttractionListing',
//     'UpdateProviderSecurityGuard',
//   ],

//   baseQuery: fetchBaseQuery({
//     // baseUrl: 'http://10.10.20.19:5000/api/v1',
//     baseUrl: 'https://timothy-backend.onrender.com/api/v1',
//     // baseUrl:
//     // 'https://courses-mae-equilibrium-duo.trycloudflare.com/api/v1',
//     // baseUrl:'https://worthy-alternate-weekly-decided.trycloudflare.com/api/v1',
//     prepareHeaders: (headers, { getState, endpoint }) => {
//       const skipAuth = baseApi.endpoints[endpoint]?.definition?.meta?.skipAuth;
//       // console.log(skipAuth);

//       if (!skipAuth) {
//         const token = getState().auth.token;
//         // console.log('LINE AT 21 — token from store:', token);
//         if (token) {
//           headers.set('Authorization', `${token}`);
//           // console.log('Authorization header:', headers.get('Authorization'));
//         } else {
//           console.log('❌ No token found in Redux');
//         }
//       } else {
//         console.log(`🔓 Skipping Authorization for endpoint: ${endpoint}`);
//       }

//       return headers;
//     },
//   }),
//   endpoints: () => ({}),
// });

export const baseApi = createApi({
  reducerPath: 'baseApi',
  // baseQuery: fetchBaseQuery({
  //   // baseUrl: 'https://basketball-52yg.onrender.com',
  //   // baseUrl: 'https://bbe96cdaf568.ngrok-free.app',
  //   // baseUrl: 'http://10.10.7.76:8001',

  //   }),
  tagTypes: [
    'ProviderProfile',
    'CreateProviderHotels',
    'UpdateProviderSingleHotel',
    'CreateProviderSecurity',
    'UpdateProviderSingleSecurity',
    'CreateProviderCar',
    'UpdateProviderSingleBusiness',
    'UpdateProviderSingleListing',
    'CreateProviderAttraction',
    'UpdateProviderSingleAttraction',

    'CreateBookingHotels',
    'AddFavouriteHotel',

    'CreateBookingSecurity',

    'CreateBookingAttraction',

    'CreateBookingCar',

    'CancelBookingHotels',

    'CancelBookingSecurity',

    'BookedItems',

    'CreateSupport',

    'CancelBookingCars',

    'CancelBookingAttraction',

    'CreateProviderHotelRoom',

    'CreateProviderSecurityListing',

    'CreateProviderCarListing',

    'CreateProviderAttractionListing',
    'UpdateProviderAttractionListing',
    'UpdateProviderSecurityGuard',
  ],

  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
