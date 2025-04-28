import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/Header/Badger's Tea logo.png";
import styles from "@/components/Header/styles.module.scss";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useState, useEffect } from "react";

const handleLogout = () => {
  document.cookie = "token=; path=/; max-age=0";
  window.location.href = "/AuthenticationPage";
};

const checkLoginStatus = () => {
  const token = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  return !!token;
};

const Header = () => {
  const [userName, setUserName] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser.UserName || "Anonymous");
    }

    setIsLoggedIn(checkLoginStatus());
  }, []);

  const renderMenuItems = () => {
    if (isLoggedIn) {
      return [
        { key: "username", label: <span style={{ fontWeight: 'bold' }}>{userName}</span> },
        { key: "logout", label: <a onClick={handleLogout} style={{ color: 'red' }}>Đăng xuất</a> },
      ];
    }
    return [{ key: "login", label: <Link href="/AuthenticationPage">Đăng nhập</Link> }];
  };

  return (
    <div className={styles.container}>
      <div className={styles.yard}>
        <div className={styles.areaLeft}>
          <Link href="/" className={styles.linkLogo}>
            <Image src={Logo} alt="Logo" className={styles.logo} />
          </Link>
        </div>

        <div className={styles.areaCentral}>
          <ul className={styles.ulNavbar}>
            <li className={styles.liNavbar}><Link href="/" className={styles.linkNavbar}>TRANG CHỦ</Link></li>
            <li className={styles.liNavbar}><Link href="/Menu" className={styles.linkNavbar}>MENU</Link></li>
            <li className={styles.liNavbar}><Link href="/About" className={styles.linkNavbar}>GIỚI THIỆU</Link></li>
            <li className={styles.liNavbar}><Link href="/Promotion" className={styles.linkNavbar}>KHUYẾN MÃI</Link></li>
          </ul>
        </div>

        <div className={styles.areaRight}>
          <Link href="/Cart" className={styles.iconLink}>
            <div className={styles.iconShoppingCartOutlined}>
              <ShoppingCartOutlined />
            </div>
          </Link>

          <Dropdown
            menu={{ items: renderMenuItems() }}
            trigger={['hover']}
            placement="bottom"
            onOpenChange={(open) => {
              if (open) setIsLoggedIn(checkLoginStatus());
            }}
          >
            <div className={styles.iconUserOutlined}>
              <UserOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
