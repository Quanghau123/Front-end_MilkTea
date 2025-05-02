export interface ProductProps {
    ProductId?: number;
    CategoryId: number | string;
    ProductName: string;
    Price: number | string;
    Description: string;
    ImageURL: string;
    Available: boolean;
}
