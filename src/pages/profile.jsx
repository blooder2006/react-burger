import React from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";

import styles from "./pages.module.css";
import {
  postLogout,
  DEL_USER_INFO,
  patchUser,
} from "../services/actions/actions";
import { BASE_URL, LOGOUT_ENDPOINT, USER_INFO_ENDPOINT } from "../utils/urls";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../utils/auth";
import { useLocation } from "react-router-dom";

export const ProfilePage = () => {
  const location = useLocation();
  const [userPassword, setUserPassword] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [buttonsAreHidden, setButtonsAreHidden] = React.useState(true);
  const { loading, error } = useSelector((store) => store.loginLogoutReducer);
  const { userProfile } = useSelector((store) => store.profileReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (userProfile) {
      setUserEmail(userProfile.email);
      setUserName(userProfile.name);
    }
  }, [userProfile]);

  React.useEffect(() => {
    if (userProfile) {
      if (
        userName !== userProfile.name ||
        userEmail !== userProfile.email ||
        userPassword !== ""
      ) {
        setButtonsAreHidden(false);
      }
      if (
        userName === userProfile.name &&
        userEmail === userProfile.email &&
        userPassword === ""
      ) {
        setButtonsAreHidden(true);
      }
    }
  }, [userPassword, userEmail, userName]);

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
      case "userName": {
        setUserName(e.target.value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleCancelClick = () => {
    setUserEmail(userProfile.email);
    setUserName(userProfile.name);
    setUserPassword("");
  };

  const handleSaveClick = () => {
    const userAttrs = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };
    dispatch(patchUser(`${BASE_URL}${USER_INFO_ENDPOINT}`, userAttrs));
  };

  const handleExitClick = () => {
    const logoutToken = localStorage.getItem("refreshToken");
    dispatch(postLogout(`${BASE_URL}${LOGOUT_ENDPOINT}`, logoutToken));
    if (!loading && !error) {
      dispatch({
        type: DEL_USER_INFO,
      });
      deleteCookie("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <div className={`${styles.profileTabs}`}>
        <div className={`${styles.profileTab}`}>
          <a
            href="/profile"
            className={`${styles.tabLink} text text_type_main-medium ${
              location.pathname === "/profile"
                ? "text_color_primary"
                : "text_color_inactive"
            }`}
          >
            Профиль
          </a>
        </div>
        <div className={`${styles.profileTab}`}>
          <a
            href="/profile/orders"
            className={`${styles.tabLink} text text_type_main-medium ${
              location.pathname.includes("/profile/orders")
                ? "text_color_primary"
                : "text_color_inactive"
            }`}
          >
            История заказов
          </a>
        </div>
        <div className={`${styles.profileTab} mb-20`}>
          <a
            href=""
            className={`${styles.tabLink} text text_type_main-medium text_color_inactive`}
            onClick={handleExitClick}
          >
            Выход
          </a>
        </div>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={`${styles.profilePage}`}>
        {location.pathname === "/profile" ? (
          <form onSubmit={handleSaveClick}>
            <div className={`${styles.profileInputs}`}>
              <div>
                <EmailInput
                  placeholder={"Имя"}
                  name="userName"
                  value={userName}
                  onChange={handleChange}
                  isIcon={true}
                  error={false}
                />
              </div>
              <div className={`mt-6`}>
                <EmailInput
                  placeholder={"Логин"}
                  name="userEmail"
                  value={userEmail}
                  onChange={handleChange}
                  isIcon={true}
                />
              </div>
              <div className={`mt-6`}>
                <PasswordInput
                  placeholder={"Пароль"}
                  name="userPassword"
                  value={userPassword}
                  onChange={handleChange}
                  icon={"EditIcon"}
                  error={false}
                />
              </div>
            </div>

            {buttonsAreHidden ? null : (
              <div className={`${styles.bottomButtons} mt-6`}>
                <div>
                  <Button
                    htmlType="button"
                    type="secondary"
                    onClick={handleCancelClick}
                  >
                    Отмена
                  </Button>
                </div>
                <div>
                  <Button
                    htmlType="submit"
                    type="primary"                   
                  >
                    Сохранить
                  </Button>
                </div>
              </div>
            )}
          </form>
        ) : null}
      </div>
    </>
  );
};
