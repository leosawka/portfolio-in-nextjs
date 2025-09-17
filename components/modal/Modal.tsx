import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Modal.module.css';

interface Props {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, title, onClose, children }: Props) {
  const titleId = useRef<string>(`modal-title-${Math.random().toString(36).slice(2)}`).current;
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setClosing(false);
    } else if (visible) {
      setClosing(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, visible]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.backdrop} ${styles.modalBackground} ${closing ? styles.out : ''}`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={`${styles.modal} ${closing ? styles.out : ''}`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {title && <h2 id={titleId} className={styles.title}>{title}</h2>}
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Close dialog"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
