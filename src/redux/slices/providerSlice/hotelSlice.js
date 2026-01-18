import { baseApi } from "../../baseApi.js";

export const providerHotelSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createHotel: builder.mutation({
      query: (credentials) => {
        console.log("LINE AT 16", credentials);
        return {
          url: "/hotels",
          method: "POST",
          body: credentials,
        };
      },
      invalidatesTags: ["CreateProviderHotels"],
      meta: {
        skipAuth: false, // ✅ This tells prepareHeaders to skip Authorization
      },
    }),

    createHotelRoom: builder.mutation({
      query: ({ id, ...credentials }) => {
        // console.log("LINE AT 19", id, credentials?.finalPayload);

        return {
          url: `/hotels/room/${id}`,
          method: "POST",
          body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ["CreateProviderHotelRoom"],
      meta: {
        skipAuth: false, // ✅ This tells prepareHeaders to skip Authorization
      },
    }),

    getProviderHotels: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => `/hotels/partner-hotels`,
      providesTags: ["CreateProviderHotels", "UpdateProviderSingleHotel"],
      meta: {
        skipAuth: false,
      },
    }),
    getProviderHotelRooms: builder.query({
      query: ({ page = 1, limit = 10, id } = {}) =>
        `/hotels/partner-rooms/${id}`,
      providesTags: ["CreateProviderHotelRoom", "UpdateProviderSingleHotel"],
      meta: {
        skipAuth: false,
      },
    }),

    getProviderHotelBooking: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => `/hotel-booking`,
      // providesTags: ['CreateProviderHotels', 'UpdateProviderSingleHotel'],
      meta: {
        skipAuth: false,
      },
    }),

    updateProviderHotel: builder.mutation({
      query: (credentials) => {
        // console.log("Credentials being sent:", credentials); // ✅ Log here
        const idEntry = credentials?._parts?.find(([key]) => key === "id");
        const id = idEntry ? idEntry[1] : null;
        // console.log('Updating hotel with id:', id);
        return {
          url: `/hotels/${id}`,
          method: "PATCH",
          body: credentials,
        };
      },
      invalidatesTags: ["UpdateProviderSingleHotel"],
      meta: {
        skipAuth: false,
      },
    }),

    updateProviderHotelRoom: builder.mutation({
      query: ({ id, ...credentials }) => {
        // console.log("Credentials being sent:", id, credentials); // ✅ Log here
        // const idEntry = credentials?._parts?.find(([key]) => key === 'id');
        // const id = idEntry ? idEntry[1] : null;
        // console.log('Updating hotel with id:', id);
        return {
          url: `/hotels/room/${id}`,
          method: "PATCH",
          body: credentials?.finalPayload,
        };
      },
      invalidatesTags: ["UpdateProviderSingleHotel"],
      meta: {
        skipAuth: false,
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateHotelMutation,
  useCreateHotelRoomMutation,
  useGetProviderHotelsQuery,
  useGetProviderHotelRoomsQuery,
  useUpdateProviderHotelMutation,
  useUpdateProviderHotelRoomMutation,
  useGetProviderHotelBookingQuery,
} = providerHotelSlice;
