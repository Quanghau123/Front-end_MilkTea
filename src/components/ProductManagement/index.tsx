"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  clearMessages,
} from "@/redux/slices/ProductSlice";
import { ProductProps } from "@/types/ProductProps";
import { toast } from "react-toastify";
import styles from "@/components/ProductManagement/styles.module.scss";

const defaultFormState: ProductProps = {
  ProductId: undefined,
  CategoryId: "",
  ProductName: "",
  Price: "",
  Description: "",
  ImageURL: "",
  Available: true,
};

const ProductManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, successMessage } = useSelector(
    (state: RootState) => state.product
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProductProps>(defaultFormState);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(fetchProducts());
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
      [name]: name === "Price" || name === "CategoryId" ? (value ? Number(value) : 0) : value,
    }));
  };

  const handleEdit = (product: ProductProps) => {
    setEditingId(product.ProductId !== undefined ? product.ProductId : null);
    setFormData(product);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(defaultFormState);
  };

  const handleSave = () => {
    if (editingId !== undefined && editingId !== null) {
      dispatch(updateProduct(formData));
    } else {
      console.error("No product selected for editing");
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
      dispatch(deleteProduct(id.toString()));
    }
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createProduct(formData));
  };

  return (
    <div className={styles.container}>
      <h2>Quản lý Sản phẩm</h2>

      <h3>Tạo Sản phẩm Mới</h3>
      <form className={styles.form} onSubmit={handleCreate}>
        <input
          type="text"
          name="ProductName"
          value={formData.ProductName}
          onChange={handleChange}
          placeholder="Tên Sản phẩm"
          required
        />
        <input
          type="text"
          name="CategoryId"
          value={formData.CategoryId.toString()}
          onChange={handleChange}
          placeholder="Mã danh mục"
          required
        />
        <input
          type="text"
          name="Price"
          value={formData.Price.toString()}
          onChange={handleChange}
          placeholder="Giá"
          required
        />
        <input
          type="text"
          name="ImageURL"
          value={formData.ImageURL}
          onChange={handleChange}
          placeholder="URL Hình ảnh"
        />
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          placeholder="Mô tả"
        />
        <div className={styles.blockAvailable}>
          <label>Có sẵn:</label>
          <input
            type="checkbox"
            name="Available"
            checked={formData.Available}
            onChange={() =>
              setFormData({ ...formData, Available: !formData.Available })
            }
          />
        </div>
        <button type="submit" disabled={loading}>
          Thêm Sản phẩm
        </button>
      </form>

      <div className={styles.tableWrapper}>
        <h3>Danh sách Sản phẩm</h3>
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>Mã sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Tên</th>
                <th>Mô tả</th>
                <th>Mã danh mục</th>
                <th>Giá</th>
                <th>Có sẵn</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) =>
                editingId === product.ProductId ? (
                  <tr key={product.ProductId}>
                    <td>{product.ProductId}</td>
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
                        type="text"
                        name="ProductName"
                        value={formData.ProductName}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <textarea
                        name="Description"
                        value={formData.Description}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="CategoryId"
                        value={formData.CategoryId.toString()}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Price"
                        value={formData.Price.toString()}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="Available"
                        checked={formData.Available}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            Available: !formData.Available,
                          })
                        }
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
                  <tr key={product.ProductId}>
                    <td>{product.ProductId}</td>
                    <td>
                      <img
                        src={product.ImageURL}
                        alt={product.ProductName}
                        width={50}
                      />
                    </td>
                    <td>{product.ProductName}</td>
                    <td>{product.Description}</td>
                    <td>{product.CategoryId}</td>
                    <td>{product.Price} VND</td>
                    <td>{product.Available ? "Có sẵn" : "Hết hàng"}</td>
                    <td>
                      <button onClick={() => handleEdit(product)}>Chỉnh sửa</button>
                      <button
                        onClick={() => {
                          if (product.ProductId !== undefined) {
                            handleDelete(product.ProductId);
                          } else {
                            console.error("ProductId is undefined");
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

export default ProductManagement;
