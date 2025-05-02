import ProductManagement from "@/components/ProductManagement"
import styles from "@/screens/ProductAdmin/styles.module.scss"

const ProductAdmin = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <ProductManagement />
            </div>
        </div>
    );
}

export default ProductAdmin