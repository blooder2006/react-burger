import React from "react";
import styles from "./app.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";

import { useSelector, useDispatch } from "react-redux";
import { getAllIngredients } from "../services/actions/actions";
import { DATA_URL } from "../../utils/urls";
import {
  CHANGE_SELECTED_BUN,
  FILL_INGREDIENTS_LIST,
} from "../services/actions/actions";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const dispatch = useDispatch();

  const { allIngredients } = useSelector((store) => ({
    allIngredients: store.getAllIngredientsReducer.allIngredients,
  }));

  const { modalVisible } = useSelector((store) => ({
    modalVisible: store.modalReducer.modalVisible,
  }));

  React.useEffect(() => {
    dispatch(getAllIngredients(DATA_URL));
  }, []);

  React.useEffect(() => {
    if (allIngredients.length > 0) {
      //первая булочка в списке всегда выбрана в конструктор по умолчанию
      const selectedBun = allIngredients.filter(
        (elem) => elem.type === "bun"
      )[0];
      dispatch({ type: CHANGE_SELECTED_BUN, payload: selectedBun });

      const bunList = allIngredients
        .filter((elem) => elem.type === "bun")
        .map((elem, index) => {
          return index === 0
            ? { ...elem, counter: 1 }
            : { ...elem, counter: 0 };
        });

      const sauceList = allIngredients
        .filter((elem) => elem.type === "sauce")
        .map((elem) => ({ ...elem, counter: 0 }));

      const mainList = allIngredients
        .filter((elem) => elem.type === "main")
        .map((elem) => ({ ...elem, counter: 0 }));

      dispatch({
        type: FILL_INGREDIENTS_LIST,
        bunList: bunList,
        sauceList: sauceList,
        mainList: mainList,
      });
    }
  }, [allIngredients]);

  return (
    <div>
      <AppHeader />
      <div className={styles.container}>
        {allIngredients && (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
            {modalVisible && (
              <div className={`${styles.modal}`}>
                <Modal />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
