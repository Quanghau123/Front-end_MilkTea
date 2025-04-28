import axiosInstance from "@/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ReviewProps } from "@/types/ReviewProps";

interface ReviewsState {
  reviews: ReviewProps[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/GetAllReviews");

      if (data.errCode !== 0) throw new Error(data.errMessage);

      return data.reviews.map((review: any) => ({
        ...review,
        UserName: review["User.UserName"],
      }));
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message || "Something went wrong",
      );
    }
  }
);

export const createReviewThunk = createAsyncThunk(
  "reviews/createReview",
  async (data: Partial<ReviewProps>, thunkAPI) => {
    try {
      const { data: response } = await axiosInstance.post(
        "/CreateNewReview",
        data
      );

      if (response.errCode !== 0) throw new Error(response.errMessage);

      // Trả về review vừa tạo
      return response.review;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errMessage || err.message
      );
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createReviewThunk.fulfilled, (state, action) => {
        const newReview = action.payload;

        // Kiểm tra xem dữ liệu trả về có ReviewId không
        if (newReview && newReview.ReviewId) {
          state.reviews.unshift(newReview); // Thêm review mới vào đầu mảng
        } else {
          console.error("New review does not have a valid ReviewId");
        }
      });
  },
});

export default reviewsSlice.reducer;
