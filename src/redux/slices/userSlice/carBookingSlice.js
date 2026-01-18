import { baseApi } from '../../baseApi.js';

export const userCarSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    createBookingCar: builder.mutation({
      query: ({ carId, ...credentials }) => {
        console.log('Booking credentials 👉', credentials, carId);

        return {
          url: `/car-booking/${carId}`,
          method: 'POST',
          body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['CreateBookingCar'],
      meta: { skipAuth: false },
    }),

    // getAllHotels: builder.query({
    //   query: ({ page = 1, limit = 10 } = {}) => `/hotels?page=${page}`,
    //   //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
    //   meta: {
    //     skipAuth: false,
    //   },
    // }),

    getAllCar: builder.query({
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
        console.log('LINE AT car booking slice', params);

        return `/car-rentals/cars?${params}`;
      },
      meta: { skipAuth: false },
    }),

    getAllCarBooking: builder.query({
      query: () => `/car-booking/my-bookings`,
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),

    getAllCarPromoCode: builder.query({
      query: () => `/promo-codes`,
      //   providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),


    addReviewCar: builder.mutation({
      query: reviewData => {
        console.log(
          'LINE AT 109',
          reviewData.carId,
          reviewData.rating,
          reviewData.comment,
        );

        return {
          url: `/reviews/car`,
          method: 'POST',
          body: reviewData,
        };
      },
      // invalidatesTags: ['AddFavouriteHotel'],
      meta: { skipAuth: false },
    }),

    cancelBookingCar: builder.mutation({
      query: ({ carId, type, ...credentials }) => {
        return {
          url: `/payments/stripe-cancel-booking/${type}/${carId}`,
          method: 'POST',
          // body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['CancelBookingCars'],
      meta: { skipAuth: false },
    }),

    cancelBookingPaystackCar: builder.mutation({
      query: ({ carId, type, ...credentials }) => {
        console.log('LINE AT 119', carId, type);

        return {
          url: `/payments/paystack-cancel-booking/${type}/${carId}`,
          method: 'POST',
          // body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['CancelBookingCars'],
      meta: { skipAuth: false },
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateBookingCarMutation,
  //   useGetPopularCarQuery,
  useGetAllCarQuery,
  useGetAllCarBookingQuery,
  useGetAllCarPromoCodeQuery,

  useAddReviewCarMutation,
  //   useUpdateProviderHotelMutation,

  useCancelBookingCarMutation,
  useCancelBookingPaystackCarMutation,
} = userCarSlice;
