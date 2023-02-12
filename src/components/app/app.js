import React from "react";
import styles from "./app.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const DATA_URL = "https://norma.nomoreparties.space/api/ingredients"

const App = () => {
  const [state, setState] = React.useState({
    ingredientsData: null,
    loading: false,
  });

  React.useEffect(() => {
    setState({ ...state, loading: true });
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((dataJson) => {
        setState({ ingredientsData: dataJson.data, loading: false });
      })
      .catch((e) => {
        console.log("Ошибка:");
        console.log(e.message);
      });
  }, []);

  return (
    <div>     
      <AppHeader />
      <div className={styles.container}>
        {state.ingredientsData && (
          <>
            <BurgerIngredients burgerIngredients={state.ingredientsData} />
            <BurgerConstructor className={styles.item} selectedIngredients={state.ingredientsData}/>
          </>
        )}
      </div>
    </div>
  );
};

export default App;