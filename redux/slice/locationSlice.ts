import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/endpoints/endpoints";


export const createLocation = createAsyncThunk(
  "createLocation",
  async (payload: any) => {
    const response = await axiosInstance.post(
      endpoints.location.createLocation,
      payload
    );
    console.log("CREATE LOCATION RESPONSE:", response);
    return response.data;
  }
);


const locationSlice = createSlice({
  name: "location",
  initialState: {
    loading: false,
    data: null as any,
    error: null as any,
  },

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
        state.error = action.error.message;
      });
  },
});

export default locationSlice;