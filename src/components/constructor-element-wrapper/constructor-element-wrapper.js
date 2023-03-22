import React from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";

import styles from "./constructor-element-wrapper.module.css";

import { useDrag, useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  DEL_COMPONENT,
  CALC_SAUCE_COUNTER,
  CALC_MAIN_COUNTER,
} from "../../services/actions/ingredients-actions";

export default function ConstructorElementWrapper({ item, index, moveCard }) {
  const dispatch = useDispatch();
  const { sauceList, mainList } = useSelector(
    (store) => store.burgerIngredientsReducer
  );

  const ref = React.useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  if (item.type !== "bun") drag(drop(ref));

  const preventDefault = (e) => e.preventDefault();

  const delElement = () => {
    dispatch({
      type: DEL_COMPONENT,
      index: index,
    });

    if (item.type === "sauce") {
      const newSauceList = sauceList.map((elem) => {
        return elem._id === item._id
          ? { ...elem, counter: elem.counter - 1 }
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
          ? { ...elem, counter: elem.counter - 1 }
          : elem;
      });
      dispatch({
        type: CALC_MAIN_COUNTER,
        mainList: newMainList,
      });
    }
  };

  return (
    <div
      ref={ref}
      style={{ opacity }}
      onDrop={preventDefault}
      className={`${styles.innerIngredient} mb-4 mr-2`}
      data-handler-id={handlerId}
    >
      <DragIcon />
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={delElement}
      />
    </div>
  );
}

ConstructorElementWrapper.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
};
