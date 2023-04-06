import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./ingredient-details.module.css";

import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import {IRootState, IBackground} from "../../utils/interfaces-and-types";

const IngredientDetails: React.FC = () => {
  const { id } = useParams();
  const { modalVisible } = useSelector((store: IRootState) => store.modalReducer);
  const location = useLocation();
  const background: IBackground = location.state && location.state.background;
  const ingredientFromSearch = useSelector((store: IRootState) => {
    return store.getAllIngredientsReducer.allIngredients.find(
      (item) => item._id === id
    );
  });

  if (!ingredientFromSearch && id) {
    return null;
  }

  if (ingredientFromSearch && id) {
    const { name, image_large, calories, proteins, fat, carbohydrates } =
      ingredientFromSearch;
    return (
      <>
        <div className={`${background ? null : styles.pageContainer}`}>
          <div
            className={`${!background ? null : styles.headerLeft} ${
              styles.header
            } text text_type_main-large mr-10 ml-10 mt-10`}
          >
            Детали ингредиента
          </div>
          <div className={`${styles.ingredientDetailsMain} mt-25 pt-1 `}>
            <img className={`mb-4`} src={image_large} alt={name} />
            <div className={`text text_type_main-medium mb-8`}>{name}</div>
            <div
              className={`${styles.detailsParams} text text_color_inactive mb-15`}
            >
              <div className={`mr-5`}>
                <div
                  className={`text text_type_main-default mb-2 ${styles.paramCenterAlign}`}
                >
                  Калории,ккал
                </div>
                <div
                  className={`text_type_digits-default ${styles.paramCenterAlign}`}
                >
                  {calories}
                </div>
              </div>
              <div className={`mr-5`}>
                <div
                  className={`text text_type_main-default mb-2 ${styles.paramCenterAlign}`}
                >
                  Белки, г
                </div>
                <div
                  className={`text_type_digits-default ${styles.paramCenterAlign}`}
                >
                  {proteins}
                </div>
              </div>
              <div className={`mr-5`}>
                <div
                  className={`text text_type_main-default mb-2 ${styles.paramCenterAlign}`}
                >
                  Жиры, г
                </div>
                <div
                  className={`text_type_digits-default ${styles.paramCenterAlign}`}
                >
                  {fat}
                </div>
              </div>
              <div>
                <div
                  className={`text text_type_main-default mb-2 ${styles.paramCenterAlign}`}
                >
                  Углеводы, г
                </div>
                <div
                  className={`text_type_digits-default ${styles.paramCenterAlign}`}
                >
                  {carbohydrates}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default IngredientDetails;
