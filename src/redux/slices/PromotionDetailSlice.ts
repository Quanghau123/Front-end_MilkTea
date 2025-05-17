import axiosInstance from "@/axios/axiosInstance";
import { PromotionDetailProps } from "@/types/PromotionDetailProps";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PromotionDetailState {
  promotionDetails: PromotionDetailProps | null;
  allPromotionDetails: PromotionDetailProps[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: PromotionDetailState = {
  promotionDetails: null,
  allPromotionDetails: [],
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchAllPromotionDetails = createAsyncThunk(
  "promotionDetail/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/GetAllPromotionDetails");
      if (data.errCode !== 0) throw new Error(data.errMessage);

      return data.details.map((detail: any) => ({
        ...detail,
        PromotionTitle: detail["Promotion.Title"],
        PromotionScription: detail["Promotion.Scription"],
        PromotionStartDate: detail["Promotion.StartDate"],
        PromotionEndDate: detail["Promotion.EndDate"],
        PromotionImageURL: detail["Promotion.ImageURL"],
      }));
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message || "Fetch all failed");
    }
  }
);

export const fetchPromotionDetail = createAsyncThunk(
  "promotionDetail/fetchOne",
  async (id: string, thunkAPI) => {
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
      return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message || "Fetch failed");
    }
  }
);

export const fetchPromotionDetailsByPromotionId = createAsyncThunk(
  "promotionDetail/fetchPromotionDetailsByPromotionId",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/GetPromotionDetailsByPromotionId/${id}');
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

export const createPromotionDetail = createAsyncThunk(
  "promotionDetail/create",
  async (detailData: PromotionDetailProps, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/CreatePromotionDetail", detailData);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message || "Create failed");
    }
  }
);

export const updatePromotionDetail = createAsyncThunk(
  "promotionDetail/update",
  async (detailData: PromotionDetailProps, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put("/UpdatePromotionDetail", detailData);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message || "Update failed");
    }
  }
);

export const deletePromotionDetail = createAsyncThunk(
  "promotionDetail/delete",
  async (id: number, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/DeletePromotionDetail/${id}`);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message || "Delete failed");
    }
  }
);

const promotionDetailSlice = createSlice({
  name: "promotionDetail",
  initialState,
  reducers: {
    clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPromotionDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPromotionDetails.fulfilled, (state, action) => {
        state.allPromotionDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPromotionDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchPromotionDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromotionDetail.fulfilled, (state, action) => {
        state.promotionDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchPromotionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

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
      })

      .addCase(createPromotionDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createPromotionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(createPromotionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updatePromotionDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updatePromotionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(updatePromotionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deletePromotionDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deletePromotionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Deleted successfully";
        if (state.promotionDetails?.DetailId === action.payload) {
          state.promotionDetails = null;
        }
      })
      .addCase(deletePromotionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = promotionDetailSlice.actions;

export default promotionDetailSlice.reducer;
