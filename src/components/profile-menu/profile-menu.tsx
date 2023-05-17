import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./profile-menu.module.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ILogoutToken } from "../../services/actions/auth-actions";
import { postLogout } from "../../services/actions/auth-actions";
import { deleteCookie } from "../../utils/auth";
import { BASE_URL, LOGOUT_ENDPOINT } from "../../utils/urls";
import { DEL_USER_INFO } from "../../services/actions/user-actions";
import { useDispatch } from "../../utils/hooks";


export const ProfileMenu: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExitClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const logoutToken: ILogoutToken = {
      token: localStorage.getItem("refreshToken"),
    };
    await dispatch(postLogout(`${BASE_URL}${LOGOUT_ENDPOINT}`, logoutToken));
    dispatch({ type: DEL_USER_INFO });
    deleteCookie("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/", { replace: true });
  };

  return (
    <div className={`${styles.profileTabs}`}>
      <div className={`${styles.profileTab}`}>
        <Link
          to={{ pathname: `/profile` }}
          className={`${styles.tabLink} text text_type_main-medium ${
            location.pathname === "/profile"
              ? "text_color_primary"
              : "text_color_inactive"
          }`}
        >
          Профиль
        </Link>
      </div>
      <div className={`${styles.profileTab}`}>
        <Link
          to={{ pathname: `/profile/orders` }}
          className={`${styles.tabLink} text text_type_main-medium ${
            location.pathname.includes("/profile/orders")
              ? "text_color_primary"
              : "text_color_inactive"
          }`}
        >
          История заказов
        </Link>
      </div>
      <div className={`${styles.profileTab} mb-20`}>
        <Link
          to={{ pathname: `/` }}
          className={`${styles.tabLink} text text_type_main-medium text_color_inactive`}
          onClick={handleExitClick}
        >
          Выход
        </Link>
      </div>
      {location.pathname === "/profile/orders" ? (
        <p className={`text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      ) : (
        <p className={`text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      )}
    </div>
  );
};
