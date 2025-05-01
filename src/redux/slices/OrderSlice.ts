import axiosInstance from "@/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderProps } from "@/types/OrderProps";

interface OrderState {
    orders: OrderProps[];
    loading: boolean;
    error: string | null;
    createdOrderId: number | null;
    order: OrderProps | null;
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
    createdOrderId: null,
    order: null,
};

export const createOrderFromCartThunk = createAsyncThunk(
    "orders/createOrderFromCart",
    async (data: { userId: number; shippingInfo?: { address?: string; phone?: string } }, thunkAPI) => {
        try {
            const { data: response } = await axiosInstance.post("/CreateOrderFromCart", data);

            if (response.errCode !== 0) throw new Error(response.errMessage);

            return {
                orderId: response.orderId,
                message: response.message,
            };
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message);
        }
    }
);

export const getOrderByIdThunk = createAsyncThunk(
    "orders/getOrderById",
    async (orderId: number, thunkAPI) => {
        try {
            const { data: response } = await axiosInstance.get(`/GetOrderById/${orderId}`);

            if (response.errCode !== 0) throw new Error(response.errMessage);

            return response.order; 
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message);
        }
    }
);

export const getOrdersByUserIdThunk = createAsyncThunk(
    "orders/getOrdersByUserId",
    async (userId: number, thunkAPI) => {
        try {
            const { data: response } = await axiosInstance.get(`/GetOrdersByUserId?userId=${userId}`);

            if (response.errCode !== 0) throw new Error(response.errMessage);

            return response.orders; 
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message);
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearOrderState(state) {
            state.createdOrderId = null;
            state.error = null;
            state.order = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderFromCartThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrderFromCartThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.createdOrderId = action.payload.orderId;
            })
            .addCase(createOrderFromCartThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getOrderByIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload; 
            })
            .addCase(getOrderByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getOrdersByUserIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrdersByUserIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload; 
            })
            .addCase(getOrdersByUserIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;
