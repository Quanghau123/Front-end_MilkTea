"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchPayments,
  fetchSearch,
  handleMomoCallback,
} from "@/redux/slices/PaymentSlice";
import { PaymentProps } from "@/types/PaymentProps";
import { toast } from "react-toastify";
import styles from "@/components/PaymentManagement/styles.module.scss";

const PaymentManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { payments, searchResult, loading, error } = useSelector(
    (state: RootState) => state.payment
  );

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const handleSearch = () => {
    if (keyword.trim()) {
      dispatch(fetchSearch(keyword));
    } else {
      dispatch(fetchPayments());
    }
  };

  const handleConfirmPayment = async (payment: PaymentProps) => {
    try {
      if (!payment.TransactionId) {
        toast.warn("Không có TransactionId để xác nhận.");
        return;
      }

      const resultAction = await dispatch(
        handleMomoCallback({
          paymentId: payment.PaymentId,
          transactionId: payment.TransactionId,
          resultCode: 0,
        })
      );

      if (handleMomoCallback.fulfilled.match(resultAction)) {
        toast.success("Xác nhận thanh toán thành công!");
        keyword.trim()
          ? dispatch(fetchSearch(keyword))
          : dispatch(fetchPayments());
      } else {
        toast.error("Xác nhận thanh toán thất bại!");
      }
    } catch (err) {
      toast.error("Lỗi xác nhận thanh toán!");
    }
  };

  const displayedPayments = keyword.trim() ? searchResult : payments;

  return (
    <div className={styles.container}>
      <h1>Quản lý thanh toán</h1>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Tìm theo từ khóa [ Tên tài khoản | Email | Số điện thoại ]"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>

      {loading && <p>Đang tải...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <table className={styles.paymentTable}>
        <thead>
          <tr>
            <th>Mã thanh toán</th>
            <th>Mã đơn hàng</th>
            <th>Mã người dùng</th>
            <th>Phương thức</th>
            <th>Mã giao dịch</th>
            <th>Số tiền</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {displayedPayments.length === 0 ? (
            <tr>
              <td colSpan={8}>Không có dữ liệu hiển thị</td>
            </tr>
          ) : (
            displayedPayments.map((payment) => (
              <tr key={payment.PaymentId}>
                <td>{payment.PaymentId}</td>
                <td>{payment.OrderId}</td>
                <td>{payment.UserId}</td>
                <td>{payment.PaymentMethod}</td>
                <td>{payment.TransactionId || "N/A"}</td>
                <td>{payment.Amount}</td>
                <td>
                  {payment.PaymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}
                </td>
                <td>
                  {!payment.PaymentStatus && payment.TransactionId ? (
                    <button
                      className={styles.confirmBtn}
                      onClick={() => handleConfirmPayment(payment)}
                    >
                      Xác nhận đã thanh toán
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentManagement;
