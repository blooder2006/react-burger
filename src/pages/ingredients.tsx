import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./pages.module.css";
import { useParams } from "react-router-dom";
import { checkUserAuth } from "../services/actions/user-actions";
import { useDispatch, useSelector } from "../utils/hooks";

export const IngredientDetailsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const item = useSelector((store) => {
    return store.getAllIngredientsReducer.allIngredients.find(
      (item) => item._id === id
    );
  });

  React.useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  if (!item) {
    return null;
  }

  return (
    <div className={`${styles.inputPage}`}>
      <div
        className={`${styles.modalHeader} text text_type_main-large mr-10 ml-10 mt-10`}
      >
        Детали ингридиента
      </div>
    </div>
  );
};
