import Image from "next/image";
import styles from "./styles.module.scss";
import TeaCard1 from "@/assets/TeaCard/TeaCard1.jpg";

const PromotionCard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.areaTop}>
                    <Image
                        src={TeaCard1}
                        alt="Trà sữa socola"
                        fill
                        className={styles.image}
                    />
                </div>
                <div className={styles.areaBottom}>
                    <div className={styles.blockStartDate}>
                        <span>14/02/2025</span>
                    </div>
                    <div className={styles.blockEndDate}>
                        <span>20/02/2025</span>
                    </div>
                    <div className={styles.blockTitle}>
                        <span>Trà sữa socola</span>
                    </div>
                    <div className={styles.blockdescription}>
                        <span>Giảm giá trà sửa 50%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionCard;
