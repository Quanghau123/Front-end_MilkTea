import Link from "next/link";

import Categories from "@/components/Categories";
import ListProducts from "@/components/ListProduct";

import styles from "@/screens/Menu/styles.module.scss"

const Menu = () => {
    return (
        <div className={styles.container}>
            <div className={styles.yard}>
                <div className={styles.areaLeft}>
                    <div className={styles.titleMenu}>
                        <span>MENU</span>
                    </div>
                </div>
                <div className={styles.areaRight}>
                    <Categories />
                    <ListProducts />
                </div>
            </div>
        </div>
    );
};

export default Menu

