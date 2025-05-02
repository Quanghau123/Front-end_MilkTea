import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/axios/axiosInstance";
import { CategoryProps } from "@/types/CategoryProps";

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
      return data.categories;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Failed to fetch categories"
      );
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/GetCategoryById/${id}`);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Failed to fetch category"
      );
    }
  }
);

export const createNewCategory = createAsyncThunk(
  "category/createNewCategory",
  async (payload: { CategoryName: string; ImageURL?: string }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/CreateNewCategory", payload);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      thunkAPI.dispatch(fetchCategories());
      return data.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Failed to create category"
      );
    }
  }
);

export const updateCategoryData = createAsyncThunk(
  "category/updateCategoryData",
  async (payload: { CategoryId: number; CategoryName: string; ImageURL?: string }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put("/UpdateCategory", payload);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      thunkAPI.dispatch(fetchCategories());
      return data.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Failed to update category"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/DeleteCategory/${id}`);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      thunkAPI.dispatch(fetchCategories());
      return data.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Failed to delete category"
      );
    }
  }
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
        state.error = action.payload as string;
      })

      .addCase(createNewCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNewCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
