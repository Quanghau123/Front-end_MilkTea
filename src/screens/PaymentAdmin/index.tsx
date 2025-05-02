import PaymentManagement from "@/components/PaymentManagement"
import styles from "@/screens/PaymentAdmin/styles.module.scss"

const PaymentAdmin = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <PaymentManagement />
            </div>
        </div>
    );
}

export default PaymentAdmin