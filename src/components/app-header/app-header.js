import React from "react";
import styles from "./app-header.module.css";
import appStyles from "../app/app.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div>
          <Button
            htmlType="button"
            type="secondary"
            extraClass="pl-5 pr-5 mt-4 mb-4"
          >
            <a href="#" className={`${styles.navButton}`}>
              
              <BurgerIcon type="primary" />
              <span
                className={`text text_type_main-default text_color_primary`}
              >
                Конструктор
              </span>
            </a>
          </Button>
          <Button
            htmlType="button"
            type="secondary"
            extraClass="pl-5 pr-5 mt-4 mb-4"
          >
            <a href="#" className={`${styles.navButton}`}>
              <ListIcon type="secondary" />
              <span
                className={`text text_type_main-default text_color_inactive`}
              >
                Лента заказов
              </span>
            </a>
          </Button>
        </div>
        <div className={`${styles.logo}`}>
          <Logo />
        </div>
        <div className={`${appStyles.alignRight}`}>
          <Button
            htmlType="button"
            type="secondary"
            extraClass="pl-5 pr-5 mt-4 mb-4"
          >
            <a href="#" className={`${styles.navButton}`}>
              <ProfileIcon type="secondary" />
              <span
                className={`text text_type_main-default text_color_inactive`}
              >
                Личный кабинет
              </span>
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
