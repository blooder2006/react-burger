import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./order-details.module.css";
import detailsLogo from "../../images/details-logo.svg";

import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { orderNumber } = useSelector((store) => ({
    orderNumber: store.orderReducer.orderNumber,
  }));

  return (
    <div className={`${styles.orderDetailsMain} mt-30`}>
      <div className={`${styles.digitsShadow} text_type_digits-large mb-8`}>
        {orderNumber}
      </div>
      <div className={`text text_type_main-medium mb-15`}>
        идентификатор заказа
      </div>
      <img
        className={`${styles.imageOrderDetails} mb-15`}
        src={detailsLogo}
        alt="logo"
      />
      <div className={`text text_type_main-default mb-2`}>
        Ваш заказ начали готовить
      </div>
      <div className={`text text_type_main-default text_color_inactive mb-30`}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
};

export default OrderDetails;
