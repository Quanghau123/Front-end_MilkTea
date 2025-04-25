import Image from "next/image";
import banner from "@/assets/Promotion/banner.jpeg";

import PromotionCard from "@/components/PromotionCard";

import styles from "@/screens/Promotion/styles.module.scss"
import Link from "next/link";

const Promotion = () => {
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
                        <PromotionCard />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Promotion;
