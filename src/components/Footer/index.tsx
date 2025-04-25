import Link from "next/link";

import {
    EnvironmentOutlined, PhoneOutlined,
    FacebookFilled,
} from "@ant-design/icons";

import styles from "@/components/Footer/styles.module.scss"

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.yard}>
                <div className={styles.areaLeft}>
                    <div className={styles.blockTitle}>
                        <span>Liên Hệ Với Chúng Tôi</span>
                    </div>
                    <div className={styles.blockAddress}>
                        <Link href="" className={styles.linkAddress}>
                            <span><EnvironmentOutlined style={{ marginRight: "10px" }} />Địa Chi Các Chỉ Nhánh</span>
                        </Link>
                    </div>

                    <div className={styles.blockPhone}>
                        <Link href="" className={styles.linkPhone}>
                            <span><PhoneOutlined style={{ marginRight: "10px" }} />0987654321</span>
                        </Link>
                    </div>
                </div>
                <div className={styles.areaBetween}>
                    <div className={styles.blockTitle}>
                        <span>Badger's Tea</span>
                    </div>
                    <div className={styles.blockContent}>
                        <span>
                            Trà Sữa Đài Loan Hương Vị Nhà Làm!<br />
                            thơm ngon, bổ dưỡng với menu<br />
                            đa dạng, giá cả hợp lý.
                        </span>
                    </div>
                    <div className={styles.blockFacebook}>
                        <Link href="" className={styles.linkFacebook}>
                            <FacebookFilled style={{ fontSize: "30px", color: "#1877F2" }} />
                        </Link>
                    </div>
                </div>
                <div className={styles.areaRight}>
                    <div className={styles.blockTitle}>
                        <span>Giờ Mở Cửa</span>
                    </div>
                    <div className={styles.blockContent}>
                        <span>
                            Hằng Ngày<br />
                            07:00 Am - 23:00 Pm
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Footer;