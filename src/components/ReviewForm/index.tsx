"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchReviews, createReviewThunk } from "@/redux/slices/reviewSlice";
import { AppDispatch } from "@/redux/store";
import styles from "@/components/ReviewForm/styles.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultAvatars = [
  "https://raw.githubusercontent.com/Quanghau123/Front-end_MilkTea/master/src/assets/Avatar/Avatar1.jpeg",
  "https://raw.githubusercontent.com/Quanghau123/Front-end_MilkTea/master/src/assets/Avatar/Avatar2.jpeg",
  "https://raw.githubusercontent.com/Quanghau123/Front-end_MilkTea/master/src/assets/Avatar/Avatar3.jpeg",
  "https://raw.githubusercontent.com/Quanghau123/Front-end_MilkTea/master/src/assets/Avatar/Avatar4.jpeg",
  "https://raw.githubusercontent.com/Quanghau123/Front-end_MilkTea/master/src/assets/Avatar/Avatar5.jpeg",
  "https://raw.githubusercontent.com/Quanghau123/Front-end_MilkTea/master/src/assets/Avatar/Avatar6.jpeg",
];

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
  return defaultAvatars[randomIndex];
};

const ReviewForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.UserId ? Number(parsedUser.UserId) : null);
      setUserName(parsedUser.UserName || "Anonymous");
    }
  }, []);

  const [randomAvatar, setRandomAvatar] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    setRandomAvatar(getRandomAvatar());
  }, []);

  const handleSubmit = async () => {

    if (userId === null || !title || !comment || !rating) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const newReview = {
        UserId: userId,
        UserName: userName,
        avatar: randomAvatar || undefined,
        Title: title,
        Comment: comment,
        Rating: rating,
      };

      const createdReview = await dispatch(createReviewThunk(newReview)).unwrap();

      setTitle("");
      setComment("");
      setRating(0);

      dispatch(fetchReviews());

      toast.success("Đánh giá đã được gửi thành công!");
    } catch (err: any) {
      console.error("Error creating review:", err);
      toast.error("Gửi đánh giá thất bại! Vui lòng thử lại.");
    }
  };

  if (!randomAvatar) return null;

  return (
    <form className={styles.reviewForm}>
      <h2 className={styles.reviewForm__title}>Đánh Giá</h2>

      <div className={styles.reviewForm__user}>
        <img
          src={randomAvatar}
          alt="Avatar"
          className={styles.reviewForm__avatar}
        />
        <span>
          <strong>{userName}</strong>
        </span>
      </div>

      <div className={styles.reviewForm__stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${styles.star} ${star <= rating ? styles.active : ""}`}
            onClick={() => setRating(star === rating ? star - 1 : star)}
            style={{ cursor: "pointer" }}
          >
            ★
          </span>
        ))}
      </div>

      <div className={styles.reviewForm__group}>
        <label htmlFor="title">Tiêu Đề:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập Tiêu Đề..."
          className={styles.reviewForm__input}
        />
      </div>

      <div className={styles.reviewForm__group}>
        <label htmlFor="comment">Bình Luận:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Chia Sẽ Suy Nghĩ Của Bạn..."
          rows={4}
          className={styles.reviewForm__textarea}
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className={styles.reviewForm__button}
      >
        Gửi Đánh Giá
      </button>
    </form>
  );
};

export default ReviewForm;
