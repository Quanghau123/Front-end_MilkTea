import Image from "next/image";
import { PromotionProps } from "@/types/PromotionProps";
import styles from "@/components/PromotionCard/styles.module.scss";

interface PromotionCardProps {
  promotion: PromotionProps;
}

const PromotionCard = ({ promotion }: PromotionCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.areaTop}>
          <Image
            src={promotion.ImageURL}
            alt={promotion.Title}
            fill
            className={styles.image}
          />
        </div>
        <div className={styles.areaBottom}>
          <div className={styles.blockStartDate}>
            <span>Ngày Bắt Đầu: {formatDate(promotion.StartDate)}</span>
          </div>
          <div className={styles.blockEndDate}>
            <span>Ngày Kết Thúc: {formatDate(promotion.EndDate)}</span>
          </div>
          <div className={styles.blockTitle}>
            <span>{promotion.Title}</span>
          </div>
          <div className={styles.blockdescription}>
            <span>{promotion.Scription}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
