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
import { SHOW_MODAL_WITH_NAV_STEP } from "../../services/actions/modal-actions";

import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';

const Ingredient = ({ ingredient, counter }) => {
  const { name, image, price } = ingredient;
  const ingredientId = ingredient['_id'];
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClick = () =>
    dispatch({
      type: SHOW_MODAL_WITH_NAV_STEP,
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
    <Link
      key={ingredientId}
      to={{pathname: `/ingredients/${ingredientId}`}}
      state= {{ background: location }}
      className={`${styles.ingredientLink} text_color_primary`}
    >
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
    </Link>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientsPropTypes,
  counter: PropTypes.number.isRequired,
};

export default Ingredient;
