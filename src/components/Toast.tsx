import React from 'react';
import styles from '../styles/Toast.module.css';

interface ToastProps {
  message: string;
  isError?: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, isError }) => {
  return (
    <div className={`${styles.toast} ${isError ? styles.error : styles.success}`}>
      {message}
    </div>
  );
};

export default Toast;
