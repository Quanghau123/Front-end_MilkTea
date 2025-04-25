import axiosInstance from "@/axios/axiosInstance";
import { CategoryProps } from "@/types/CategoryProps";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  categories: CategoryProps[];
  selectedCategory: CategoryProps | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/GetAllCategories");
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data.categories;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Something went wrong",
      );
    }
  },
);

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (id: string) => {
    const response = await axiosInstance.get(`/GetCategoryById/${id}`);
    return response.data.category;
  },
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.selectedCategory = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch category";
      });
  },
});

export default categorySlice.reducer;
