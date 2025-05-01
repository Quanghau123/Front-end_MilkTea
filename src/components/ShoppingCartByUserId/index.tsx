"use client"

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import {
    getCartItemsByUserIdThunk,
    updateCartItemThunk,
    deleteCartItemThunk,
} from "@/redux/slices/CartItemSlice";
import { toast } from "react-toastify";
import ShippingModal from "@/components/ShippingModal";
import { createOrderFromCartThunk } from "@/redux/slices/OrderSlice";

import styles from "@/components/ShoppingCartByUserId/styles.module.scss";

const ShoppingCartByUserId = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [userId, setUserId] = useState<number | null>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [showShippingModal, setShowShippingModal] = useState(false);
    const router = useRouter();

    const { cartItems, loading } = useSelector((state: RootState) => state.cartItem);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                const id = parsedUser.UserId ? Number(parsedUser.UserId) : null;
                setUserId(id);
                if (id) {
                    dispatch(getCartItemsByUserIdThunk(id));
                }
            } catch (err) {
                console.error("Lỗi khi parse user:", err);
            }
        }
    }, [dispatch]);

    const handleQuantityChange = (cartItemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        const item = cartItems.find(item => item.CartItemId === cartItemId);
        if (!item) return;

        dispatch(updateCartItemThunk({ ...item, Quantity: newQuantity }))
            .unwrap()
            .then(() => toast.success("Cập nhật số lượng thành công"))
            .catch(err => toast.error("Lỗi" + err));
    };

    const handleDeleteItem = (cartItemId: number) => {
        dispatch(deleteCartItemThunk(cartItemId))
            .unwrap()
            .then(() => toast.success("Đã xóa sản phẩm khỏi giỏ"))
            .catch(err => toast.error("Lỗi" + err));
    };

    const toggleSelectItem = (cartItemId: number) => {
        setSelectedItems(prev =>
            prev.includes(cartItemId)
                ? prev.filter(id => id !== cartItemId)
                : [...prev, cartItemId]
        );
    };

    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            toast.warn("Bạn chưa chọn sản phẩm nào để thanh toán.");
            return;
        }
        const items = cartItems.filter(item => selectedItems.includes(item.CartItemId));
        console.log("Thanh toán các mục sau:", items);
        toast.success("Chuẩn bị thanh toán " + items.length + " sản phẩm!");

        setShowShippingModal(true);
    };

    const handleShippingConfirm = (address: string, phone: string) => {
        if (!userId) return toast.error("Không tìm thấy UserId");

        console.log("Đang tạo đơn hàng cho UserId:", userId);
        dispatch(createOrderFromCartThunk({
            userId,
            shippingInfo: { address, phone }
        }))
            .unwrap()
            .then((res) => {
                toast.success("Tạo đơn hàng thành công!");
                setSelectedItems([]);
                setShowShippingModal(false);

                const orderId = res.orderId;
                router.push(`/Payment?orderId=${orderId}`);
            })
            .catch((err) => {
                toast.error("Lỗi tạo đơn hàng: " + err);
            });
    };

    return (
        <div className={styles.container}>
            <h2>🛒 Giỏ hàng của bạn</h2>
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <div className={styles.content}>
                    {cartItems.length === 0 ? (
                        <p>Không có sản phẩm trong giỏ hàng.</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.CartItemId} className={styles.cartItem}>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.CartItemId)}
                                    onChange={() => toggleSelectItem(item.CartItemId)}
                                    className={styles.checkbox}
                                />
                                <div className={styles.productDetails}>
                                    <img
                                        src={item.Product?.ImageURL || "https://raw.githubusercontent.com/Quanghau123/Front-end_MilkTea/master/src/assets/Avatar/Avatar1.jpeg"}
                                        alt={item.Product?.ProductName || "Tên sản phẩm"}
                                        className={styles.productImage}
                                    />
                                    <div className={styles.productInfo}>
                                        <div className={styles.productName}>
                                            <h4>{item.Product?.ProductName || "Tên sản phẩm"}</h4>
                                        </div>
                                        <div className={styles.productDescription}>
                                            <p><strong>Mô Tả: </strong>{item.Product?.Description || "Không có mô tả"}</p>
                                        </div>
                                        <div className={styles.productPrice}>
                                            <p><strong>Giá: </strong>{item.Product?.Price ? `${item.Product.Price} VND` : "Giá không xác định"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.quantity}>
                                    <button onClick={() => handleQuantityChange(item.CartItemId, item.Quantity - 1)}>-</button>
                                    <span>{item.Quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.CartItemId, item.Quantity + 1)}>+</button>
                                </div>
                                <button className={styles.deleteBtn} onClick={() => handleDeleteItem(item.CartItemId)}>
                                    Xóa
                                </button>
                            </div>
                        ))
                    )}
                    {cartItems.length > 0 && (
                        <div className={styles.checkoutSection}>
                            <button className={styles.checkoutBtn} onClick={handleCheckout}>
                                Thanh toán các sản phẩm đã chọn
                            </button>
                        </div>
                    )}
                </div>
            )}

            {showShippingModal && (
                <ShippingModal
                    onClose={() => setShowShippingModal(false)}
                    onConfirm={handleShippingConfirm}
                    userId={userId}
                />
            )}
        </div>
    );
};

export default ShoppingCartByUserId;
