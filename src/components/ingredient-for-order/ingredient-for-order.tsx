import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-for-order.module.css";
import { IIngredientForBurgerOrderProps } from "../../utils/interfaces-and-types";

const IngredientForBurgerOrder: React.FC<IIngredientForBurgerOrderProps> = ({
  iconSrc,
  alt,
  price,
  name,
  count,
}) => {
  return (
    <div className={`${styles.ingredientForOrder} mb-4`}>
      <div className={`${styles.iconName}`}>
        <div className={`${styles.iconContainer} mr-4`}>
          <picture className={`${styles.picture}`}>
            <img src={iconSrc} alt={alt} width="112" height="56" />
          </picture>
        </div>
        <div
          className={`text text_type_main-default mr-4 ${styles.ingredientName}`}
        >
          {name}
        </div>
      </div>
      <div className={`mr-6`}>
        <div className={`${styles.orderMainPrice}`}>
          <p className={`text text_type_digits-default`}>
            {`${count} x ${price}`}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default IngredientForBurgerOrder;
