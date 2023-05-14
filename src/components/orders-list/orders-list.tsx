import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./orders-list.module.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { IRootState } from "../../utils/interfaces-and-types";
import BurgerForOrderList from "../burger-for-orders-list/burger-for-orders-list";
import { useDispatch } from "../../utils/hooks";
import {
  FEED_ENDPOINT,
  USER_ORDERS_ENDPOINT,
  BASE_URL,
  REFRESH_TOKEN_ENDPOINT,
} from "../../utils/urls";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/ws-actions";
import { getCookie } from "../../utils/auth";
import { refreshTokenRequest, saveTokens } from "../../utils/auth";

const OrdersList: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let wsUrl: string;

  location.pathname === "/profile/orders"
    ? (wsUrl = `${USER_ORDERS_ENDPOINT}?token=${getCookie("accessToken")}`)
    : (wsUrl = FEED_ENDPOINT);

  React.useEffect(() => {
    (async () => {
      const { refreshToken, accessToken } = await refreshTokenRequest(
        BASE_URL,
        REFRESH_TOKEN_ENDPOINT
      );
      saveTokens(refreshToken, accessToken.split("Bearer ")[1]);
    })();

    dispatch({
      type: WS_CONNECTION_START,
      payload: wsUrl,
    });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [location]);

  let orders;

  const message = useSelector((store: IRootState) => store.wsReducer.message);

  if (message) {
    orders = message.orders;
  }

  return (
    <div
      className={`${styles.ingredientList} pr-2 ${
        location.pathname === "/profile/orders"
          ? `${styles.ingredientListProfilePage} ml-15 mt-10`
          : null
      } `}
    >
      {orders
        ? orders.map((elem) => (
            <BurgerForOrderList
              key={elem._id}
              orderId={elem._id}
              orderName={elem.name}
              orderStatus={elem.status}
              orderNumber={elem.number}
              orderIngredients={elem.ingredients}
              orderCreatedAt={elem.createdAt}
            />
          ))
        : null}
    </div>
  );
};

export default OrdersList;
