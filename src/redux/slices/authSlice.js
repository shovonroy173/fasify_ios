import { jwtDecode } from "jwt-decode";
import { baseApi } from "../baseApi.js";
import {
  setCredentials,
  setRes,
  setToken,
  setUser,
} from "../reducers/authReducer.js";

export const authSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("Login data:", data);
          // dispatch(setToken(data.refresh));
          dispatch(setUser(jwtDecode(data?.data?.accessToken)));
          dispatch(setToken(data?.data?.accessToken)); // ✅ store ACCESS token, not refresh
          dispatch(setRes(data?.data?.user));
          dispatch(
            setCredentials({
              accessToken: data?.data?.accessToken,
              user: jwtDecode(data?.data?.accessToken),
            })
          );
          // dispatch(setUser(jwtDecode(data.access)));// optional
        } catch (error) {
          // console.log(error);
        }
      },
    }),

    register: builder.mutation({
      query: (credentials) => {
        // console.log("LINE AT 41", credentials);

        return {
          url: "/users",
          method: "POST",
          body: credentials,
        };
      },
      // invalidatesTags: ['players'],
      // meta: {
      //   skipAuth: true, // ✅ This tells prepareHeaders to skip Authorization
      // },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("Login data:", data);
          // dispatch(setToken(data.refresh));
          dispatch(setUser(jwtDecode(data?.data?.accessToken)));
          dispatch(setToken(data?.data?.accessToken)); // ✅ store ACCESS token, not refresh
          dispatch(setRes(data?.data?.user));
          dispatch(
            setCredentials({
              accessToken: data?.data?.accessToken,
              user: jwtDecode(data?.data?.accessToken),
            })
          );
          // dispatch(setUser(jwtDecode(data.access))); // optional
        } catch (error) {
          // console.log(error);
        }
      },
    }),

    providerRegister: builder.mutation({
      query: (credentials) => {
        // console.log("LINE AT 74", credentials);

        return {
          url: "/users/partner",
          method: "POST",
          body: credentials,
        };
      },
      // invalidatesTags: ['players'],
      // meta: {
      //   skipAuth: true, // ✅ This tells prepareHeaders to skip Authorization
      // },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("Login data:", data);
          // dispatch(setToken(data.refresh));
          dispatch(setUser(jwtDecode(data?.data?.accessToken)));
          dispatch(setToken(data?.data?.accessToken)); // ✅ store ACCESS token, not refresh
          dispatch(setRes(data?.data?.user));
          dispatch(
            setCredentials({
              accessToken: data?.data?.accessToken,
              user: jwtDecode(data?.data?.accessToken),
            })
          );
          // dispatch(setUser(jwtDecode(data.access))); // optional
        } catch (error) {
          // console.log(error);
        }
      },
    }),

    logout: builder.mutation({
      query: (credentials) => ({
        url: "/auth/logout",
        method: "POST",
        body: credentials,
      }),
    }),

    forgotPasswordEmail: builder.mutation({
      query: (credentials) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: credentials,
      }),
    }),

    verifyCode: builder.mutation({
      query: (credentials) => {
        // console.log("🔐 verifyCode credentials:", credentials); // ✅ Log credentials here
        return {
          url: "/auth/verify-otp",
          method: "POST",
          body: credentials,
        };
      },
    }),

    emailVerify: builder.mutation({
      query: (credentials) => {
        // console.log("🔐 verifyCode credentials:", credentials); // ✅ Log credentials here
        return {
          url: "/users/verify-user",
          method: "POST",
          body: credentials,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("Login data:", data);
          // dispatch(setToken(data.refresh));
          dispatch(setUser(jwtDecode(data?.data?.accessToken)));
          dispatch(setToken(data?.data?.accessToken)); // ✅ store ACCESS token, not refresh
          dispatch(setRes(data?.data?.user));
          dispatch(
            setCredentials({
              accessToken: data?.data?.accessToken,
              user: jwtDecode(data?.data?.accessToken),
            })
          );
          // dispatch(setUser(jwtDecode(data.access))); // optional
        } catch (error) {
          // console.log(error);
        }
      },
    }),

    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: credentials,
      }),

      meta: {
        skipAuth: false, // ✅ This tells prepareHeaders to skip Authorization
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log('Login data:', data);
          // dispatch(setToken(data.refresh));
          dispatch(setUser(jwtDecode(data?.data?.accessToken)));
          dispatch(setToken(data?.data?.accessToken)); // ✅ store ACCESS token, not refresh
          // dispatch(setUser(jwtDecode(data.access))); // optional
          dispatch(setRes(data?.data?.user));

          dispatch(
            setCredentials({
              accessToken: data?.data?.accessToken,
              user: jwtDecode(data?.data?.accessToken),
            })
          );
        } catch (error) {
          // console.log(error);
        }
      },
    }),

    getProviderProfile: builder.query({
      query: () => "/users/my-profile",
      providesTags: ["ProviderProfile"],
      meta: {
        skipAuth: false, // or true if you want to skip setting the Authorization header
      },
    }),

    updateProfile: builder.mutation({
      query: (credentials) => {
        // console.log("LINE AT 112", credentials);

        return {
          url: "/users/update",
          method: "PATCH",
          body: credentials,
        };
      },
      invalidatesTags: ["ProviderProfile"],
      meta: {
        skipAuth: false,
      },
    }),

    getSingleUser: builder.query({
      query: (id) => {
        // console.log("LINE AT 111", id);

        return `/users/${id}`;
      },
      meta: {
        skipAuth: false, // or true if you want to skip setting the Authorization header
      },
    }),

    deleteUserAccount: builder.mutation({
      query: (credentials) => ({
        url: "/users/my-account",
        method: "PATCH",
        // body: credentials, // optional, DELETE usually doesn’t need a body
      }),
      meta: {
        skipAuth: false, // or true if you want to skip setting the Authorization header
      },
    }),

    getPrivacyPolicy: builder.query({
      query: () => `/policy`,
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),

    getTerms: builder.query({
      query: () => `/terms-conditions`,
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),

    getAbout: builder.query({
      query: () => `/settings/about`,
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),

    sendNotification: builder.mutation({
      query: ({ id, ...credentials }) => {
        // console.log(
        //   "🔐 sendNotification credentials:",
        //   credentials,
        //   "USER ID 157",
        //   id
        // ); // ✅ Log credentials here

        return {
          url: `/notifications/send-notification/${id}`,
          method: "POST",
          body: credentials,
        };
      },
      meta: {
        skipAuth: false, // or true if you want to skip setting the Authorization header
      },
    }),

    getNotifications: builder.query({
      query: () => `/notifications/my-notifications`,
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),

    getAllAdmins: builder.query({
      query: () => `/users/admins`,
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),

    // payment: builder.mutation({
    //   query: ({ id, type }) => {
    //     console.log(
    //       '🔐 sendNotification credentials:',

    //       'USER ID 157',
    //       'id',
    //       id,
    //       'Hotel',
    //       type,
    //       `/payments/create-payment-intent/${type}/${id}`,
    //     ); // ✅ Log credentials here

    //     return {
    //       url: `/payments/create-payment-intent/${type}/${id}`,
    //       method: 'POST',
    //       // body: credentials,
    //     };
    //   },
    //   meta: {
    //     skipAuth: false, // or true if you want to skip setting the Authorization header
    //   },
    // }),
    payment: builder.mutation({
      query: ({ id, type }) => {
        // console.log(
        //   "🔐 sendNotification credentials:",

        //   "USER ID 157",
        //   "id",
        //   id,
        //   "Hotel",
        //   type,
        //   `/payments/create-stripe-checkout-session-website/${type}/${id}`
        // ); // ✅ Log credentials here

        return {
          url: `/payments/create-stripe-checkout-session-website/${type}/${id}`,
          method: "POST",
          // body: credentials,
        };
      },
      meta: {
        skipAuth: false, // or true if you want to skip setting the Authorization header
      },
    }),

    payStackPayment: builder.mutation({
      query: ({ id, type, ...credentials }) => {
        // console.log(
        //   "🔐 sendNotification credentials:",

        //   "USER ID 157",
        //   "id",
        //   id,
        //   "Hotel",
        //   type,
        //   `/payments/create-checkout-session-paystack/${type}/${id}`,
        //   credentials
        // ); // ✅ Log credentials here

        return {
          url: `/payments/create-checkout-session-paystack/${type}/${id}`,
          method: "POST",
          body: credentials,
        };
      },
      // invalidatesTags: ['BookedItems'],
      meta: {
        skipAuth: false, // or true if you want to skip setting the Authorization header
      },
    }),

    payStackPaymentChargeCard: builder.mutation({
      query: (credentials) => {
        // console.log(
        //   "🔐 sendNotification credentials:",

        //   "USER ID 157",
        //   "id",
        //   // id,
        //   // 'Hotel',
        //   // type,
        //   // `/payments/create-checkout-session-paystack/${type}/${id}`,
        //   credentials
        // ); // ✅ Log credentials here

        return {
          url: `/payments/charge-card`,
          method: "POST",
          body: credentials,
        };
      },
      invalidatesTags: ["BookedItems"],
      meta: {
        skipAuth: false, // or true if you want to skip setting the Authorization header
      },
    }),

    paymentOnboarding: builder.mutation({
      query: () => {
        // console.log("🔐 payment hit:"); // ✅ Log credentials here

        return {
          url: `/payments/stripe-account-onboarding`,
          method: "POST",
          // body: credentials,
        };
      },
      meta: {
        skipAuth: false, // or true if you want to skip setting the Authorization header
      },
    }),

    paymentPaystackOnboarding: builder.mutation({
      query: () => {
        // console.log("🔐 payment hit:"); // ✅ Log credentials here

        return {
          url: `/payments/paystack-account-sub-account`,
          method: "POST",
          // body: credentials,
        };
      },
      meta: {
        skipAuth: false, // or true if you want to skip setting the Authorization header
      },
    }),

    sendSupport: builder.mutation({
      query: (credentials) => {
        // console.log("LINE AT 292", credentials);

        return {
          url: "/supports",
          method: "POST",
          body: credentials,
        };
      },
      invalidatesTags: ["CreateSupport"],
      meta: {
        skipAuth: true, // ✅ This tells prepareHeaders to skip Authorization
      },
    }),

    getMySupport: builder.query({
      query: () => {
        // console.log("LINE AT 308");

        return `/messages/support-my-channel`;
      },
      providesTags: ["CreateSupport"],
      meta: {
        skipAuth: false,
      },
    }),

    getFinanceUser: builder.query({
      query: (id) => {
        // console.log("LINE AT 111", id);

        return `/finances/user/${id}`;
      },
      meta: {
        skipAuth: false, // or true if you want to skip setting the Authorization header
      },
    }),

    socialLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/social-login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log('Login data:', data);
          // dispatch(setToken(data.refresh));
          dispatch(setUser(jwtDecode(data?.data?.accessToken)));
          dispatch(setToken(data?.data?.accessToken)); // ✅ store ACCESS token, not refresh
          // dispatch(setUser(jwtDecode(data.access))); // optional
          dispatch(setRes(data?.data?.user));

          dispatch(
            setCredentials({
              accessToken: data?.data?.accessToken,
              user: jwtDecode(data?.data?.accessToken),
            })
          );
        } catch (error) {
          // console.log(error);
        }
      },
    }),

    getAllStaticsHotel: builder.query({
      query: () => `/statistics/partner-total-earnings-hotel`,
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),

    getAllStaticsSecurity: builder.query({
      query: () => `/statistics/partner-total-earnings-security`,
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),
    getAllStaticsCar: builder.query({
      query: () => `/statistics/partner-total-earnings-car`,
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),
    getAllStaticsAttraction: builder.query({
      query: () => `/statistics/partner-total-earnings-attraction`,
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),

    phoneVerify: builder.mutation({
      query: (credentials) => {
        // console.log("🔐 verifyCode credentials:", credentials); // ✅ Log credentials here
        return {
          url: "/phone/send-otp",
          method: "POST",
          body: credentials,
        };
      },
      meta: {
        skipAuth: false, // ✅ This tells prepareHeaders to skip Authorization
      },
    }),
    phoneOTPVerify: builder.mutation({
      query: (credentials) => {
        // console.log("🔐 verifyCode credentials:", credentials); // ✅ Log credentials here
        return {
          url: "/phone/verify-otp",
          method: "POST",
          body: credentials,
        };
      },
      meta: {
        skipAuth: false, // ✅ This tells prepareHeaders to skip Authorization
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordEmailMutation,
  useResetPasswordMutation,
  useVerifyCodeMutation,

  useGetProviderProfileQuery,

  useUpdateProfileMutation,

  useGetSingleUserQuery,

  useDeleteUserAccountMutation,

  useGetPrivacyPolicyQuery,

  useGetTermsQuery,

  useGetAboutQuery,

  useSendNotificationMutation,

  useGetNotificationsQuery,

  useEmailVerifyMutation,

  useGetAllAdminsQuery,

  usePaymentMutation,

  usePayStackPaymentMutation,

  usePaymentOnboardingMutation,

  usePaymentPaystackOnboardingMutation,

  useSendSupportMutation,

  useGetMySupportQuery,

  useGetFinanceUserQuery,

  useSocialLoginMutation,

  usePayStackPaymentChargeCardMutation,

  useGetAllStaticsHotelQuery,
  useGetAllStaticsSecurityQuery,
  useGetAllStaticsCarQuery,
  useGetAllStaticsAttractionQuery,
  usePhoneVerifyMutation,
  usePhoneOTPVerifyMutation,

  useProviderRegisterMutation,
} = authSlice;
