import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./feed.module.css";
import OrdersList from "../components/orders-list/orders-list";
import OrdersListStats from "../components/orders-list-stats/orders-list-stats";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "../utils/hooks";

export const FeedPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`${styles.container}`}>
      <div className={`text text_type_main-large mb-5 mt-10`}>
        Лента заказов
      </div>
      <div className={`${styles.wrapper}`}>
        <OrdersList />
        <OrdersListStats />
      </div>
    </div>
  );
};
