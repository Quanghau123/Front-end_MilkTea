import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/Header/Badger's Tea logo.png"
import styles from "@/components/Header/styles.module.scss"

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.yard}>
        <div className={styles.areaLeft}>
          <Link href="/" className={styles.linkLogo}>
            <Image src={Logo} alt="Logo" className={styles.logo} />
          </Link>
        </div>
        <div className={styles.areaRight}>
          <ul className={styles.ulNavbar}>
            <li className={styles.liNavbar}>
              <Link href="/" className={styles.linkNavbar}>TRANG CHỦ</Link>
            </li>
            <li className={styles.liNavbar}>
              <Link href="/Menu" className={styles.linkNavbar}>MENU</Link>
            </li>
            <li className={styles.liNavbar}>
              <Link href="/About" className={styles.linkNavbar}>GIỚI THIỆU</Link>
            </li>
            <li className={styles.liNavbar}>
              <Link href="/Promotion" className={styles.linkNavbar}>KHUYẾN MÃI</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;