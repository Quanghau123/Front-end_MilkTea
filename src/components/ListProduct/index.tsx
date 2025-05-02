"use client"

import styles from "@/components/ListProduct/styles.module.scss";
import TeaCard from "../TeaCard";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/slices/ProductSlice";
import { useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ListProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error, currentPage, totalPages } = useSelector((state: RootState) => state.product);

    const [page, setPageState] = useState<number>(currentPage || 1); 
    const itemsPerPage = 6; 

    const searchParams = useSearchParams();
    const categoryID = searchParams.get('category');

    useEffect(() => {
        dispatch(fetchProducts({ page, limit: itemsPerPage }));
    }, [dispatch, page]);

    const filteredProducts = products.filter((product) => {
        if (!categoryID || categoryID === "all") return true;
        return product.CategoryId === parseInt(categoryID);
    });

    const handlePageChange = (page: number) => {
        if (page !== currentPage) setPageState(page);
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const totalNumbers = 5;

        if (totalPages <= totalNumbers) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            pages.push(1);
            if (startPage > 2) pages.push("...");
            for (let i = startPage; i <= endPage; i++) pages.push(i);
            if (endPage < totalPages - 1) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

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

            {!loading && !error && totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={styles.paginationButton}
                    >
                        <FaChevronLeft />
                    </button>

                    {getPageNumbers().map((page, index) => (
                        <button
                            key={index}
                            onClick={() => typeof page === "number" && handlePageChange(page)}
                            disabled={page === currentPage}
                            className={styles.paginationButton}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={styles.paginationButton}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ListProduct;
