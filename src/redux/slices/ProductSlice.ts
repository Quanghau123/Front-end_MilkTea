import axiosInstance from "@/axios/axiosInstance";
import { ProductProps } from "@/types/ProductProps";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProductState {
  products: ProductProps[];
  selectedProduct: ProductProps | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/GetAllProducts");
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data.products;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Something went wrong",
      );
    }
  },
);

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/GetProductById/${id}`);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data.product;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Something went wrong",
      );
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
