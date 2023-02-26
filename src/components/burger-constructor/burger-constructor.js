import React from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./burger-constructor.module.css";
import appStyles from "../app/app.module.css";
import OrderDetails from "../order-details/order-details";

import { getOrder } from "../services/actions/actions";
import { ORDER_URL } from "../../utils/urls";
import { useSelector, useDispatch } from "react-redux";
import {
  SHOW_MODAL,
  ADD_COMPONENT,
  CHANGE_SELECTED_INGREDIENTS,
  CHANGE_TOTAL_PRICE,
  ADD_BUN,
  CALC_BUN_COUNTER,
  CALC_SAUCE_COUNTER,
  CALC_MAIN_COUNTER,
} from "../services/actions/actions";

import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import ConstructorElementWrapper from "../constructor-element-wrapper/constructor-element-wrapper";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((store) => ({
    loading: store.orderReducer.loading,
  }));

  const { selectedIngredients, selectedBun, totalPrice } = useSelector(
    (store) => ({
      selectedBun: store.constructorReducer.selectedBun,
      totalPrice: store.constructorReducer.totalPrice,
      selectedIngredients: store.constructorReducer.selectedIngredients,
    })
  );

  const { bunList, sauceList, mainList } = useSelector((store) => ({
    bunList: store.burgerIngredientsReducer.bunList,
    sauceList: store.burgerIngredientsReducer.sauceList,
    mainList: store.burgerIngredientsReducer.mainList,
  }));

  const handleOpenModal = () => {
    const burgerRequest = {
      ingredients: [
        ...selectedIngredients.map((elem) => {
          return elem._id;
        }),
        selectedBun._id,
      ],
    };
    dispatch(getOrder(ORDER_URL, burgerRequest));
    if (!loading) {
      dispatch({ type: SHOW_MODAL, modalContent: OrderDetails });
    }
  };

  const [{ isHover }, dropTargerRef] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      if (item.type === "bun") {
        dispatch({
          type: ADD_BUN,
          item: item,
        });
        const newBunList = bunList.map((elem) => {
          return elem._id === item._id
            ? { ...elem, counter: 1 }
            : { ...elem, counter: 0 };
        });
        dispatch({
          type: CALC_BUN_COUNTER,
          bunList: newBunList,
        });
      } else {
        dispatch({
          type: ADD_COMPONENT,
          item: {
            ...item,
            dragId: uuidv4(),
          },
        });

        if (item.type === "sauce") {
          const newSauceList = sauceList.map((elem) => {
            return elem._id === item._id
              ? { ...elem, counter: elem.counter + 1 }
              : elem;
          });
          dispatch({
            type: CALC_SAUCE_COUNTER,
            sauceList: newSauceList,
          });
        }
        if (item.type === "main") {
          const newMainList = mainList.map((elem) => {
            return elem._id === item._id
              ? { ...elem, counter: elem.counter + 1 }
              : elem;
          });
          dispatch({
            type: CALC_MAIN_COUNTER,
            mainList: newMainList,
          });
        }
      }
    },
  });

  const moveCard = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = selectedIngredients[dragIndex];
      const newCards = [...selectedIngredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      dispatch({
        type: CHANGE_SELECTED_INGREDIENTS,
        payload: newCards,
      });
    },
    [selectedIngredients, dispatch]
  );

  React.useEffect(() => {
    let totalPrice = 0;
    selectedIngredients.forEach((elem) => {
      totalPrice = totalPrice + elem.price;
    });
    totalPrice = totalPrice + selectedBun.price * 2;
    dispatch({ type: CHANGE_TOTAL_PRICE, payload: totalPrice });
  }, [selectedIngredients, selectedBun]);

  return (
    <div className={`pt-25 pl-4`}>
      <section
        ref={dropTargerRef}
        className={`${isHover ? styles.onHover : ""}`}
      >
        <div className={`${appStyles.alignRight} mr-4`}>
          <ConstructorElement
            key={selectedBun._id}
            type="top"
            isLocked={true}
            text={`${selectedBun.name}  (верх)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        </div>

        <div className={`${styles.ingredientList} mt-4`}>
          {selectedIngredients.map((elem, index) => {
            return (
              <ConstructorElementWrapper
                key={elem.dragId}
                index={index}
                moveCard={moveCard}
                item={elem}
              />
            );
          })}
        </div>

        <div className={`${appStyles.alignRight} mr-4`}>
          <ConstructorElement
            key={selectedBun._id}
            type="bottom"
            isLocked={true}
            text={`${selectedBun.name}  (низ)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        </div>
      </section>

      <div className={`${styles.totalOrder} mt-10 mr-4`}>
        <div className={`text_type_digits-medium`}>
          <span className={`mr-4`}>{totalPrice ? totalPrice : 0}</span>
          <div className={`${styles.totalPriceIcon}`}>
            <CurrencyIcon />
          </div>
        </div>
        <Button
          htmlType="button"
          size="large"
          type="primary"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
