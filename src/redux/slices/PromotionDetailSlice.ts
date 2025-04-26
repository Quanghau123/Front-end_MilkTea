import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/axios/axiosInstance";
import { PromotionDetailProps } from "@/types/PromotionDetailProps";

interface PromotionDetailState {
  promotionDetails: PromotionDetailProps | null;
  loading: boolean;
  error: string | null;
}

const initialState: PromotionDetailState = {
  promotionDetails: null,
  loading: false,
  error: null,
};

export const fetchPromotionDetailsByPromotionId = createAsyncThunk(
  "promotionDetail/fetchPromotionDetailsByPromotionId",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/GetPromotionDetailsByPromotionId/${id}`);
      if (data.errCode !== 0) throw new Error(data.errMessage);

      return {
        ...data.details,
        PromotionTitle: data.details["Promotion.Title"],
        PromotionScription: data.details["Promotion.Scription"],
        PromotionStartDate: data.details["Promotion.StartDate"],
        PromotionEndDate: data.details["Promotion.EndDate"],
        PromotionImageURL: data.details["Promotion.ImageURL"],
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.errMessage || err.message || "Something went wrong");
    }
  }
);

const promotionDetailSlice = createSlice({
  name: "promotionDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPromotionDetailsByPromotionId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromotionDetailsByPromotionId.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.promotionDetails = payload;
      })
      .addCase(fetchPromotionDetailsByPromotionId.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
        console.error("Error during fetch:", payload);
      }),
});

export default promotionDetailSlice.reducer;
