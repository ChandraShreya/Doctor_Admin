import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/endpoints/endpoints";
import { ILocation, ILocationPayload, ILocationState } from "@/typescript/location.interface";


export const createLocation = createAsyncThunk<
  ILocation,
  ILocationPayload,
  { rejectValue: string }
>(
  "createLocation",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endpoints.location.createLocation,
        payload
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "API Error");
    }
  }
);


const locationSlice = createSlice({
  name: "location",
  initialState: {
    loading: false,
    data: null,
    error: null,
  } as ILocationState,

  reducers: {},

  extraReducers: (builder) => {
    builder


      .addCase(createLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })


      .addCase(createLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })


      .addCase(createLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default locationSlice;