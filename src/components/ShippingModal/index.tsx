"use client"

import React, { useState } from "react";
import styles from "@/components/ShippingModal/styles.module.scss";

interface ShippingModalProps {
    onClose: () => void;
    onConfirm: (address: string, phone: string) => void;
    userId: number | null;
}

export default function ShippingModal({ onClose, onConfirm, userId }: ShippingModalProps) {
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = () => {
        if (!address || !phone) return alert("Vui lòng nhập đầy đủ");
        onConfirm(address, phone);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3>Thông tin giao hàng</h3>
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Địa chỉ"
                />
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Số điện thoại"
                />
                <div className={styles.actions}>
                    <button onClick={handleSubmit}>Xác nhận</button>
                    <button onClick={onClose}>Hủy</button>
                </div>
            </div>
        </div>
    );
}
