import { useState } from "react";
import styles from "@/components/PromotionDetailCard/styles.module.scss";

const PromotionDetailCard = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    discountType: "percent",
    note: "",
    value: 0,
  });

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Promotion Detail:", form);
  };

  return (
    <form className={styles.promotionForm} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Chi tiết khuyến mãi</h2>

      <div className={styles.formGroup}>
        <label>Tiêu đề</label>
        <input
          type="text"
          value={form.title}
          onChange={e => handleChange("title", e.target.value)}
          placeholder="Giảm 20% cho đơn từ 100k"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Nội dung</label>
        <textarea
          value={form.content}
          onChange={e => handleChange("content", e.target.value)}
          placeholder="Áp dụng cho toàn bộ menu, đơn từ 100.000đ"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Loại khuyến mãi</label>
        <select
          value={form.discountType}
          onChange={e => handleChange("discountType", e.target.value)}
        >
          <option value="percent">Giảm theo %</option>
          <option value="amount">Giảm số tiền</option>
          <option value="free-item">Tặng món</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Giá trị khuyến mãi</label>
        <input
          type="number"
          value={form.value}
          onChange={e => handleChange("value", parseInt(e.target.value))}
          placeholder="VD: 20"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Ghi chú</label>
        <textarea
          value={form.note}
          onChange={e => handleChange("note", e.target.value)}
          placeholder="Chỉ áp dụng vào thứ 6 hàng tuần"
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Lưu khuyến mãi
      </button>
    </form>
  );
};

export default PromotionDetailCard;
