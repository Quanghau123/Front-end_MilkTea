import Image from "next/image";
import bannerHomeone from "@/assets/Home/banner-Home-one.jpg";
import Menu from "@/assets/Home/menu.jpg"

import TeaCard from "@/components/TeaCard";
import ReviewCard from "@/components/ReviewCard"

import styles from "@/screens/Home/styles.module.scss"
import Link from "next/link";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.yard}>
          <div className={styles.areaBanner}>
            <div className={styles.banner}>
              <Image src={bannerHomeone} alt="BannerHomeone"></Image>
            </div>
          </div>

          <div className={styles.areaBody}>
            <div className={styles.titleBody}>
              <p>Món Mới Nổi Bật</p>
              <Link href="" className={styles.linkPage}>
                <span>Xem Tất Cả</span>
              </Link>
            </div>
            {/* <TeaCard /> */}
          </div>

          <div className={styles.areaBody}>
            <div className={styles.titleBody}>
              <p>Menu</p>
              <Link href="" className={styles.linkPage}>
                <span>Xem Tất Cả</span>
              </Link>
            </div>
            <div className={styles.menuBody}>
              <Image src={Menu} alt="Menu"></Image>
            </div>
          </div>

          <div className={styles.areaBody}>
            <div className={styles.titleBody}>
              <p>ĐÁNH GIÁ CỦA KHÁCH HÀNG VỀ BADGER'S</p>
              <Link href="" className={styles.linkPage}>
                <span>Xem Tất Cả</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
