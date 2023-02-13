import React from 'react'
import PropTypes from 'prop-types'
import {
    Counter,
    CurrencyIcon
  } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import {ingredientsPropTypes} from "../../utils/prop-types";

const Ingredient = (props) => {
    const { name, image, price } = props.ingredient;
    const counter = props.counter;
    const handleClick = () => props.onClick(props.ingredient)
    return (
      <div className={`${styles.ingredient}`} onClick={handleClick} >
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
  counter: PropTypes.number.isRequired
};

export default Ingredient