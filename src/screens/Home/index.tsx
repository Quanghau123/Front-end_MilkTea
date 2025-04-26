"use client"

import { useState } from "react";
import Image from "next/image";
import bannerHomeone from "@/assets/Home/banner-Home-one.jpg";
import Menu from "@/assets/Home/menu.jpg";

import TopProducts from "@/components/TopProducts";
import ReviewCard from "@/components/ReviewCard";

import styles from "@/screens/Home/styles.module.scss";
import Link from "next/link";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.yard}>
          <div className={styles.areaBanner}>
            <div className={styles.banner}>
              <Image src={bannerHomeone} alt="BannerHomeone" />
            </div>
          </div>

          <div className={styles.areaBody}>
            <div className={styles.titleBody}>
              <p>Món Mới Nổi Bật</p>
              <Link href="" className={styles.linkPage}>
                <span>Xem Tất Cả</span>
              </Link>
            </div>
            <TopProducts />
          </div>

          <div className={styles.areaBody}>
            <div className={styles.titleBody}>
              <p>Menu Của Chúng Tôi</p>
              <Link href="" className={styles.linkPage}>
                <span>Xem Tất Cả</span>
              </Link>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.menuBody}>
                <Image
                  src={Menu}
                  alt="Menu"
                  className={styles.menuImage}
                />
              </div>

              <div className={styles.contentBody}>
                <h2>Đa Dạng Thức Uống Trong Menu</h2>
                <p>
                  Tại BADGER'S Tea, chúng tôi tự hào giới thiệu thực đơn phong phú với hơn 40 loại thức uống,
                  từ trà sữa truyền thống cho đến những sáng tạo độc đáo. Mỗi ly nước đều được chăm chút kỹ lưỡng,
                  mang đậm dấu ấn riêng biệt trong từng hương vị.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.areaBody}>
            <div className={styles.titleBody}>
              <p>Đánh Giá Của Khách Hàng Về BADGER'S</p>
              <Link href="" className={styles.linkPage}>
                <span>Xem Tất Cả</span>
              </Link>
            </div>
            {/* ReviewCard hoặc các phần khác */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
