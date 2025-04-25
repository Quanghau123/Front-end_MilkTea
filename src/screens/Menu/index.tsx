import Link from "next/link";

import Categories from "@/components/Categories"

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
                </div>
            </div>
        </div>
    );
};

export default Menu

