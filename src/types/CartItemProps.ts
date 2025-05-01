import { ProductProps } from "@/types/ProductProps"

export interface CartItemProps {
    CartItemId: number;
    UserId: number;
    ProductId: number;
    Quantity: number;
    Product: ProductProps;
}
