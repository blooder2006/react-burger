import React from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";

import styles from "./pages.module.css";

import { postResetPassword } from "../services/actions/actions";
import { BASE_URL, RESET_PSWD_ENDPOINT } from "../utils/urls";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmCode, setConfirmCode] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, errorForReset } = useSelector(
    (store) => store.passwordReducer
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const resetPasswordRequest = { password: newPassword, token: confirmCode };
    dispatch(
      postResetPassword(
        `${BASE_URL}${RESET_PSWD_ENDPOINT}`,
        resetPasswordRequest
      )
    );
    if (!loading && !errorForReset) {
      navigate("/", { replace: true });
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "newPassword": {
        setNewPassword(e.target.value);
        break;
      }
      case "confirmCode": {
        setConfirmCode(e.target.value);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <div className={`${styles.inputPage}`}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className={`mt-6`}>
          <PasswordInput
            placeholder={"Введите новый пароль"}
            name="newPassword"
            onChange={handleChange}
            value={newPassword}
          />
        </div>
        <div className={`mt-6`}>
          <Input
            placeholder={"Введите код из письма"}
            name="confirmCode"
            onChange={handleChange}
            value={confirmCode}
          />
        </div>
        <div className={`mt-6 mb-20`}>
          <Button htmlType="submit">
            Сохранить
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
