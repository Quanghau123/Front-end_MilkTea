import React, { useState } from "react";
import Image from "next/image";
import { ProductProps } from "@/types/ProductProps";
import styles from "@/components/TopProducts/styles.module.scss";

interface TeaCardWithEffectProps {
  product: ProductProps;
}

const TeaCardWithEffect: React.FC<TeaCardWithEffectProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.cardWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${styles.card} ${isHovered ? styles.flip : ""}`}>
        {/* Mặt trước của thẻ */}
        <div className={styles.front}>
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
                <div className={styles.blockPrice}>
                  <span>{product.Price.toLocaleString()} đ</span>
                </div>
                <div className={styles.blockButton}>
                  <button>MUA NGAY</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mặt sau của thẻ */}
        <div className={styles.back}>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.blockTitle}>
                <span>{product.ProductName}</span>
              </div>
              <div className={styles.blockDescription}>
                <span>{product.Description || "Mô tả không có sẵn"}</span>
              </div>
              <div className={styles.blockPrice}>
                <span>{product.Price.toLocaleString()} đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaCardWithEffect;
