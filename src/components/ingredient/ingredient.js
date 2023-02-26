import React from "react";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { ingredientsPropTypes } from "../../utils/prop-types";

import { useDispatch } from "react-redux";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { SHOW_MODAL } from "../services/actions/actions";

import { useDrag } from "react-dnd";

const Ingredient = ({ ingredient, counter }) => {
  const { name, image, price } = ingredient;
  const dispatch = useDispatch();

  const handleClick = () =>
    dispatch({
      type: SHOW_MODAL,
      header: "Детали ингредиента",
      modalContent: IngredientDetails,
      details: ingredient,
    });

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...ingredient },
    collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.5 : 1 }),
  });

  return (
    <div ref={dragRef} className={`${styles.ingredient}`} onClick={handleClick}>
      {counter > 0 ? <Counter count={counter} size="default" /> : null}
      <img className={`ml-4 mr-4 mb-1`} src={image} alt="ingredient" />
      <div className={`${styles.priceAndIcon} text_type_digits-default mb-4`}>
        <span>{price}</span>
        <CurrencyIcon />
      </div>
      <div className={`${styles.ingredientName} text text_type_main-default`}>
        {name}
      </div>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientsPropTypes,
  counter: PropTypes.number.isRequired,
};

export default Ingredient;
