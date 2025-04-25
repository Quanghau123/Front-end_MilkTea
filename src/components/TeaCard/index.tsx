import Image from "next/image";
import styles from "./styles.module.scss";
import TeaCard1 from "@/assets/TeaCard/TeaCard1.jpeg";

const TeaCard = () => {
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
                    <div className={styles.blockTitle}>
                        <span>Trà sữa socola</span>
                    </div>
                    <div className={styles.blockPrice}>
                        <span>28,000 đ</span>
                    </div>
                    <div className={styles.blockButton}>
                        <button>MUA NGAY</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeaCard;
