import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

import { HIDE_MODAL } from "../../services/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("react-modals");

const Modal = () => {
  const navigate = useNavigate();
  const { modalContent, details, useNavBackStep } = useSelector(
    (store) => store.modalReducer
  );

  const dispatch = useDispatch();
  const onClose = () => {
    if (useNavBackStep) {
      navigate(-1);
    }
    dispatch({ type: HIDE_MODAL });
  };

  const checkEscape = (e) => {
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
      <div className={`${styles.modal}`} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.closeIcon} mr-10 mt-15`}>
          <CloseIcon onClick={onClose} />{" "}
        </div>
        {React.createElement(modalContent, { ...details }, null)}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
