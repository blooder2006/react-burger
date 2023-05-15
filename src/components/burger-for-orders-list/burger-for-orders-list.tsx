import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-for-orders-list.module.css";
import { useLocation, Link } from "react-router-dom";
import { IBackground } from "../../utils/interfaces-and-types";
import { burgerStatuses } from "../../utils/burger-status";
import IngredientImage from "../ingredient-image/ingredient-image";
import { IBurgerForOrderListProps } from "../../utils/interfaces-and-types";
import { useSelector } from "../../utils/hooks";

const BurgerForOrderList: React.FC<IBurgerForOrderListProps> = ({
  orderId,
  orderName,
  orderNumber,
  orderStatus,
  orderIngredients,
  orderCreatedAt,
}) => {
  const location = useLocation();
  const background: IBackground = location.state && location.state.background;

  const { allIngredients } = useSelector(
    (store) => store.getAllIngredientsReducer
  );

  function getOccurrence(array: Array<string>, value: string) {
    return array.filter((v) => v === value).length;
  }

  let filteredOrderIngredients: Array<string> = [];

  // формируем массив айдишников ингридиентов, используемых в бургере, без дублирования
  orderIngredients.forEach((orderIngredient: string | null) => {
    if (orderIngredient) {
      if (getOccurrence(filteredOrderIngredients, orderIngredient) === 0) {
        filteredOrderIngredients.push(orderIngredient);
      }
    }
  });

  // фомируем массив иконок ингридиентов бургера и считаем его цену
  let burgerPrice = 0;
  const allIngredientIcons = filteredOrderIngredients.map((value) => {
    const { image_mobile, price } = allIngredients.find(
      (elem) => elem._id === value
    )!;

    const ingredientCount = getOccurrence(orderIngredients, value);

    burgerPrice = burgerPrice + price * ingredientCount;
    return {
      ingredientImage: image_mobile,
    };
  });

  const hiddenIcons = allIngredientIcons.length - 6;
  const visibleIngredientIcons = allIngredientIcons
    .slice(0, 6)
    .map((el, index: number) => {
      if (el != undefined) {
        return (
          <IngredientImage
            key={index}
            iconSrc={el.ingredientImage}
            alt={`burger ingredient`}
            overflow={!index ? hiddenIcons : 0}
            extraClass={`${styles.items_picture}`}
          />
        );
      }
    });

  return (
    <Link
      key={orderId}
      to={`${orderId}`}
      state={{ background: location }}
      className={`${styles.link}`}
    >
      <div className={`${styles.order}`}>
        <div className={`${styles.orderHeader}`}>
          <p className={`text text_type_digits-default`}>#{orderNumber}</p>

          <FormattedDate
            className={`text text_type_main-default text_color_inactive`}
            date={new Date(orderCreatedAt)}
          />
        </div>

        <p
          className={`text text_type_main-medium mt-6  ${
            location.pathname === "/profile/orders" ? `mb-2` : ` mb-6`
          }`}
        >
          {orderName}
        </p>
        {location.pathname === "/profile/orders" ? (
          <p
            className={`text text_type_main-default mb-6 ${
              orderStatus === "done" ? styles.readyStatus : null
            }`}
          >
            {burgerStatuses[orderStatus]}
          </p>
        ) : null}
        <div className={`${styles.orderMain}`}>
          <div>
            <div className={`${styles.items_list}`}>
              {visibleIngredientIcons}
            </div>
          </div>
          <div className={`${styles.orderMainPrice}`}>
            <p className={`text text_type_digits-default`}> {burgerPrice}</p>

            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BurgerForOrderList;
