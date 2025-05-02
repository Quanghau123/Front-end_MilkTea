"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchAllPromotionDetails,
  createPromotionDetail,
  updatePromotionDetail,
  deletePromotionDetail,
  clearMessages,
} from "@/redux/slices/PromotionDetailSlice";
import { PromotionDetailProps } from "@/types/PromotionDetailProps";
import { toast } from "react-toastify";
import styles from "@/components/PromotionDetailManagement/styles.module.scss";

const defaultFormState: PromotionDetailProps = {
  PromotionId: "",
  DiscountType: "",
  Note: "",
  Content: "",
};

const PromotionDetailManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allPromotionDetails, loading, error, successMessage } = useSelector(
    (state: RootState) => state.promotionDetail
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<PromotionDetailProps>(defaultFormState);

  useEffect(() => {
    dispatch(fetchAllPromotionDetails());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(fetchAllPromotionDetails());
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
      [name]: name === "PromotionId" ? Number(value) : value,
    }));
  };

  const handleEdit = (detail: PromotionDetailProps) => {
    setEditingId(detail.DetailId ?? null);
    setFormData(detail);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(defaultFormState);
  };

  const handleSave = () => {
    if (editingId !== null) {
      dispatch(updatePromotionDetail(formData));
    } else {
      console.error("No promotion detail selected for editing");
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa chi tiết chương trình khuyến mãi này?")) {
      dispatch(deletePromotionDetail(id));
    }
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createPromotionDetail(formData));
  };

  return (
    <div className={styles.container}>
      <h2>Quản lý Chi Tiết Chương Trình Khuyến Mãi</h2>

      <h3>Tạo Chi Tiết Chương Trình Khuyến Mãi Mới</h3>
      <form className={styles.form} onSubmit={handleCreate}>
        <input
          type="text"
          name="PromotionId"
          value={formData.PromotionId}
          onChange={handleChange}
          placeholder="Mã chương trình"
          required
        />
        <input
          type="text"
          name="DiscountType"
          value={formData.DiscountType}
          onChange={handleChange}
          placeholder="Loại Giảm Giá"
          required
        />
        <input
          type="text"
          name="Note"
          value={formData.Note}
          onChange={handleChange}
          placeholder="Ghi Chú"
          required
        />
        <textarea
          name="Content"
          value={formData.Content}
          onChange={handleChange}
          placeholder="Nội Dung"
          required
        />
        <button type="submit" disabled={loading}>
          Thêm Chi tiết chương trình
        </button>
      </form>

      <div className={styles.tableWrapper}>
        <h3>Danh Sách Chi Tiết Chương Trình Khuyến Mãi</h3>
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <table className={styles.promotionTable}>
            <thead>
              <tr>
                <th>Mã chi tiết</th>
                <th>Mã chương trình</th>
                <th>Loại Giảm Giá</th>
                <th>Ghi Chú</th>
                <th>Nội Dung</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {allPromotionDetails?.map((detail: PromotionDetailProps) =>
                editingId === detail.DetailId ? (
                  <tr key={detail.DetailId}>
                    <td>{detail.DetailId}</td>
                    <td>
                      <input
                        type="number"
                        name="PromotionId"
                        value={formData.PromotionId}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="DiscountType"
                        value={formData.DiscountType}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Note"
                        value={formData.Note}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <textarea
                        name="Content"
                        value={formData.Content}
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
                  <tr key={detail.DetailId}>
                    <td>{detail.DetailId}</td>
                    <td>{detail.PromotionId}</td>
                    <td>{detail.DiscountType}</td>
                    <td>{detail.Note}</td>
                    <td>{detail.Content}</td>
                    <td>
                      <button onClick={() => handleEdit(detail)}>Chỉnh sửa</button>
                      <button
                        onClick={() => {
                          if (detail.DetailId !== undefined) {
                            handleDelete(detail.DetailId);
                          } else {
                            console.error("DetailId không xác định");
                          }
                        }}
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

export default PromotionDetailManagement;
