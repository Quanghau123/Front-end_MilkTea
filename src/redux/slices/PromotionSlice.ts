import axiosInstance from "@/axios/axiosInstance";
import { PromotionProps } from "@/types/PromotionProps";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PromotionState {
  promotions: PromotionProps[];
  selectedPromotion: PromotionProps | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: PromotionState = {
  promotions: [],
  selectedPromotion: null,
  loading: false,
  error: null,
  successMessage: null,
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
        err.response?.data?.errMessage || err.message || "Something went wrong"
      );
    }
  }
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
        err.response?.data?.errMessage || err.message || "Something went wrong"
      );
    }
  }
);

export const createPromotion = createAsyncThunk(
  "promotion/createPromotion",
  async (newData: PromotionProps, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/CreatePromotion", newData);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Create failed"
      );
    }
  }
);

export const updatePromotion = createAsyncThunk(
  "promotion/updatePromotion",
  async (updatedData: PromotionProps, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put("/UpdatePromotion", updatedData);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Update failed"
      );
    }
  }
);

export const deletePromotion = createAsyncThunk(
  "promotion/deletePromotion",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/DeletePromotion/${id}`);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Delete failed"
      );
    }
  }
);

const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
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
      })

      .addCase(createPromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createPromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(createPromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updatePromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updatePromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(updatePromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deletePromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deletePromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
        state.promotions = state.promotions.filter(
          (promotion) => promotion.PromotionId !== Number(action.payload.id)
        );
      })
      .addCase(deletePromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = promotionSlice.actions;
export default promotionSlice.reducer;
