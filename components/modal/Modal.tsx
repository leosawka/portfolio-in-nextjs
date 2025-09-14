"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "../../styles/Modal.module.css";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdrop?: boolean;
};

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
  closeOnBackdrop = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useRef<string>(`modal-title-${Math.random().toString(36).slice(2)}`).current;

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const el = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    el?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !el) return;
      const focusable = el.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };

    el?.addEventListener("keydown", trap);
    return () => {
      el?.removeEventListener("keydown", trap);
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modal = (
    <div
      className={styles.backdrop}
      aria-hidden="false"
      onMouseDown={(e) => {
        if (!closeOnBackdrop) return;
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={styles.modal}
        ref={dialogRef}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
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
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
