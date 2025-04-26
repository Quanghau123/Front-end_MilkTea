"use client";

import styles from "@/components/TopProducts/styles.module.scss";
import TeaCard from "@/components/TeaCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/slices/ProductSlice";

const TopProducts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const topProducts = products.slice(0, 3);

    return (
        <div className={styles.container}>
            {loading && <p>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && (
                <div className={styles.grid}>
                    {topProducts.map((product) => (
                        <TeaCard key={product.ProductId} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopProducts;
