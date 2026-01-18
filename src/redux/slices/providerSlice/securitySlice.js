import { baseApi } from '../../baseApi.js';

export const providerSecuritySlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    createSecurity: builder.mutation({
      query: credentials => {
        // console.log('LINE AT 7', credentials);

        return {
          url: '/security-protocols',
          method: 'POST',
          body: credentials,
        };
      },
      invalidatesTags: ['CreateProviderSecurity'],
      meta: {
        skipAuth: false, // ✅ This tells prepareHeaders to skip Authorization
      },
    }),

    createSecurityListing: builder.mutation({
      query: ({ id, ...credentials }) => {
        // console.log('LINE AT 19', id, credentials?.finalPayload);

        return {
          url: `/security-protocols/security-guard-type/${id}`,
          method: 'POST',
          body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['CreateProviderSecurityListing'],
      meta: {
        skipAuth: false, // ✅ This tells prepareHeaders to skip Authorization
      },
    }),

    getProviderSecurity: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/security-protocols/partner?page=${page}`,
      providesTags: ['CreateProviderSecurity', 'UpdateProviderSingleSecurity'],
      meta: {
        skipAuth: false,
      },
    }),

    getProviderSecurityListing: builder.query({
      query: ({ page = 1, limit = 10, id } = {}) =>
        // console.log("LINE AT 48" , id);

        `/security-protocols/partner-security-guard/${id}`,
      providesTags: [
        'CreateProviderSecurity',
        'CreateProviderSecurityListing',
        'UpdateProviderSecurityGuard',
      ],
      meta: {
        skipAuth: false,
      },
    }),

    updateProviderSecurity: builder.mutation({
      query: credentials => {
        // console.log('Credentials being sent:', credentials); // ✅ Log here
        const idEntry = credentials?._parts?.find(([key]) => key === 'id');
        const id = idEntry ? idEntry[1] : null;
        // console.log('Updating Security with id:', id);
        return {
          url: `/security-protocols/${id}`,
          method: 'PATCH',
          body: credentials,
        };
      },
      invalidatesTags: ['UpdateProviderSingleSecurity'],
      meta: {
        skipAuth: false,
      },
    }),

    updateProviderSecurityListing: builder.mutation({
      query: ({ id, ...credentials }) => {
        console.log('Credentials being sent:', id, credentials); // ✅ Log here
        // const idEntry = credentials?._parts?.find(([key]) => key === 'id');
        // const id = idEntry ? idEntry[1] : null;
        // console.log('Updating hotel with id:', id);
        return {
          url: `/security-protocols/security-guard-type/${id}`,
          method: 'PATCH',
          body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['UpdateProviderSecurityGuard'],
      meta: {
        skipAuth: false,
      },
    }),

    getProviderSecurityBooking: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => `/security-booking`,
      // providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateSecurityMutation,
  useCreateSecurityListingMutation,
  useGetProviderSecurityQuery,
  useGetProviderSecurityListingQuery,
  useUpdateProviderSecurityMutation,
  useUpdateProviderSecurityListingMutation,
  useGetProviderSecurityBookingQuery,
} = providerSecuritySlice;
