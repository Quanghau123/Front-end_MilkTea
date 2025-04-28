"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "@/redux/slices/reviewSlice";
import { RootState, AppDispatch } from "@/redux/store";
import ReviewCard from "../ReviewCard";
import { LeftOutlined, RightOutlined } from '@ant-design/icons'; 
import styles from "./styles.module.scss";

const ListReview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviews, loading, error } = useSelector((state: RootState) => state.review);

  const [currentIndex, setCurrentIndex] = useState(0); 

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return <div>No reviews found.</div>;
  }

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : reviews.length - 3));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex < reviews.length - 3 ? prevIndex + 1 : 0));
  };

  const getVisibleReviews = () => {
    const start = currentIndex;
    return reviews.slice(start, start + 3); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <button className={styles.arrow} onClick={handlePrevClick}>
          <LeftOutlined style={{ fontSize: '20px', color: '#D3D3D3' }} />
        </button>

        <div className={styles.reviewGrid}>
          {getVisibleReviews().map((review) => (
            <div className={styles.reviewCard} key={review.ReviewId}>
              <ReviewCard {...review} />
            </div>
          ))}
        </div>

        <button className={styles.arrow} onClick={handleNextClick}>
          <RightOutlined style={{ fontSize: '20px', color: '#D3D3D3' }} />
        </button>
      </div>
    </div>
  );
};

export default ListReview;
