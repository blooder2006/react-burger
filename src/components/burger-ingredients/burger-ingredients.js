import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./burger-ingredients.module.css";
import appStyles from "../app/app.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Ingredient from "../ingredient/ingredient";
import { AllIngredientsContext } from "../../utils/all-ingredients-context";

const BurgerIngredients = () => {
  const burgerIngredients = React.useContext(
    AllIngredientsContext
  );

  const bunList = burgerIngredients
    .filter((elem) => elem.type === "bun")
    .map((elem) => ({ ...elem, counter: 0 }));

  const sauceList = burgerIngredients
    .filter((elem) => elem.type === "sauce")
    .map((elem) => ({ ...elem, counter: 0 }));

  const mainList = burgerIngredients
    .filter((elem) => elem.type === "main")
    .map((elem) => ({ ...elem, counter: 0 }));

  const [currentTab, setCurrentTab] = React.useState("bun");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState(null);

  const handleOpenModal = (ingredient) => {
    setModalVisible(true);
    setCurrentIngredient(ingredient);
  };
  
  const handleCloseModal = () => setModalVisible(false);

  return (
    <div>
      <h1 className={`text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      <div className={`${styles.tabs}`}>
        <Tab value="bun" active={currentTab === "bun"} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === "sauce"} onClick={setCurrentTab}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === "main"} onClick={setCurrentTab}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredientList}`}>
        <p className={`text text_type_main-medium mt-10`}>Булки</p>
        <div className={`${styles.ingredientsContaner} ml-4 mt-6 mb-10`}>
          {bunList.map((elem, index) => (
            <Ingredient
              onClick={handleOpenModal}
              ingredient={elem}
              key={elem._id}
              counter={index === 0 ? 1 : elem.counter}
            />
          ))}
        </div>
        <p className={`text text_type_main-medium mt-10`}>Соусы</p>
        <div className={`${styles.ingredientsContaner} ml-4 mt-6 mb-10`}>
          {sauceList.map((elem) => (
            <Ingredient
              onClick={handleOpenModal}
              ingredient={elem}
              key={elem._id}
              counter={elem.counter}
            />
          ))}
        </div>
        <p className={`text text_type_main-medium mt-10`}>Начинки</p>
        <div className={`${styles.ingredientsContaner} ml-4 mt-6 mb-10`}>
          {mainList.map((elem) => (
            <Ingredient
              onClick={handleOpenModal}
              ingredient={elem}
              key={elem._id}
              counter={elem.counter}
            />
          ))}
        </div>
      </div>
      <div className={`${appStyles.modal}`}>
        {modalVisible && (
          <Modal onClose={handleCloseModal} header=" Детали ингредиента"> 
            <IngredientDetails details={currentIngredient} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default BurgerIngredients;
