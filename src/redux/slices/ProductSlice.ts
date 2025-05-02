import axiosInstance from "@/axios/axiosInstance";
import { ProductProps } from "@/types/ProductProps";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProductState {
  products: ProductProps[];
  selectedProduct: ProductProps | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/GetAllProducts");
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data.products;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message || "Something went wrong");
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/GetProductById/${id}`);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data.product;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message || "Something went wrong");
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData: ProductProps, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/CreateNewProduct", productData);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message || "Create failed");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (productData: ProductProps, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put("/UpdateProduct", productData);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message || "Update failed");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/DeleteProduct/${id}`);
      if (data.errCode !== 0) throw new Error(data.errMessage);
      return data.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message || "Delete failed");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
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
      })

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = productSlice.actions;
export default productSlice.reducer;
