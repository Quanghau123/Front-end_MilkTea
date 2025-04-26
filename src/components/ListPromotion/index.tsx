"use client"

import PromotionCard from "@/components/PromotionCard";
import { fetchPromotions } from "@/redux/slices/PromotionSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import styles from "@/components/ListPromotion/styles.module.scss";

const ListPromotion = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { promotions, loading, error } = useSelector((state: RootState) => state.promotion);
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchPromotions());
    }, [dispatch]);

    const handlePromotionClick = (promotionID: number) => {
        router.push(`/PromotionDetail/${promotionID}`);
    };

    if (loading) return <div>Loading promotions...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.listContainer}>
            {promotions.map((promotion) => (
                <div
                    key={promotion.PromotionId}
                    className={styles.cardWrapper}
                    onClick={() => handlePromotionClick(promotion.PromotionId)}
                >
                    <PromotionCard promotion={promotion} />
                </div>
            ))}
        </div>
    );
};

export default ListPromotion;
