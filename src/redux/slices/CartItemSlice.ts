import axiosInstance from "@/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CartItemProps } from "@/types/CartItemProps";

interface CartItemsState {
    cartItems: CartItemProps[];
    loading: boolean;
    error: string | null;
}

const initialState: CartItemsState = {
    cartItems: [],
    loading: false,
    error: null,
};

export const getCartItemsByUserIdThunk = createAsyncThunk(
    "cartItems/getCartItemsByUserId",
    async (userId: number, thunkAPI) => {
        try {
            const { data: response } = await axiosInstance.get("/GetCartItemsByUserId", {
                params: { userId },
            });

            const rawItems = response;

            const cartItems = rawItems.map((item: any) => ({
                CartItemId: item.CartItemId,
                UserId: item.UserId,
                ProductId: item.ProductId,
                Quantity: item.Quantity,
                Product: {
                    ProductId: item["Product.ProductId"],
                    CategoryId: item["Product.CategoryId"],
                    ProductName: item["Product.ProductName"],
                    Price: item["Product.Price"],
                    Description: item["Product.Description"],
                    ImageURL: item["Product.ImageURL"],
                    Available: item["Product.Available"],
                    createdAt: item["Product.createdAt"],
                    updatedAt: item["Product.updatedAt"],
                },
            }));

            return cartItems;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.errMessage || err.message
            );
        }
    }
);

export const createCartItemThunk = createAsyncThunk(
    "cartItems/createCartItem",
    async (data: Partial<CartItemProps>, thunkAPI) => {
        try {
            const { data: response } = await axiosInstance.post(
                "/CreateNewCartItem",
                data
            );

            if (response.errCode !== 0) throw new Error(response.errMessage);

            return response.cartItem;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.errMessage || err.message
            );
        }
    }
);

export const updateCartItemThunk = createAsyncThunk(
    "cartItems/updateCartItem",
    async (data: Partial<CartItemProps>, thunkAPI) => {
        try {
            const { data: response } = await axiosInstance.put("/UpdateCartItem", data);

            if (response.errCode !== 0) throw new Error(response.errMessage);

            return data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message);
        }
    }
);

export const deleteCartItemThunk = createAsyncThunk(
    "cartItems/deleteCartItem",
    async (cartItemId: number, thunkAPI) => {
        try {
            const { data: response } = await axiosInstance.delete(`/DeleteCartItem/${cartItemId}`);

            if (response.errCode !== 0) throw new Error(response.errMessage);

            return cartItemId;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.errMessage || err.message);
        }
    }
);

const CartItemSlice = createSlice({
    name: "cartItems",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartItemsByUserIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCartItemsByUserIdThunk.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.loading = false;
            })
            .addCase(getCartItemsByUserIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createCartItemThunk.fulfilled, (state, action) => {
                const newCartItem = action.payload;

                if (newCartItem && newCartItem.CartItemId) {
                    state.cartItems.unshift(newCartItem);
                } else {
                    console.error("New cartItem does not have a valid CartItemId");
                }
            })
            .addCase(updateCartItemThunk.fulfilled, (state, action) => {
                const updatedItem = action.payload;
                const index = state.cartItems.findIndex(item => item.CartItemId === updatedItem.CartItemId);
                if (index !== -1) {
                    state.cartItems[index] = {
                        ...state.cartItems[index],
                        ...updatedItem,
                    };
                }
            })
            .addCase(deleteCartItemThunk.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.cartItems = state.cartItems.filter(item => item.CartItemId !== deletedId);
            });
    },
});

export default CartItemSlice.reducer;
