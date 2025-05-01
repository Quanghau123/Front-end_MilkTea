import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./slices/CategorySlice";
import productReducer from "./slices/ProductSlice";
import cartItemReducer from "./slices/CartItemSlice";
import promotionReducer from "./slices/PromotionSlice";
import promotionDetailReducer from "./slices/PromotionDetailSlice";
import reviewReducer from "./slices/reviewSlice";
import orderReducer from "./slices/OrderSlice";
import paymentReducer from "@/redux/slices/PaymentSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    promotion: promotionReducer,
    promotionDetail: promotionDetailReducer,
    review: reviewReducer,
    cartItem: cartItemReducer,
    order: orderReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
