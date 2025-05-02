export interface PromotionDetailProps {
    DetailId?: number;
    PromotionId: number | string;
    DiscountType: string;
    Note: string;
    Content: string;
    PromotionTitle?: string;
    PromotionScription?: string;
    PromotionStartDate?: string;
    PromotionEndDate?: string;
    PromotionImageURL?: string;
}
