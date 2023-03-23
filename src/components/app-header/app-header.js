import React from "react";
import styles from "./app-header.module.css";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import { useLocation, Link } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={`${styles.flexContainer}`}>
          <Link
            to={{ pathname: `/` }}
            className={`${styles.flexLink} mt-4 mb-4`}
          >
            <Button
              htmlType="button"
              type="secondary"
              extraClass={`${styles.navButton} pl-5 pr-5 pt-4 pb-4`}
            >
              <BurgerIcon
                type={location.pathname === "/" ? "primary" : "secondary"}
              />
              <span
                className={`text text_type_main-default ${
                  location.pathname === "/"
                    ? "text_color_primary"
                    : "text_color_inactive"
                }`}
              >
                Конструктор
              </span>
            </Button>{" "}
          </Link>
          <Link
            to={{ pathname: `/` }}
            className={`${styles.flexLink} mt-4 mb-4`}
          >
            <Button
              htmlType="button"
              type="secondary"
              extraClass={`${styles.navButton} pl-5 pr-5 pt-4 pb-4`}
            >
              <ListIcon type="secondary" />
              <span
                className={`text text_type_main-default text_color_inactive`}
              >
                Лента заказов
              </span>
            </Button>
          </Link>
        </div>
        <div className={`${styles.logo}`}>
          <Logo />
        </div>
        <div className={`${styles.flexRight}`}>
          <Link
            to={{ pathname: `/profile` }}
            className={`${styles.flexLink} mt-4 mb-4`}
          >
            <Button
              htmlType="button"
              type="secondary"
              extraClass={`${styles.navButton} pl-5 pr-5 pt-4 pb-4`}
            >
              <ProfileIcon
                type={
                  location.pathname.includes("/profile")
                    ? "primary"
                    : "secondary"
                }
              />
              <span
                className={`text text_type_main-default ${
                  location.pathname.includes("/profile")
                    ? "text_color_primary"
                    : "text_color_inactive"
                }`}
              >
                Личный кабинет
              </span>
            </Button>{" "}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
