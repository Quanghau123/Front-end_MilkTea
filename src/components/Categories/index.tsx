"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCategories } from "@/redux/slices/CategorySlice";
import { CategoryProps } from "@/types/CategoryProps";

import styles from "@/components/Categories/styles.module.scss";

const Categories = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.category);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryClick = (categoryID: number) => {
        router.push(`?category=${categoryID}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.navBar}>
                    <ul className={styles.ulNavbar}>
                        <li
                            className={styles.liNavbar}
                            onClick={() => router.push(`?category=all`)}
                        >
                            <span className={styles.linkNavbar}>TẤT CẢ</span>
                        </li>

                        {!loading && !error && categories.map((category: CategoryProps) => (
                            <li
                                key={category.CategoryId}
                                className={styles.liNavbar}
                                onClick={() => handleCategoryClick(category.CategoryId)}
                            >
                                <span className={styles.linkNavbar}>
                                    {category.CategoryName.toUpperCase()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Categories;
