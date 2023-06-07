import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./burger-details.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useParams, useLocation } from "react-router-dom";
import { IBackground } from "../../utils/interfaces-and-types";
import { burgerStatuses } from "../../utils/burger-status";
import IngredientForBurgerOrder from "../ingredient-for-order/ingredient-for-order";
import { FEED_ENDPOINT, USER_ORDERS_ENDPOINT } from "../../utils/urls";
import { getCookie } from "../../utils/auth";
import { useDispatch, useSelector } from "../../utils/hooks";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/ws-actions";

const BurgerDetails: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const background: IBackground = location.state && location.state.background;
  const dispatch = useDispatch();
  let wsUrl: string = "";
  let isForOrders: boolean;

  if (location.pathname.includes("/profile/orders")) {
 
    isForOrders = true;
  } else {
   
    isForOrders = false;
  }

  if (!background) {
    if (location.pathname.includes("/profile/orders")) {
      wsUrl = `${USER_ORDERS_ENDPOINT}?token=${getCookie("accessToken")}`;
      isForOrders = true;
    }
    if (location.pathname.includes("/feed")) {
      wsUrl = FEED_ENDPOINT;
      isForOrders = false;
    }
  }

  React.useEffect(() => {
    if (wsUrl) {
      dispatch({
        type: WS_CONNECTION_START,
        payload: wsUrl,
      });
    }
    return () => {
      if (wsUrl) {
        dispatch({ type: WS_CONNECTION_CLOSED });
      }
    };
  }, [location]);

  let orders;
  const message = useSelector((store) => isForOrders ? store.wsReducer.messageOrders : store.wsReducer.message);

  if (message) {
    orders = message.orders;
  }

  const burgerFromSearch = orders?.find((item) => item._id === id);

  const { allIngredients } = useSelector(
    (store) => store.getAllIngredientsReducer
  );

  function getOccurrence(array: Array<string>, value: string) {
    return array.filter((v) => v === value).length;
  }

  let burgerPrice = 0;
  let filteredOrderIngredients: Array<string> = [];

  burgerFromSearch?.ingredients.forEach((orderIngredient: string | null) => {
    if (orderIngredient) {
      if (getOccurrence(filteredOrderIngredients, orderIngredient) === 0) {
        filteredOrderIngredients.push(orderIngredient);
      }
    }
  });

  const allIngredientIcons = filteredOrderIngredients.map((value) => {
    const { image_mobile, name, price } = allIngredients.find(
      (elem) => elem._id === value
    )!;
    const ingredientCount = getOccurrence(burgerFromSearch!.ingredients, value);
    burgerPrice = burgerPrice + price * ingredientCount;
    return {
      ingredientImage: image_mobile,
      ingredientName: name,
      ingredientPrice: price,
      ingredientCount: ingredientCount,
    };
  });

  const visibleIngredients = allIngredientIcons?.map(
    (el, index: number) => {
      if (el != undefined) {
        return (
          <IngredientForBurgerOrder
            key={index}
            iconSrc={el.ingredientImage}
            alt={el.ingredientName}
            price={el.ingredientPrice}
            name={el.ingredientName}
            count={el.ingredientCount}
          />
        );
      }
    }
  );

  if (!burgerFromSearch && id) {
    return null;
  }

  if (burgerFromSearch && id) {
    const { number, name, status, updatedAt } = burgerFromSearch;
    return (
      <div className={`${background ? null : styles.pageContainer} mb-10`}>
        <div
          className={`${
            !background ? null : `${styles.header} mt-10`
          }  text text_type_digits-default mb-10`}
        >
          #{number}
        </div>
        <div className={`${styles.leftAlign}`}>
          <div className={`text text_type_main-medium mb-3`}>{name}</div>

          <div
            className={`text text_type_main-small mb-15 ${
              status === "done" ? styles.status : null
            }`}
          >
            {burgerStatuses[status]}
          </div>
          <div className={`text text_type_main-medium mb-6 `}>Состав: </div>
          <div className={`mb-10 ${styles.ingredientList}`}>
            {visibleIngredients}
          </div>
          <div className={`${styles.orderHeader}`}>
            <FormattedDate
              className={`text text_type_main-default text_color_inactive`}
              date={new Date(updatedAt)}
            />
            <div className={`${styles.orderMainPrice}`}>
              <p className={`text text_type_digits-default`}> {burgerPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default BurgerDetails;
