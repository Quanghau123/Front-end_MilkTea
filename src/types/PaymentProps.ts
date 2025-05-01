export interface PaymentProps {
    PaymentId: number;
    OrderId: number;
    UserId: number;
    PaymentMethod: string;
    TransactionId?: string;
    Amount: number;
    PaymentStatus: boolean;
}
