"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createPayment, processMomoPayment } from "@/redux/slices/PaymentSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { getOrderByIdThunk } from "@/redux/slices/OrderSlice";

import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  DollarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";

const PaymentForm = () => {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams?.get("orderId");
  const orderId = orderIdParam ? Number(orderIdParam) : null;

  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.payment);
  const { order } = useSelector((state: RootState) => state.order);

  const [userId, setUserId] = useState<number | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("MOMO");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Người dùng từ localStorage:", parsedUser);
      setUserId(parsedUser.UserId ? Number(parsedUser.UserId) : null);
      setUserDetails(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      console.log("Lấy đơn hàng theo ID:", orderId);
      dispatch(getOrderByIdThunk(orderId));
    }
  }, [orderId, dispatch]);

  const orderData = order;
  console.log("Dữ liệu đơn hàng:", orderData);

  const handleMomoPayment = async () => {
    if (!userId || !orderId) {
      toast.error("Thiếu thông tin thanh toán MoMo.");
      return;
    }

    const momoData = { OrderId: orderId, UserId: userId };
    console.log("Gửi dữ liệu MoMo:", momoData);

    try {
      const momoResult = await dispatch(processMomoPayment(momoData));
      console.log("Kết quả thanh toán MoMo:", momoResult);

      if (momoResult?.payload?.payUrl) {
        window.location.href = momoResult.payload.payUrl;
      } else {
        toast.error("Không thể lấy được liên kết thanh toán MoMo.");
      }
    } catch (error) {
      console.error("Lỗi khi xử lý thanh toán MoMo:", error);
      toast.error("Đã xảy ra lỗi khi thanh toán MoMo.");
    }
  };

  const handleOfflinePayment = async () => {
    if (!userId || !orderId || !orderData) {
      toast.error("Thiếu thông tin thanh toán trực tiếp.");
      return;
    }

    const amount = orderData.TotalAmount;
    const paymentData = {
      OrderId: orderId,
      UserId: userId,
      PaymentMethod: "OFFLINE",
      PaymentStatus: paymentStatus,
      Amount: amount,
    };

    console.log("Gửi dữ liệu thanh toán trực tiếp:", paymentData);

    try {
      const result = await dispatch(createPayment(paymentData));
      console.log("Kết quả thanh toán trực tiếp:", result);

      if (result?.payload?.errCode === 0) {
        toast.success("Thanh toán trực tiếp đã được ghi nhận. Vui lòng thanh toán khi nhận hàng.");
      } else {
        toast.error("Đã xảy ra lỗi khi tạo thanh toán trực tiếp.");
      }
    } catch (error) {
      console.error("Lỗi thanh toán trực tiếp:", error);
      toast.error("Đã xảy ra lỗi khi xử lý thanh toán trực tiếp.");
    }
  };

  const handleCreatePayment = () => {
    console.log("Phương thức thanh toán đã chọn:", paymentMethod);
    if (paymentMethod === "MOMO") {
      handleMomoPayment();
    } else if (paymentMethod === "OFFLINE") {
      handleOfflinePayment();
    } else {
      toast.error("Vui lòng chọn phương thức thanh toán hợp lệ.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.yard}>
        <motion.div
          className={styles.area}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className={styles.banner}>
            <div className={styles.blockImage}>
              <Image
                src="https://raw.githubusercontent.com/Quanghau123/Front-end_MilkTea/master/src/assets/About/About_image1.jpeg"
                alt="Ảnh Thanh Toán"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.blockTitle}>
              <h2 className={styles.title}>THANH TOÁN</h2>
            </div>
          </div>

          {loading && <p>Đang tải dữ liệu...</p>}
          {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}

          <div className={styles.row}>
            <span className={styles.label}>
              <UserOutlined style={{ color: "#e65c2e" }} /> Tên Tài Khoản:
            </span>
            <span className={styles.value}>
              {userDetails?.UserName || "Đang tải..."}
            </span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>
              <MailOutlined style={{ color: "#e65c2e" }} /> Email:
            </span>
            <span className={styles.value}>
              {userDetails?.Email || "Đang tải..."}
            </span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>
              <PhoneOutlined style={{ color: "#e65c2e" }} /> Số Điện Thoại:
            </span>
            <span className={styles.value}>
              {userDetails?.Phone || "Đang tải..."}
            </span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>
              <DollarOutlined style={{ color: "#e65c2e" }} /> Tiền Thanh Toán:
            </span>
            <span className={styles.value}>
              {orderData?.TotalAmount ? `${orderData.TotalAmount} VND` : "Đang tải..."}
            </span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>
              <CreditCardOutlined style={{ color: "#e65c2e" }} /> Phương Thức Thanh Toán:
            </span>
            <select
              className={styles.select}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="MOMO">Ví Điện Tử MoMo</option>
              <option value="OFFLINE">Thanh Toán Khi Nhận Hàng</option>
            </select>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Trạng Thái Thanh Toán:</span>
            <span className={styles.value}>
              {paymentStatus ? "Đã Thanh Toán" : "Chưa Thanh Toán"}
            </span>
          </div>

          <div className={styles.paymentButtons}>
            <motion.button
              className={styles.payButton}
              onClick={handleCreatePayment}
              disabled={loading || !userId || !orderId || !orderData}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
            >
              {loading ? "Đang xử lý..." : "Thanh Toán Ngay"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentForm;
