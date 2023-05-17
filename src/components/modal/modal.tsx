import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot= document.getElementById("react-modals") as HTMLElement;

interface IModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({children, onClose }) => {
  const checkEscape = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", checkEscape);
    return () => {
      document.removeEventListener("keydown", checkEscape);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={`${styles.contaner}`} onClick={onClose}>
      <ModalOverlay />
      <div
        className={`${styles.modalBack}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.closeIcon} mr-10 mt-15`}>
          <CloseIcon onClick={onClose} type="primary" />{" "}
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

