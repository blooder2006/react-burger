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

const BurgerConstructor = (props) => {
  const { selectedIngredients } = props;
  const ingredientsList = selectedIngredients.filter(
    (elem) => elem.type !== "bun"
  );

  const [modalVisible, setModalVisible] = React.useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  let totalPrice = 0;

  return (
    <div className={`pt-25 pl-4`}>
      <div className={`${appStyles.alignRight} mr-4`}>
        <ConstructorElement
          key="60d3b41abdacab0026a733c6"
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price="20"
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>
      <div className={`${styles.ingredientList} mt-4`}>
        {ingredientsList.map((elem) => {
          totalPrice = totalPrice + elem.price;
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
          key="60d3b41abdacab0026a733c6"
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price="20"
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>
      <div className={`${styles.totalOrder} mt-10 mr-4`}>
        <div className={`text_type_digits-medium`}>
          <span className={`mr-4`}>{totalPrice + 40}</span>
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
      <div className={`${appStyles.modal}`}>{modalVisible && (
    <Modal onClose={handleCloseModal}>
      <OrderDetails />
    </Modal>
  )}</div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
};

export default BurgerConstructor;
