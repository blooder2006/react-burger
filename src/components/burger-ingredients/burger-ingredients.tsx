import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";

import { useSelector } from "react-redux";

import {IRootState} from "../../utils/interfaces-and-types";

const BurgerIngredients: React.FC = () => {
  const { bunList, sauceList, mainList } = useSelector(
    (store: IRootState) => store.burgerIngredientsReducer
  );

  const [currentTab, setCurrentTab] = React.useState<string>("bun");

  const bunRef = React.useRef<HTMLParagraphElement>(null);
  const sauceRef = React.useRef<HTMLParagraphElement>(null);
  const mainRef = React.useRef<HTMLParagraphElement>(null);

  const callBackFunction = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setCurrentTab(entry.target.getAttribute("id")!);
      }
    });
  };

  React.useEffect(() => {
    const options = {
      rootMargin: "0px 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(callBackFunction, options);

    if (mainRef.current) observer.observe(mainRef.current);
    if (sauceRef.current) observer.observe(sauceRef.current);
    if (bunRef.current) observer.observe(bunRef.current);

    return () => {
      if (bunRef.current) observer.unobserve(bunRef.current);
      if (sauceRef.current) observer.unobserve(sauceRef.current);
      if (mainRef.current) observer.unobserve(mainRef.current);
    };
  }, []);

  return (
    <div>
      <h1 className={`text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      <div className={`${styles.tabs}`}>
        <Tab value="bun" active={currentTab === "bun"} onClick={()=>{}}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === "sauce"} onClick={()=>{}}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === "main"} onClick={()=>{}}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredientList}`}>
        <p id="bun" ref={bunRef} className={`text text_type_main-medium mt-10`}>
          Булки
        </p>
        <div className={`${styles.ingredientsContaner} ml-4 mt-6 mb-10`}>
          {bunList.map((elem) => (
            <Ingredient
              ingredient={elem}
              key={elem._id}
              counter={elem.counter}
            />
          ))}
        </div>
        <p
          id="sauce"
          ref={sauceRef}
          className={`text text_type_main-medium mt-10`}
        >
          Соусы
        </p>
        <div className={`${styles.ingredientsContaner} ml-4 mt-6 mb-10`}>
          {sauceList.map((elem) => (
            <Ingredient
              ingredient={elem}
              key={elem._id}
              counter={elem.counter}
            />
          ))}
        </div>
        <p
          id="main"
          ref={mainRef}
          className={`text text_type_main-medium mt-10`}
        >
          Начинки
        </p>
        <div className={`${styles.ingredientsContaner} ml-4 mt-6 mb-10`}>
          {mainList.map((elem) => (
            <Ingredient
              ingredient={elem}
              key={elem._id}
              counter={elem.counter}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
