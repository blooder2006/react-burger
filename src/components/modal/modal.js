import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const { children, onClose, header } = props;
  const checkEscape = (e) => {if (e.key === "Escape") { onClose() }}

  React.useEffect(() => {
    document.addEventListener("keydown", checkEscape);
    return () => {
      document.removeEventListener("keydown", checkEscape);
    };
  }, []);

  return ReactDOM.createPortal(
    <div onClick={onClose}>
      <ModalOverlay />
      <div className={`${styles.modal}`} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.closeIcon} mr-10 mt-15`}>
          <CloseIcon onClick={onClose} />{" "}
        </div>
        {header ? <div className={`${styles.modalHeader} text text_type_main-large mr-10 ml-10 mt-10`}>{header}</div> : null }
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  details: PropTypes.shape({
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
  }).isRequired,
};

export default Modal;