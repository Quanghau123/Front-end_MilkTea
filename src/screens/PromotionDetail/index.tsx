import Image from "next/image";
import banner from "@/assets/PromotionDetail/banner.jpeg";

import PromotionDetailCard from "@/components/PromotionDetailCard";

import styles from "@/screens/PromotionDetail/styles.module.scss"
import Link from "next/link";

const PromotionDetail = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.yard}>
                    <div className={styles.areaBanner}>
                        <div className={styles.banner}>
                            <Image src={banner} alt="BannerHomeone"></Image>
                        </div>
                    </div>

                    <div className={styles.areaBody}>
                        <div className={styles.titleBody}>
                            <p>KHUYẾN MÃI NỔI BẬT</p>
                        </div>
                        <PromotionDetailCard />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PromotionDetail;
