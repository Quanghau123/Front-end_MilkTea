import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./slices/CategorySlice";
import productReducer from "./slices/ProductSlice";
import promotionReducer from "./slices/PromotionSlice";
import promotionDetailReducer from "./slices/PromotionDetailSlice";
import reviewReducer from "./slices/reviewSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    promotion: promotionReducer,
    promotionDetail: promotionDetailReducer,
    review: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
