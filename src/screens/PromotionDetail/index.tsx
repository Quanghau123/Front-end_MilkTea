import Image from "next/image";

import PromotionDetailCard from "@/components/PromotionDetailCard";

import styles from "@/screens/PromotionDetail/styles.module.scss"
import Link from "next/link";

const PromotionDetail = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.yard}>
                    <div className={styles.areaBody}>
                        <PromotionDetailCard />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PromotionDetail;
