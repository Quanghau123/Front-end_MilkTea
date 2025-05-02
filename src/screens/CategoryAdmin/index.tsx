import CategoryManagement from "@/components/CategoryManagement"
import styles from "@/screens/CategoryAdmin/styles.module.scss"

const CategoryAdmin = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <CategoryManagement/>
            </div>
        </div>
    );
}

export default CategoryAdmin