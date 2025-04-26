import axiosInstance from "@/axios/axiosInstance";
import { PromotionProps } from "@/types/PromotionProps"; 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PromotionState {
  promotions: PromotionProps[];
  selectedPromotion: PromotionProps | null;
  loading: boolean;
  error: string | null;
}

const initialState: PromotionState = {
  promotions: [],
  selectedPromotion: null,
  loading: false,
  error: null,
};

export const fetchPromotions = createAsyncThunk(
  "promotion/fetchPromotions",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/GetAllPromotions");
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data.promotions;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Something went wrong",
      );
    }
  },
);

export const fetchPromotion = createAsyncThunk(
  "promotion/fetchPromotion",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/GetPromotionById/${id}`);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data.promotion;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Something went wrong",
      );
    }
  },
);

const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromotions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromotions.fulfilled, (state, action) => {
        state.promotions = action.payload;
        state.loading = false;
      })
      .addCase(fetchPromotions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchPromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromotion.fulfilled, (state, action) => {
        state.selectedPromotion = action.payload;
        state.loading = false;
      })
      .addCase(fetchPromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default promotionSlice.reducer;
