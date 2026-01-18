import { baseApi } from '../../baseApi.js';

export const userHotelSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    // createBookingHotel: builder.mutation({
    //   query: ({ id, ...credentials }) => ({
    //     console.log(credentials);

    //     url: `/hotel-booking/${id}`,
    //     method: 'POST',
    //     body: credentials,
    //   }),
    //   invalidatesTags: ['CreateBookingHotels'],
    //   meta: { skipAuth: false },
    // }),

    createBookingHotel: builder.mutation({
      query: ({ hotelId, ...credentials }) => {
        console.log('Booking credentials 👉', credentials, hotelId);

        return {
          url: `/hotel-booking/${hotelId}`,
          method: 'POST',
          body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['CreateBookingHotels'],
      meta: { skipAuth: false },
    }),

    // getAllHotels: builder.query({
    //   query: ({ page = 1, limit = 10, searchTerm, ...filters } = {}) => {
    //     // console.log(filters);

    //     const paramsObj = { page, limit, ...filters };

    //     if (searchTerm && searchTerm.trim()) {
    //       paramsObj.searchTerm = searchTerm.trim();
    //     }

    //     const params = new URLSearchParams(paramsObj).toString();
    //     // console.log('LINE AT 64', params);

    //     return `/hotels?${params}`;
    //   },
    //   meta: { skipAuth: false },
    // }),

    getAllHotels: builder.query({
      query: ({ page = 1, limit = 10, searchTerm, ...filters } = {}) => {
        const paramsObj = {
          page: page.toString(),
          limit: limit.toString(),
        };

        // Add searchTerm only if it has meaningful content
        const trimmedSearchTerm = searchTerm?.trim();
        if (trimmedSearchTerm) {
          paramsObj.searchTerm = trimmedSearchTerm;
        }

        // Add other filters, removing empty values
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

        console.log('LINE AT 88', paramsObj);
        

        const params = new URLSearchParams(paramsObj).toString();
        return `/hotels?${params}`;
      },
      meta: { skipAuth: false },
    }),

    getPopularHotels: builder.query({
      query: ({ page = 1, limit = 10, searchTerm, ...filters } = {}) => {
        const paramsObj = { page, limit, ...filters };

        if (searchTerm && searchTerm.trim()) {
          paramsObj.searchTerm = searchTerm.trim();
        }

        const params = new URLSearchParams(paramsObj).toString();
        console.log('LINE AT 64', params);

        return `/hotels/popular?${params}`;
      },
      meta: {
        skipAuth: false,
      },
    }),

    getAllHotelBooking: builder.query({
      query: () => `/hotel-booking/my-bookings`,
      providesTags: ['CancelBookingHotels', 'BookedItems'],
      meta: {
        skipAuth: false,
      },
    }),

    getSingleHotel: builder.query({
      query: ({id}) => {
        console.log('LINE AT 70', id);
        return `/hotels/${id}`;
      },
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),
    addFavouriteHotel: builder.mutation({
      query: ({ hotelId }) => ({
        url: `/hotels/favorite/${hotelId}`,
        method: 'POST',
        // body: credentials,
      }),
      invalidatesTags: ['AddFavouriteHotel'],
      meta: { skipAuth: false },
    }),

    addReviewHotel: builder.mutation({
      query: reviewData => {
        // Accept a single object parameter
        console.log(
          'LINE AT 109',
          reviewData.roomId,
          reviewData.rating,
          reviewData.comment,
        );

        return {
          url: `/reviews/hotel`,
          method: 'POST',
          body: reviewData, // Pass the entire object as body
        };
      },
      // invalidatesTags: ['AddFavouriteHotel'],
      meta: { skipAuth: false },
    }),

    cancelBookingHotel: builder.mutation({
      query: ({ roomId, type, ...credentials }) => {
        console.log('Booking credentials 👉', credentials, roomId, type, `/payments/stripe-cancel-booking/${type}/${roomId}`);

        return {
          url: `/payments/stripe-cancel-booking/${type}/${roomId}`,
          method: 'POST',
          // body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['CancelBookingHotels'],
      meta: { skipAuth: false },
    }),

    cancelBookingPaystackHotel: builder.mutation({
      query: ({ roomId, type, ...credentials }) => {
        // console.log('Booking credentials 👉', credentials, roomId);

        return {
          url: `/payments/paystack-cancel-booking/${type}/${roomId}`,
          method: 'POST',
          // body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['CancelBookingHotels'],
      meta: { skipAuth: false },
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateBookingHotelMutation,
  useGetPopularHotelsQuery,
  useGetAllHotelsQuery,
  useAddFavouriteHotelMutation,
  //   useUpdateProviderHotelMutation,
  useGetAllHotelBookingQuery,
  useGetSingleHotelQuery,

  useAddReviewHotelMutation,

  useCancelBookingHotelMutation,

  useCancelBookingPaystackHotelMutation,
} = userHotelSlice;
