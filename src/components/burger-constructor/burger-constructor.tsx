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

import { getOrder } from "../../services/actions/order-actions";
import { BASE_URL, ORDER_ENDPOINT } from "../../utils/urls";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_COMPONENT,
  CHANGE_SELECTED_INGREDIENTS,
  CHANGE_TOTAL_PRICE,
  ADD_BUN,
  CALC_BUN_COUNTER,
  CALC_SAUCE_COUNTER,
  CALC_MAIN_COUNTER,
} from "../../services/actions/ingredients-actions";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import ConstructorElementWrapper from "../constructor-element-wrapper/constructor-element-wrapper";
import Modal from "../modal/modal";
import { useNavigate } from "react-router-dom";

import { IBurgerRequest, IRootState, IBurgerIngredientForList, TDragCallback } from "../../utils/interfaces-and-types";

const BurgerConstructor: React.FC  = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedIngredients, selectedBun, totalPrice } = useSelector(
    (store: IRootState) => store.constructorReducer
  );

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const { bunList, sauceList, mainList } = useSelector(
    (store: IRootState) => store.burgerIngredientsReducer
  );

  const orderAndShowModal = (burgerRequest: IBurgerRequest): any => {
    return (dispatch: any) => {
      dispatch(getOrder(`${BASE_URL}${ORDER_ENDPOINT}`, burgerRequest)).then(
        () => {
          setModalVisible(true);
        }
      );
    };
  };

  const handleOpenModal = (): void => {
    const burgerRequest = {
      ingredients: [
        ...selectedIngredients.map((elem) => {
          return elem._id;
        }),
        selectedBun._id,
      ],
    };
    const isAuth = localStorage.getItem("refreshToken");

    if (!isAuth) {
      navigate("/login");
    } else {
      dispatch(orderAndShowModal(burgerRequest));
    }
  };

  const [{ isHover }, dropTargerRef] = useDrop<IBurgerIngredientForList, void, { isHover: boolean }>({
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

  const moveCard = React.useCallback<TDragCallback>(
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
    let priceSum = 0;
    if (selectedIngredients.length > 0) {
      selectedIngredients.forEach((elem) => {
        priceSum = priceSum + elem.price;
      });
    }

    if (Object.keys(selectedBun).length > 0) {
      priceSum = priceSum + selectedBun.price;
    }

    dispatch({ type: CHANGE_TOTAL_PRICE, payload: priceSum });
  }, [selectedIngredients, selectedBun]);

  return (
    <div className={`pt-25 pl-4`}>
      <section
        ref={dropTargerRef}
        className={`${isHover ? styles.onHover : ""}`}
      >
        <div className={`${appStyles.alignRight} mr-4`}>
          {Object.keys(selectedBun).length > 0 ? (
            <ConstructorElement
              key={selectedBun._id}
              type="top"
              isLocked={true}
              text={`${selectedBun.name} (верх)`}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
            />
          ) : selectedIngredients.length > 0 ? (
            <div className={`${appStyles.App} text text_type_main-default`}>
              Пожалуйста, добавьте к заказу булку
            </div>
          ) : null}
        </div>

        <div className={`${styles.ingredientList} mt-4`}>
          {selectedIngredients.length > 0 ? (
            selectedIngredients.map((elem, index: number) => {
              return (
                <ConstructorElementWrapper
                  key={elem.dragId}
                  index={index}
                  moveCard={moveCard}
                  item={elem}
                />
              );
            })
          ) : (
            <div className={`${appStyles.App} text text_type_main-default`}>
              Пожалуйста, добавьте к заказу ингридиенты
            </div>
          )}
        </div>

        <div className={`${appStyles.alignRight} mr-4`}>
          {Object.keys(selectedBun).length > 0 ? (
            <ConstructorElement
              key={selectedBun._id}
              type="bottom"
              isLocked={true}
              text={`${selectedBun.name} (низ)`}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
            />
          ) : null}
        </div>
      </section>

      <div className={`${styles.totalOrder} mt-10 mr-4`}>
        <div className={`text_type_digits-medium`}>
          <span className={`mr-4`}>{totalPrice ? totalPrice : 0}</span>
          <div className={`${styles.totalPriceIcon}`}>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
        <Button
          htmlType="button"
          size="large"
          type="primary"
          onClick={handleOpenModal}
          {...(Object.keys(selectedBun).length === 0 ? { disabled: true } : {})}
        >
          Оформить заказ
        </Button>
      </div>
      {modalVisible && (
        <div className={`${appStyles.modal}`}>
          <Modal
            onClose={() => {
              setModalVisible(false);
            }}
          >
            <OrderDetails />
          </Modal>
        </div>
      )}
    </div>
  );
};



export default BurgerConstructor;
