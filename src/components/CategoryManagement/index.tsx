"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchCategories,
  createNewCategory,
  updateCategoryData,
  deleteCategory,
} from "@/redux/slices/CategorySlice";
import { CategoryProps } from "@/types/CategoryProps";
import { toast } from "react-toastify";

import styles from "./styles.module.scss";

const CategoryManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.category
  );

  const [newCategory, setNewCategory] = useState<{ CategoryName: string; ImageURL?: string }>({
    CategoryName: "",
    ImageURL: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<{ [key: number]: Partial<CategoryProps> }>({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreate = async () => {
    if (!newCategory.CategoryName.trim()) {
      toast.warning("Tên danh mục không được để trống");
      return;
    }
    await dispatch(createNewCategory(newCategory));
    setNewCategory({ CategoryName: "", ImageURL: "" });
    toast.success("Đã thêm danh mục mới");
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    const category = categories.find((c) => c.CategoryId === id);
    if (category) {
      setEditedData((prev) => ({
        ...prev,
        [id]: { CategoryName: category.CategoryName, ImageURL: category.ImageURL },
      }));
    }
  };

  const handleSave = async (id: number) => {
    const updated = editedData[id];
    if (updated && updated.CategoryName?.trim()) {
      await dispatch(updateCategoryData({ CategoryId: Number(id), CategoryName: updated.CategoryName || "", ImageURL: updated.ImageURL }));
      toast.success("Cập nhật thành công");
      setEditingId(null);
    } else {
      toast.warning("Tên danh mục không được để trống");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa danh mục này?")) {
      await dispatch(deleteCategory(id.toString()));
      toast.success("Đã xóa danh mục");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Quản lý Danh mục</h2>

      <div className={styles.addForm}>
        <input
          type="text"
          placeholder="Tên danh mục"
          value={newCategory.CategoryName}
          onChange={(e) => setNewCategory({ ...newCategory, CategoryName: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL Hình ảnh"
          value={newCategory.ImageURL}
          onChange={(e) => setNewCategory({ ...newCategory, ImageURL: e.target.value })}
        />
        <button onClick={handleCreate}>Thêm Danh mục</button>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Mã danh mục</th>
              <th>Tên danh mục</th>
              <th>Hình ảnh</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat.CategoryId}>
                  <td>{cat.CategoryId}</td>
                  <td>
                    {editingId === cat.CategoryId ? (
                      <input
                        type="text"
                        value={editedData[cat.CategoryId]?.CategoryName || ""}
                        onChange={(e) =>
                          setEditedData((prev) => ({
                            ...prev,
                            [cat.CategoryId]: {
                              ...prev[cat.CategoryId],
                              CategoryName: e.target.value,
                            },
                          }))
                        }
                      />
                    ) : (
                      cat.CategoryName
                    )}
                  </td>
                  <td>
                    {editingId === cat.CategoryId ? (
                      <input
                        type="text"
                        value={editedData[cat.CategoryId]?.ImageURL || ""}
                        onChange={(e) =>
                          setEditedData((prev) => ({
                            ...prev,
                            [cat.CategoryId]: {
                              ...prev[cat.CategoryId],
                              ImageURL: e.target.value,
                            },
                          }))
                        }
                      />
                    ) : cat.ImageURL ? (
                      <img src={cat.ImageURL} alt={cat.CategoryName} width="50" />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    {editingId === cat.CategoryId ? (
                      <button onClick={() => handleSave(cat.CategoryId)}>Lưu</button>
                    ) : (
                      <button onClick={() => handleEdit(cat.CategoryId)}>Chỉnh sửa</button>
                    )}
                    <button onClick={() => handleDelete(cat.CategoryId)}>Xóa</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>Không có danh mục nào để hiển thị.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryManagement;
