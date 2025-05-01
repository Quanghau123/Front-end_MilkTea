import ShoppingCartByUserId from "@/components/ShoppingCartByUserId"
import styles from "@/screens/ShoppingCart/styles.module.scss"

const ShoppingCart = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <ShoppingCartByUserId />
            </div>
        </div>
    );
}

export default ShoppingCart