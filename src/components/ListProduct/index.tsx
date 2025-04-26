"use client";

import styles from "@/components/ListProduct/styles.module.scss";
import TeaCard from "../TeaCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/slices/ProductSlice";
import { useSearchParams } from "next/navigation";

const ListProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.product);

    const searchParams = useSearchParams();
    const categoryID = searchParams.get('category');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const filteredProducts = products.filter((product) => {
        if (!categoryID || categoryID === "all") return true;
        return product.CategoryId === parseInt(categoryID);
    });

    return (
        <div className={styles.container}>
            {loading && <p>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && filteredProducts.length === 0 && (
                <p className={styles.noProductsMessage}>Không có sản phẩm nào.</p>
            )}
            <div className={styles.grid}>
                {!loading && !error && filteredProducts.map((product) => (
                    <TeaCard key={product.ProductId} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ListProduct;
