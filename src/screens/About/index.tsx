'use client';

import Banner_About_one from "@/assets/About/Banner_About2.jpeg";
import Image from "next/image";
import About_image1 from "@/assets/About/About_image1.jpeg";
import About_image2 from "@/assets/About/About_image2.jpeg";
import About_image3 from "@/assets/About/About_image3.jpeg";
import About_image4 from "@/assets/About/About_image4.jpeg";
import About_image5 from "@/assets/About/About_image5.jpeg";
import styles from "./styles.module.scss";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Image src={Banner_About_one} alt="bar-image" className={styles.img_BarAbout} />
        <div className={styles.BarTitleWrapper}>
          <div className={styles.BarText1}>
            Giới Thiệu Về chúng Tôi
          </div>
          <div className={styles.BarText2}>
            Hương vị độc đáo, đậm chất Badger’s
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.area_left}>
          <div className={styles.section_top}>
            <div className={styles.block_content}>
              <div className={styles.content_wrapper}>
                <div className={styles.title_text}>
                  <span className={styles.char_text}>H</span>
                  ành trình của Badger’s Tea bắt đầu từ niềm đam mê khám phá và tình yêu với sự đa dạng trong hương vị trà từ khắp nơi trên thế giới. Được thành lập vào năm 2010, Badger’s Tea ra đời với mong muốn mang đến những trải nghiệm trà sữa độc đáo, được tuyển chọn kỹ lưỡng – vượt xa khỏi những ly trà sữa thông thường.
                </div>
              </div>
            </div>
            <div className={styles.block_content}>
              <div className={styles.content_wrapper}>
                <div className={styles.title_text}>
                  Tại Badger’s Tea, mỗi ly trà đều là sự kết hợp hài hòa giữa nguyên liệu tươi ngon, công thức độc quyền và cảm hứng từ những chuyến đi đầy màu sắc. Chúng tôi không chỉ phục vụ trà sữa – chúng tôi kể những câu chuyện qua từng hương vị, mang đến không gian để bạn thư giãn, kết nối và tận hưởng từng khoảnh khắc ngọt ngào.
                </div>
              </div>
            </div>
          </div>
          <div className={styles.section_bottom}>
            <div className={styles.row_1}>
              <div className={styles.colum_2}>
                <Image src={About_image1} alt="image" className={styles.image} />
              </div>
              <div className={styles.colum_1}>
                <Image src={About_image2} alt="image" className={styles.image} />
              </div>
            </div>
            <div className={styles.row_2}>
              <div className={styles.colum_1}>
                <Image src={About_image3} alt="image" className={styles.image} />
              </div>
              <div className={styles.colum_1}>
                <Image src={About_image4} alt="image" className={styles.image} />
              </div>
              <div className={styles.colum_1}>
                <Image src={About_image5} alt="image" className={styles.image} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.area_right}>
          <div className={styles.section_top}>
            <div className={styles.contact_block}>
              <div className={styles.row}>
                <div className={styles.icon_contact}>
                  <EnvironmentOutlined />
                </div>
                <div className={styles.text_group}>
                  <div className={styles.text_title}>Địa Chỉ</div>
                  <div className={styles.text_content}>
                    51 Lê Thị Hồng - Hồ Chí Minh - Việt Nam
                  </div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.icon_contact}>
                  <PhoneOutlined />
                </div>
                <div className={styles.text_group}>
                  <div className={styles.text_title}>Số Điện Thoại</div>
                  <div className={styles.text_content}>
                    0386998866
                  </div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.icon_contact}>
                  <MailOutlined />
                </div>
                <div className={styles.text_group}>
                  <div className={styles.text_title}>EMAIL</div>
                  <div className={styles.text_content}>
                    quanghau@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.section_bottom}>
            <div className={styles.map_wrapper}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6955220337315!2d106.68456297480726!3d10.832849089326904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e1f3d96399%3A0xd172b6b57de07449!2zMTUgTmd1eeG7hW4gVmFuIELhuqNvLCBHaWFuZyBUw6JtLCBCw6xjaCBUaOG7pywgSOG7kyBDaMOtbmggMTI3MDAw!5e0!3m2!1svi!2s!4v1710212643321!5m2!1svi!2s"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default About;
