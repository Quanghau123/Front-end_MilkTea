"use client";

import Image from "next/image";
import styles from "@/components/TeaCard/styles.module.scss";
import { ProductProps } from "@/types/ProductProps";
import { ShoppingCartOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { createCartItemThunk } from "@/redux/slices/CartItemSlice";
import ShippingModal from "@/components/ShippingModal";
import { createOrderFromCartThunk } from "@/redux/slices/OrderSlice";
import { toast } from "react-toastify";

interface TeaCardProps {
    product: ProductProps;
}

const TeaCard = ({ product }: TeaCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [userId, setUserId] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [showShippingModal, setShowShippingModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserId(parsedUser.UserId ? Number(parsedUser.UserId) : null);
                console.log("Parsed User from localStorage:", parsedUser);
            } catch (err) {
                console.error("Lỗi khi parse user:", err);
            }
        }
    }, []);

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        if (!userId) {
            toast.warn("Vui lòng đăng nhập để thêm vào giỏ hàng.");
            return;
        }

        console.log("Thêm vào giỏ hàng:", {
            userId,
            productId: product.ProductId,
            quantity,
        });

        dispatch(
            createCartItemThunk({
                UserId: userId,
                ProductId: product.ProductId,
                Quantity: quantity,
            })
        )
            .unwrap()
            .then(() => {
                toast.success("Đã thêm vào giỏ hàng!");
            })
            .catch((err) => {
                console.error("Lỗi khi thêm vào giỏ hàng:", err);
                toast.error("Lỗi khi thêm vào giỏ: " + err);
            });
    };

    const handleBuyNow = (address: string, phone: string) => {
        if (!userId) {
            toast.error("Không tìm thấy UserId");
            return;
        }

        dispatch(
            createCartItemThunk({
                UserId: userId,
                ProductId: product.ProductId,
                Quantity: quantity,
            })
        )
            .unwrap()
            .then(() => {
                return dispatch(
                    createOrderFromCartThunk({
                        userId,
                        shippingInfo: { address, phone },
                    })
                ).unwrap();
            })
            .then((res) => {
                toast.success("Tạo đơn hàng thành công!");
                setShowShippingModal(false);
                router.push(`/Payment?orderId=${res.orderId}`);
            })
            .catch((err) => {
                toast.error("Lỗi tạo đơn hàng: " + err);
            });
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.areaTop}>
                        <Image
                            src={product.ImageURL || "/default.jpg"}
                            alt={product.ProductName}
                            fill
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.areaBottom}>
                        <div className={styles.blockTitle}>
                            <span>{product.ProductName}</span>
                        </div>
                        <div className={styles.sectionMiddle}>
                            <div className={styles.blockPrice}>
                                <span>{product.Price.toLocaleString()} VND</span>
                            </div>
                            <div className={styles.quantityControls}>
                                <button onClick={decreaseQuantity}>
                                    <MinusOutlined />
                                </button>
                                <span>{quantity}</span>
                                <button onClick={increaseQuantity}>
                                    <PlusOutlined />
                                </button>
                            </div>
                        </div>
                        <div className={styles.blockButton}>
                            <button
                                className={styles.addToCartButton}
                                onClick={handleAddToCart}
                            >
                                <ShoppingCartOutlined />
                            </button>
                            <button
                                className={styles.buyNowButton}
                                onClick={() => {
                                    console.log("MUA NGAY được nhấn!");
                                    setShowShippingModal(true);
                                }}
                            >
                                MUA NGAY
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showShippingModal && (
                <ShippingModal
                    onClose={() => {
                        console.log("ShippingModal đóng");
                        setShowShippingModal(false);
                    }}
                    onConfirm={handleBuyNow}
                    userId={userId}
                />
            )}
        </>
    );
};

export default TeaCard;
