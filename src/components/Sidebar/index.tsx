"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";

import { AppstoreOutlined } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { TagOutlined } from '@ant-design/icons';
import { ProfileOutlined } from '@ant-design/icons';
import { CreditCardOutlined } from '@ant-design/icons';

const Index = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Danh Mục", icon: <AppstoreOutlined />, path: "/admin/category" },
    { name: "Sản Phẩm", icon: <ShoppingCartOutlined />, path: "/admin/product" },
    { name: "Chương Trình", icon: <TagOutlined />, path: "/admin/promotion" },
    { name: "Chi Tiết Chương Trình", icon: <ProfileOutlined />, path: "/admin/promotiondetail" },
    { name: "Thanh Toán", icon: <CreditCardOutlined />, path: "/admin/payment" },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>Admin</div>
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={pathname === item.path ? styles.active : ""}
          >
            <Link href={item.path}>
              <span className={styles.icon}>{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
