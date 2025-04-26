"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { fetchPromotionDetailsByPromotionId } from "@/redux/slices/PromotionDetailSlice";
import { useParams } from "next/navigation";

import { TagOutlined, InfoCircleOutlined, FileTextOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

import styles from "@/components/PromotionDetailCard/styles.module.scss";

const PromotionDetailCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { promotionDetails, loading, error } = useSelector((state: RootState) => state.promotionDetail);
  const params = useParams();
  const promotionId = params?.id as string;

  useEffect(() => {
    if (promotionId) {
      dispatch(fetchPromotionDetailsByPromotionId(promotionId));
    }
  }, [promotionId, dispatch]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!promotionDetails) return <div className={styles.noData}>No promotion details found.</div>;

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.banner}>
        <img src={promotionDetails.PromotionImageURL} alt="Promotion Banner" />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{promotionDetails.PromotionTitle}</h2>
        <p><strong style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><TagOutlined style={{ fontSize: "20px" }} />Loại Giảm Giá:</strong></p>
        <p> {promotionDetails.DiscountType}</p>

        <p><strong style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><InfoCircleOutlined style={{ fontSize: "20px" }} />Ghi Chú:</strong></p>
        <p>{promotionDetails.Note}</p>

        <p><strong style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><FileTextOutlined style={{ fontSize: "20px" }} />Nội Dung:</strong></p>
        <p>{promotionDetails.Content}</p>

        <div className={styles.dateRange}>
          <span>
            <strong style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <CalendarOutlined /> Bắt Đầu:
            </strong>
            {promotionDetails.PromotionStartDate ? new Date(promotionDetails.PromotionStartDate).toLocaleDateString() : "N/A"}
          </span>
          <span>
            <strong style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <ClockCircleOutlined /> Kết Thúc:
            </strong>
            {promotionDetails.PromotionEndDate ? new Date(promotionDetails.PromotionEndDate).toLocaleDateString() : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetailCard;
