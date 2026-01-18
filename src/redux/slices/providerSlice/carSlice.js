import { baseApi } from '../../baseApi.js';

export const providerCarSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    createCar: builder.mutation({
      query: credentials => ({
        url: '/car-rentals',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['CreateProviderCar'],
      meta: {
        skipAuth: false, // ✅ This tells prepareHeaders to skip Authorization
      },
    }),

    createCarListing: builder.mutation({
      query: ({ id, ...credentials }) => {
        // console.log('LINE AT 19', id, credentials?.finalPayload);

        return {
          url: `/car-rentals/car/${id}`,
          method: 'POST',
          body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['CreateProviderCarListing'],
      meta: {
        skipAuth: false, // ✅ This tells prepareHeaders to skip Authorization
      },
    }),

    getProviderCar: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/car-rentals/partner?page=${page}`,
      providesTags: ['CreateProviderCar', 'UpdateProviderSingleBusiness'],
      meta: {
        skipAuth: false,
      },
    }),

    getProviderCarListing: builder.query({
      query: ({ page = 1, limit = 10, id } = {}) =>
        `/car-rentals/cars-partner/${id}`,
      providesTags: ['CreateProviderCarListing', 'UpdateProviderSingleListing'],
      meta: {
        skipAuth: false,
      },
    }),

    updateProviderCar: builder.mutation({
      query: ({ id, ...credentials }) => {
        // console.log('Credentials being sent:', credentials?.finalPayload); // ✅ Log here
        // const idEntry = credentials?._parts?.find(([key]) => key === 'id');
        // const id = idEntry ? idEntry[1] : null;
        // console.log('Updating Security with id:', id);
        return {
          url: `/car-rentals/${id}`,
          method: 'PATCH',
          body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['UpdateProviderSingleBusiness'],
      meta: {
        skipAuth: false,
      },
    }),

    updateProviderCarListing: builder.mutation({
      query: ({ id, ...credentials }) => {
        // console.log('Credentials being sent:',id, credentials?.finalPayload); // ✅ Log here
        // const idEntry = credentials?._parts?.find(([key]) => key === 'id');
        // const id = idEntry ? idEntry[1] : null;
        // console.log('Updating Security with id:', id);
        return {
          url: `/car-rentals/car/${id}`,
          method: 'PATCH',
          body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['UpdateProviderSingleListing'],
      meta: {
        skipAuth: false,
      },
    }),

    getProviderCarBooking: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => `/car-booking`,
      // providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateCarMutation,
  useCreateCarListingMutation,
  useGetProviderCarQuery,
  useGetProviderCarListingQuery,
  useUpdateProviderCarMutation,
  useUpdateProviderCarListingMutation,
  useGetProviderCarBookingQuery,
} = providerCarSlice;
