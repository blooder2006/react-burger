import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./burger-constructor.module.css";
import appStyles from "../app/app.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { constructorIngredientsContext } from "../../utils/constructor-ingredients-context";
import { ORDER_URL } from "../../utils/urls";
import { checkReponse } from "../../utils/check-response";
import { orderContext } from "../../utils/order-context";



const BurgerConstructor = () => {
  const { selectedIngredients, selectedBun, totalPrice } = React.useContext(
    constructorIngredientsContext
  );

  
  const [modalVisible, setModalVisible] = React.useState(false);

  const [responseState, setResponseState] = React.useState({
    orderNumber: null,
    loading: false,
    error: null,
  });

  const handleOpenModal = () => {

    setResponseState({ ...responseState, loading: true });

    const burgerRequest = {
      ingredients: [
        ...selectedIngredients.map((elem) => {
          return elem._id;
        }),
        selectedBun._id,
      ],
    };

    fetch(ORDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(burgerRequest),
    })
      .then((res) => checkReponse(res, responseState, setResponseState))
      .then((dataJson) =>
        setResponseState({ orderNumber: dataJson.order.number, loading: false })
      )
      .catch((e) => {
        setResponseState({ ...responseState, error: e.message });
      });

    if (!responseState.loading) {
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => setModalVisible(false);

  return (
    <div className={`pt-25 pl-4`}>
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
        {selectedIngredients.map((elem) => {
          return (
            <div
              key={elem._id}
              className={`${styles.innerIngredient} mb-4 mr-2`}
            >
              <DragIcon />
              <ConstructorElement
                isLocked={false}
                text={elem.name}
                price={elem.price}
                thumbnail={elem.image}
              />
            </div>
          );
        })}
      </div>
      <div className={`${appStyles.alignRight} mr-4`}>
        <ConstructorElement
          key={selectedBun._id}
          type="top"
          isLocked={true}
          text={`${selectedBun.name}  (низ)`}
          price={selectedBun.price}
          thumbnail={selectedBun.image}
        />
      </div>
      <div className={`${styles.totalOrder} mt-10 mr-4`}>
        <div className={`text_type_digits-medium`}>
          <span className={`mr-4`}>{totalPrice}</span>
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
      <div className={`${appStyles.modal}`}>
        {modalVisible && (
          <Modal onClose={handleCloseModal}>
            <orderContext.Provider
              value={responseState.orderNumber}
            >
              <OrderDetails />
            </orderContext.Provider>
          </Modal>
        )}
      </div>
    </div>
  );
};

orderContext.Provider.propTypes = PropTypes.shape({
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired
}).isRequired;


export default BurgerConstructor;
