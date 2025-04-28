"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import bannerHomeone from "@/assets/Home/banner-Home-one.jpg";
import Menu from "@/assets/Home/menu.jpg";

import TopProducts from "@/components/TopProducts";
import ReviewForm from "@/components/ReviewForm";
import ListReview from "@/components/ListReview"
import Modal from "@/components/ModalImgMenu";

import styles from "@/screens/Home/styles.module.scss";
import Link from "next/link";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | StaticImageData | null>(null);

  const handleImageClick = (imageSrc: string | StaticImageData) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.yard}>
          <div className={styles.areaBanner}>
            <div className={styles.banner}>
              <Image
                src={bannerHomeone}
                alt="BannerHomeone"
                className={styles.bannerImage}
              />
            </div>
          </div>

          <div className={styles.areaBody}>
            <div className={styles.titleBody}>
              <p>Món Mới Nổi Bật</p>
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
                  onClick={() => handleImageClick(Menu)}
                />
                <span className={styles.zoomText}>Phóng To</span>
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
              <p>Đánh Giá Về BADGER'S Tea</p>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.contentBody}>
                <h2>Đánh Giá Để Cùng Hoàn Thiện Hơn Mỗi Ngày</h2>
                <p>
                  Tại BADGER'S Tea, chúng tôi luôn trân trọng những ý kiến đóng góp và phản hồi từ khách hàng. Mỗi đánh giá của bạn giúp chúng tôi hoàn thiện hơn và mang đến những trải nghiệm tốt nhất. Chúng tôi cam kết cải thiện chất lượng dịch vụ và sản phẩm, luôn lắng nghe và đáp ứng nhu cầu của bạn để mang lại sự hài lòng tuyệt đối.
                </p>
              </div>

              <div className={styles.menuBody}>
                <ReviewForm />
              </div>
            </div>
          </div>

          <div className={styles.areaBody}>
            <div className={styles.titleBody}>
              <p>Đánh Giá Của Khách Hàng Về BADGER'S</p>
            </div>
            <div className={styles.listReviewBody}>
              <ListReview />
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} imageSrc={selectedImage} altText="Image" />
    </div>
  );
};

export default Home;
