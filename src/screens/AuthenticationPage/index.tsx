"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import styles from "@/screens/AuthenticationPage/styles.module.scss";
import { toast } from "react-toastify";

const AuthenticationPage = () => {
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    Email: "",
    UserPassword: "",
    UserName: "",
    Phone: "",
    Address: ""
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/Login", {
        Email: formData.Email,
        UserPassword: formData.UserPassword
      });

      if (data?.errCode === 0) {
        const { token, user } = data;
        localStorage.setItem("user", JSON.stringify(user));
        document.cookie = `token=${token}; path=/; max-age=86400; Secure; SameSite=Strict`;

        toast.success("Đăng nhập thành công!");

        if (user.Role === "admin") {
          router.push("/admin/category");
        } else {
          router.push("/");
        }

      } else {
        toast.error("Email hoặc mật khẩu không chính xác!");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/CreateNewUser", {
        ...formData,
        Role: "user"
      });

      if (response.data.errCode === 0) {
        toast.success("Đăng ký thành công!");
        router.push("/");
      } else {
        toast.error("Đăng ký thất bại!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={`${styles.authCardWrapper} ${isRegister ? styles.active : ""}`}>
        {/* Đăng nhập */}
        <div className={styles.authCardLeft}>
          <div className={styles.authCard}>
            <h2>Đăng nhập</h2>
            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="UserPassword">Mật khẩu</label>
                <input
                  type="password"
                  id="UserPassword"
                  name="UserPassword"
                  value={formData.UserPassword}
                  onChange={handleInputChange}
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <button type="submit" disabled={loading}>
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Đăng ký */}
        <div className={styles.authCardRight}>
          <div className={styles.authCard}>
            <h2>Đăng ký</h2>
            <form onSubmit={handleRegister}>
              <div className={styles.formGroup}>
                <label htmlFor="UserName">Tài khoản</label>
                <input
                  type="text"
                  id="UserName"
                  name="UserName"
                  value={formData.UserName}
                  onChange={handleInputChange}
                  placeholder="Nhập tên người dùng"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="UserPassword">Mật khẩu</label>
                <input
                  type="password"
                  id="UserPassword"
                  name="UserPassword"
                  value={formData.UserPassword}
                  onChange={handleInputChange}
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="Phone">Số điện thoại</label>
                <input
                  type="tel"
                  id="Phone"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="Address">Địa chỉ</label>
                <input
                  type="text"
                  id="Address"
                  name="Address"
                  value={formData.Address}
                  onChange={handleInputChange}
                  placeholder="Nhập địa chỉ"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <button type="submit" disabled={loading}>
                  {loading ? "Đang đăng ký..." : "Đăng ký"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Toggle */}
        <div className={styles.toggleContainer}>
          <div className={styles.toggle}>
            {isRegister ? (
              <div className={styles.toggleRight}>
                <h2>Xin chào</h2>
                <p>Bạn đã có tài khoản? Hãy đăng nhập ngay để tiếp tục khám phá!</p>
                <button onClick={() => setIsRegister(false)}>Đăng nhập</button>
              </div>
            ) : (
              <div className={styles.toggleLeft}>
                <h2>Xin chào</h2>
                <p>Bạn chưa có tài khoản? Đăng ký ngay để trải nghiệm những ưu đãi tuyệt vời!</p>
                <button onClick={() => setIsRegister(true)}>Đăng ký</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
