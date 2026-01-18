import { baseApi } from '../../baseApi.js';

export const providerAttractionSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    createAttraction: builder.mutation({
      query: credentials => {
        // console.log('LINEN AT 7', credentials);

        return {
          url: '/attractions',
          method: 'POST',
          body: credentials,
        };
      },
      invalidatesTags: ['CreateProviderAttraction'],
      meta: {
        skipAuth: false, // ✅ This tells prepareHeaders to skip Authorization
      },
    }),

    createAttractionListing: builder.mutation({
      query: ({ id, ...credentials }) => {
        // console.log('LINE AT 19', id, credentials?.finalPayload);

        return {
          url: `/attractions/appeal/${id}`,
          method: 'POST',
          body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['CreateProviderAttractionListing'],
      meta: {
        skipAuth: false, // ✅ This tells prepareHeaders to skip Authorization
      },
    }),

    updateProviderAttractionListing: builder.mutation({
      query: ({ id, ...credentials }) => {
        // console.log('Credentials being sent:', id, credentials); // ✅ Log here
        // const idEntry = credentials?._parts?.find(([key]) => key === 'id');
        // const id = idEntry ? idEntry[1] : null;
        // console.log('Updating hotel with id:', id, credentials?.finalPayload);
        return {
          url: `/attractions/appeal/${id}`,
          method: 'PATCH',
          body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['UpdateProviderAttractionListing'],
      meta: {
        skipAuth: false,
      },
    }),

    getProviderAttraction: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/attractions/partner?page=${page}`,
      providesTags: [
        'CreateProviderAttraction',
        'UpdateProviderSingleAttraction',

      ],
      meta: {
        skipAuth: false,
      },
    }),

    getProviderAttractionListing: builder.query({
      query: ({ page = 1, limit = 10, id } = {}) =>
        // console.log("LINE AT 48" , id);

        `/attractions/partner-appeals/${id}`,
      providesTags: [
        'CreateProviderAttraction',
        'CreateProviderAttractionListing',
        'UpdateProviderAttractionListing'
      ],
      meta: {
        skipAuth: false,
      },
    }),

    updateProviderAttraction: builder.mutation({
      query: ({id, ...credentials}) => {
        // console.log('Credentials being sent:',id,  credentials.finalPayload); // ✅ Log here

        return {
          url: `/attractions/${id}`,
          method: 'PATCH',
          body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ['UpdateProviderSingleAttraction'],
      meta: {
        skipAuth: false,
      },
    }),

    getProviderAttractionBooking: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => `/attraction-booking`,
      // providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateAttractionMutation,
  useCreateAttractionListingMutation,
  useGetProviderAttractionQuery,
  useGetProviderAttractionListingQuery,
  useUpdateProviderAttractionMutation,
  useUpdateProviderAttractionListingMutation,
  useGetProviderAttractionBookingQuery,
} = providerAttractionSlice;
