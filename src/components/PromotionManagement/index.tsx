"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
  clearMessages,
} from "@/redux/slices/PromotionSlice";
import { PromotionProps } from "@/types/PromotionProps";
import { toast } from "react-toastify";
import styles from "@/components/PromotionManagement/styles.module.scss";

const defaultFormState: PromotionProps = {
  PromotionId: undefined,
  Title: "",
  Scription: "",
  ImageURL: "",
  StartDate: "",
  EndDate: "",
};

const PromotionManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { promotions, loading, error, successMessage } = useSelector(
    (state: RootState) => state.promotion
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<PromotionProps>(defaultFormState);

  useEffect(() => {
    dispatch(fetchPromotions());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(fetchPromotions());
      dispatch(clearMessages());
      setFormData(defaultFormState);
      setEditingId(null);
    }
  }, [error, successMessage, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "StartDate" || name === "EndDate" ? value : value,
    }));
  };

  const handleEdit = (promotion: PromotionProps) => {
    setEditingId(promotion.PromotionId !== undefined ? promotion.PromotionId : null);
    setFormData(promotion);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(defaultFormState);
  };

  const handleSave = () => {
    if (editingId !== undefined && editingId !== null) {
      dispatch(updatePromotion(formData));
    } else {
      console.error("No promotion selected for editing");
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa khuyến mãi này?")) {
      dispatch(deletePromotion(id.toString()));
    }
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createPromotion(formData));
  };

  return (
    <div className={styles.container}>
      <h2>Quản lý khuyến mãi</h2>

      <h3>Thêm khuyến mãi mới</h3>
      <form className={styles.form} onSubmit={handleCreate}>
        <input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
          placeholder="Tiêu đề"
          required
        />
        <input
          type="text"
          name="Scription"
          value={formData.Scription}
          onChange={handleChange}
          placeholder="Mô tả"
          required
        />
        <input
          type="text"
          name="ImageURL"
          value={formData.ImageURL}
          onChange={handleChange}
          placeholder="URL hình ảnh"
        />
        <input
          type="date"
          name="StartDate"
          value={formData.StartDate}
          onChange={handleChange}
          placeholder="Ngày bắt đầu"
          required
        />
        <input
          type="date"
          name="EndDate"
          value={formData.EndDate}
          onChange={handleChange}
          placeholder="Ngày kết thúc"
          required
        />
        <button type="submit" disabled={loading}>
          Thêm Khuyến mãi
        </button>
      </form>

      <div className={styles.tableWrapper}>
        <h3>Danh sách khuyến mãi</h3>
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <table className={styles.promotionTable}>
            <thead>
              <tr>
                <th>Mã chương trình</th>
                <th>Tiêu đề</th>
                <th>Mô tả</th>
                <th>Ảnh</th>
                <th>Bắt đầu</th>
                <th>Kết thúc</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion) =>
                editingId === promotion.PromotionId ? (
                  <tr key={promotion.PromotionId}>
                    <td>{promotion.PromotionId}</td>
                    <td>
                      <input
                        type="text"
                        name="Title"
                        value={formData.Title}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Scription"
                        value={formData.Scription}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="ImageURL"
                        value={formData.ImageURL}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="StartDate"
                        value={formData.StartDate}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="EndDate"
                        value={formData.EndDate}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button onClick={handleSave} disabled={loading}>
                        Lưu
                      </button>
                      <button onClick={handleCancel}>Hủy</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={promotion.PromotionId}>
                    <td>{promotion.PromotionId}</td>
                    <td>{promotion.Title}</td>
                    <td>{promotion.Scription}</td>
                    <td>
                      <img
                        src={promotion.ImageURL}
                        alt={promotion.Title}
                        width={50}
                      />
                    </td>
                    <td>{promotion.StartDate}</td>
                    <td>{promotion.EndDate}</td>
                    <td>
                      <button onClick={() => handleEdit(promotion)}>Chỉnh sửa</button>
                      <button
                        onClick={() => handleDelete(promotion.PromotionId!)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PromotionManagement;
