import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./orders-list-stats.module.css";
import { useSelector } from "../../utils/hooks";
import { useLocation } from "react-router-dom";

const OrdersListStats: React.FC = () => {
  const location = useLocation();
  const message = useSelector((store) => store.wsReducer.message);

  if (message) {
    const { orders, total, totalToday } = message;

    const doneOrders = orders
      .filter((elem) => elem.status === "done")
      .slice(0, 10);
    const pendingOrders = orders
      .filter((elem) => elem.status === "pending")
      .slice(0, 10);

    return (
      <div className={`${styles.container}`}>
        <div className={`${styles.orders}`}>
          <div className={`${styles.ordersContainer}`}>
            <div className={`text text_type_main-medium mb-6 mr-9`}>
              Готовы:
            </div>
            <div
              className={`${styles.ordersList} ${styles.ordersReadyList} mb-15`}
            >
              {doneOrders?.map((elem, index) => {
                return (
                  <div
                    key={index}
                    className={`text text_type_digits-default mb-2`}
                  >
                    {elem.number}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={`${styles.ordersContainer}`}>
            <div className={`text text_type_main-medium mb-6`}>В работе:</div>
            <div className={`${styles.ordersList} mb-15`}>
              {pendingOrders?.map((elem, index) => {
                return (
                  <div
                    key={index}
                    className={`text text_type_digits-default mb-2`}
                  >
                    {elem.number}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <div className={`text text_type_main-medium`}>
            Выполнено за все время:
          </div>
          <div className={`${styles.statsGlow} text text_type_digits-large`}>
            {total}
          </div>
        </div>
        <div>
          <div className={`text text_type_main-medium`}>
            Выполнено за сегодня:
          </div>
          <div className={`${styles.statsGlow} text text_type_digits-large`}>
            {totalToday}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default OrdersListStats;
