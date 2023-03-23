import React from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";

import styles from "./pages.module.css";

import { postRegisterUser } from "../services/actions/auth-actions";
import { BASE_URL, REGISTER_USER_ENDPOINT } from "../utils/urls";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

export const RegisterPage = () => {
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");

  const { accessToken, refreshToken } = useSelector(
    (store) => store.registerReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    switch (e.target.name) {
      case "userName": {
        setUserName(e.target.value);
        break;
      }
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
    const registerUserRequest = {
      name: userName,
      password: userPassword,
      email: userEmail,
    };
    dispatch(
      postRegisterUser(
        `${BASE_URL}${REGISTER_USER_ENDPOINT}`,
        registerUserRequest
      )
    );
  };

  React.useEffect(() => {
    if (refreshToken && accessToken) {
      saveTokens(refreshToken, accessToken);

      navigate("/", { replace: true });
    }
  }, [refreshToken, accessToken]);

  return (
    <div className={`${styles.inputPage}`}>
      <p className="text text_type_main-medium">Регистрация</p>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className={`mt-6`}>
          <Input
            placeholder={"Имя"}
            name="userName"
            value={userName}
            onChange={handleChange}
          />
        </div>
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
          <Button htmlType="submit" >
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className={`${styles.linkBox}`}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
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
