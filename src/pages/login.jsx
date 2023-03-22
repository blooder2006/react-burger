import React from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";

import styles from "./pages.module.css";

import { postLogin } from "../services/actions/actions";
import { BASE_URL, LOGIN_ENDPOINT } from "../utils/urls";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

export const LoginPage = () => {
  const [userPassword, setUserPassword] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");

  const { accessToken, refreshToken } = useSelector(
    (store) => store.loginLogoutReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    switch (e.target.name) {
      case "userPassword": {
        setUserPassword(e.target.value);
        break;
      }
      case "userEmail": {
        setUserEmail(e.target.value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginRequest = { password: userPassword, email: userEmail };
    dispatch(postLogin(`${BASE_URL}${LOGIN_ENDPOINT}`, loginRequest));
  };

  React.useEffect(() => {
    if (refreshToken && accessToken) {
      saveTokens(refreshToken, accessToken);

      navigate("/", { replace: true });
    }
  }, [refreshToken, accessToken]);

  return (
    <div className={`${styles.inputPage}`}>
      <p className="text text_type_main-medium">Вход</p>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className={`mt-6`}>
          <EmailInput
            name="userEmail"
            value={userEmail}
            onChange={handleChange}
          />
        </div>
        <div className={`mt-6`}>
          <PasswordInput
            name="userPassword"
            value={userPassword}
            onChange={handleChange}
          />
        </div>
        <div className={`mt-6 mb-20`}>
          <Button htmlType="submit">
            Войти
          </Button>
        </div>
      </form>
      <div className={`${styles.linkBox} mb-4`}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
        </p>
        <div>
          <a
            href="/register"
            className={`${styles.link} text text_type_main-default ml-2`}
          >
            Зарегистрироваться
          </a>
        </div>
      </div>
      <div className={`${styles.linkBox}`}>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </p>
        <div>
          <a
            href="/forgot-password"
            className={`${styles.link} text text_type_main-default ml-2`}
          >
            Восстановить пароль
          </a>
        </div>
      </div>
    </div>
  );
};