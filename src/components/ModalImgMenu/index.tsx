import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from '@/components/ModalImgMenu/styles.module.scss';

interface ModalImgMenuProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | StaticImageData | null;
  altText: string;
}

const ModalImgMenu: React.FC<ModalImgMenuProps> = ({ isOpen, onClose, imageSrc, altText }) => {
  if (!isOpen || !imageSrc) return null;

  const isMenuImage = imageSrc === '/assets/Home/menu.jpg';

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <Image
          src={imageSrc}
          alt={altText}
          width={isMenuImage ? 1100 : 900}
          height={isMenuImage ? 1100 : 900}
          className={isMenuImage ? styles.fullImageLarge : styles.fullImage}
        />
      </div>
    </div>
  );
};

export default ModalImgMenu;
