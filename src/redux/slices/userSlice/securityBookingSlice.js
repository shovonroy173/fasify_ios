import { baseApi } from '../../baseApi.js';

export const userSecuritySlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    createBookingSecurity: builder.mutation({
      query: ({ securityId, ...credentials }) => {
        // console.log('Booking credentials 👉', credentials, securityId);

        return {
          url: `/security-booking/${securityId}`,
          method: 'POST',
          body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['CreateBookingSecurity'],
      meta: { skipAuth: false },
    }),

    // getAllHotels: builder.query({
    //   query: ({ page = 1, limit = 10 } = {}) => `/hotels?page=${page}`,
    //   //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
    //   meta: {
    //     skipAuth: false,
    //   },
    // }),

    getAllSecurity: builder.query({
      query: ({ page = 1, limit = 10, searchTerm, ...filters } = {}) => {
        // console.log(filters);

        const paramsObj = { page, limit, ...filters };

        if (searchTerm && searchTerm.trim()) {
          paramsObj.searchTerm = searchTerm.trim();
        }

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            // Handle date objects if needed
            if (value instanceof Date) {
              paramsObj[key] = value.toISOString();
            } else {
              paramsObj[key] = value.toString();
            }
          }
        });

        const params = new URLSearchParams(paramsObj).toString();
        console.log('LINE AT 64', params);

        return `/security-protocols/security-guard-app?${params}`;
      },
      meta: { skipAuth: false },
    }),

    getAllSecurityBooking: builder.query({
      query: () => `/security-booking/my-bookings`,
      providesTags: ['BookedItems'],
      meta: {
        skipAuth: false,
      },
    }),

    getAllSecurityByCategory: builder.query({
      query: () => `/security-protocols/grouped-by-category`,
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),

    getSecurityByPopular: builder.query({
      query: () => `/security-protocols/popular`,
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),

    getSingleSecurity: builder.query({
      query: id => {
        // console.log('LINE AT 70', id);
        return `/security-protocols/${id}`;
      },
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),

    addReviewSecurity: builder.mutation({
      query: reviewData => {
        console.log(
          'LINE AT 109',
          reviewData.security_GuardId,
          reviewData.rating,
          reviewData.comment,
        );

        return {
          url: `/reviews/security`,
          method: 'POST',
          body: reviewData,
        };
      },
      // invalidatesTags: ['AddFavouriteHotel'],
      meta: { skipAuth: false },
    }),

    cancelBookingSecurity: builder.mutation({
      query: ({ securityId, type, ...credentials }) => {
        return {
          url: `/payments/stripe-cancel-booking/${type}/${securityId}`,
          method: 'POST',
          // body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['CancelBookingSecurity'],
      meta: { skipAuth: false },
    }),

    cancelBookingPaystackSecurity: builder.mutation({
      query: ({ securityId, type, ...credentials }) => {
        console.log('LINE AT 151', securityId, type);

        return {
          url: `/payments/paystack-cancel-booking/${type}/${securityId}`,
          method: 'POST',
          // body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['CancelBookingSecurity'],
      meta: { skipAuth: false },
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateBookingSecurityMutation,
  //   useGetPopularSecurityQuery,
  useGetAllSecurityQuery,
  //   useUpdateProviderHotelMutation,
  useGetAllSecurityBookingQuery,
  useGetSingleSecurityQuery,

  useGetAllSecurityByCategoryQuery,

  useGetSecurityByPopularQuery,

  useAddReviewSecurityMutation,

  useCancelBookingSecurityMutation,
  useCancelBookingPaystackSecurityMutation,
} = userSecuritySlice;
