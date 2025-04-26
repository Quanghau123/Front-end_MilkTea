import Image from "next/image";
import styles from "./styles.module.scss";
import { ProductProps } from "@/types/ProductProps";

interface TeaCardProps {
    product: ProductProps;
}

const TeaCard = ({ product }: TeaCardProps) => {
    return (
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
    );
};

export default TeaCard;
