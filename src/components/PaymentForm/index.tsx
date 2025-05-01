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
      console.log("Parsed user from localStorage:", parsedUser);
      setUserId(parsedUser.UserId ? Number(parsedUser.UserId) : null);
      setUserDetails(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      console.log("Dispatching getOrderByIdThunk with orderId:", orderId);
      dispatch(getOrderByIdThunk(orderId));
    }
  }, [orderId, dispatch]);

  const orderData = order;
  console.log("Fetched orderData:", orderData);

  const handleMomoPayment = async () => {
    if (!userId || !orderId) {
      toast.error("Missing MOMO payment information.");
      return;
    }

    const momoData = { OrderId: orderId, UserId: userId };
    console.log("Sending momoData:", momoData);

    try {
      const momoResult = await dispatch(processMomoPayment(momoData));
      console.log("MOMO payment result:", momoResult);

      if (momoResult?.payload?.payUrl) {
        window.location.href = momoResult.payload.payUrl;
      } else {
        toast.error("Could not retrieve MOMO payment URL.");
      }
    } catch (error) {
      console.error("MOMO payment error:", error);
      toast.error("An error occurred while processing MOMO payment.");
    }
  };

  const handleOfflinePayment = async () => {
    if (!userId || !orderId || !orderData) {
      toast.error("Missing OFFLINE payment information.");
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

    console.log("Sending offline payment data:", paymentData);

    try {
      const result = await dispatch(createPayment(paymentData));
      console.log("Offline payment result:", result);

      if (result?.payload?.errCode === 0) {
        toast.success("Your offline payment has been recorded. Please complete payment at the counter.");
      } else {
        toast.error("An error occurred while creating the offline payment.");
      }
    } catch (error) {
      console.error("Offline payment error:", error);
      toast.error("An error occurred while processing offline payment.");
    }
  };

  const handleCreatePayment = () => {
    console.log("Selected payment method:", paymentMethod);
    if (paymentMethod === "MOMO") {
      handleMomoPayment();
    } else if (paymentMethod === "OFFLINE") {
      handleOfflinePayment();
    } else {
      toast.error("Please select a valid payment method.");
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
                src="https://raw.githubusercontent.com/lamlinhh/Travel_Web/hau/assets/Images/banner_payment.jpeg"
                alt="Payment Banner"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.blockTitle}>
              <h2 className={styles.title}>PAYMENT FOR TOUR</h2>
            </div>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}

          <div className={styles.row}>
            <span className={styles.label}>
              <UserOutlined style={{ color: "#e65c2e" }} /> Username:
            </span>
            <span className={styles.value}>
              {userDetails?.UserName || "Loading..."}
            </span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>
              <MailOutlined style={{ color: "#e65c2e" }} /> Email:
            </span>
            <span className={styles.value}>
              {userDetails?.Email || "Loading..."}
            </span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>
              <PhoneOutlined style={{ color: "#e65c2e" }} /> Phone:
            </span>
            <span className={styles.value}>
              {userDetails?.Phone || "Loading..."}
            </span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>
              <DollarOutlined style={{ color: "#e65c2e" }} /> Amount:
            </span>
            <span className={styles.value}>
              {orderData?.TotalAmount ? `${orderData.TotalAmount} $` : "Loading..."}
            </span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>
              <CreditCardOutlined style={{ color: "#e65c2e" }} /> Payment Method:
            </span>
            <select
              className={styles.select}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="MOMO">MOMO</option>
              <option value="OFFLINE">Pay at Counter</option>
            </select>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Status:</span>
            <span className={styles.value}>
              {paymentStatus ? "Paid" : "Unpaid"}
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
              {loading ? "Processing..." : "Pay Now"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentForm;
