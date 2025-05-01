import PaymentForm from "@/components/PaymentForm";
import styles from "@/screens/Payment/styles.module.scss";
const Payment = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <PaymentForm />
      </div>
    </div>
  );
};
export default Payment;
