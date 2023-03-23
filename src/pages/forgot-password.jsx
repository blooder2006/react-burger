import React from "react";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";

import styles from "./pages.module.css";

import { postForgotPassword } from "../services/actions/password-actions";
import { BASE_URL, FORGOT_PSWD_ENDPOINT } from "../utils/urls";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordPage = () => {
  const [currentEmail, setCurrentEmail] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, errorForForgot } = useSelector(
    (store) => store.passwordReducer
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEmail) {
      dispatch(
        postForgotPassword(`${BASE_URL}${FORGOT_PSWD_ENDPOINT}`, currentEmail)
      );

      if (!loading && !errorForForgot) {
        navigate("/reset-password", {
          replace: false,
          state: { fromForgot: true },
        });
      }
    }
  };

  const handleEmailChange = (e) => {
    setCurrentEmail(e.target.value);
  };

  return (
    <div className={`${styles.inputPage}`}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className={`mt-6`}>
          <EmailInput
            placeholder={"Укажите e-mail"}
            onChange={handleEmailChange}
            value={currentEmail}
          />
        </div>
        <div className={`mt-6 mb-20`}>
          <Button htmlType="submit">
            Восстановить
          </Button>
        </div>
        </form>
      <div className={`${styles.linkBox}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <div>
          <a
            href="/login"
            className={`${styles.link} text text_type_main-default ml-2`}
          >
            Войти
          </a>
        </div>
      </div>
    </div>
  );
};
