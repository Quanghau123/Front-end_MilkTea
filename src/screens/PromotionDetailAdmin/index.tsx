import PromotionDetailManagement from "@/components/PromotionDetailManagement"
import styles from "@/screens/PromotionDetailAdmin/styles.module.scss"

const PromotionDetailAdmin = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <PromotionDetailManagement/>
            </div>
        </div>
    );
}

export default PromotionDetailAdmin