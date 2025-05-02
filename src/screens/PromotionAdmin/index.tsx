import PromotionManagement from "@/components/PromotionManagement"
import styles from "@/screens/PromotionAdmin/styles.module.scss"

const PromotionAdmin = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <PromotionManagement/>
            </div>
        </div>
    );
}

export default PromotionAdmin