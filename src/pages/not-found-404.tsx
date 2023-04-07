import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./pages.module.css";

export const NotFoundPage: React.FC   = () => {
  return (
    <div className={`${styles.inputPage}`}>
      <p className="text text_type_main-medium">404 - Страница не найдена</p>
    </div>
  );
};
