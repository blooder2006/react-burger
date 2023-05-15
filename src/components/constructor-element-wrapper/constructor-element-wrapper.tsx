import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./constructor-element-wrapper.module.css";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from 'dnd-core'
import {
  DEL_COMPONENT,
  CALC_SAUCE_COUNTER,
  CALC_MAIN_COUNTER,
} from "../../services/actions/ingredients-actions";
import { IRootState, IBurgerIngredientForConstructor, TDragCallback } from "../../utils/interfaces-and-types";
import { useDispatch, useSelector } from "../../utils/hooks";

interface IDragAndDropItem {
  id: string;
  index: number;
}

interface IConstructorElementWrapperProps {
  item: IBurgerIngredientForConstructor;
  index: number;
  moveCard: TDragCallback;
}

const ConstructorElementWrapper: React.FC<IConstructorElementWrapperProps> = ({ item, index, moveCard }) => {
  const dispatch = useDispatch();
  const { sauceList, mainList } = useSelector(
    (store) => store.burgerIngredientsReducer
  );

  const ref = React.useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<IDragAndDropItem, void, { handlerId: Identifier | null }>({
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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

  const [{ isDragging }, drag] = useDrag<() => IDragAndDropItem | null, void, { isDragging: boolean }>({
    type: "component",
    item: () => ({ id: item._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  if (item.type !== "bun") drag(drop(ref));

  const preventDefault = (e: React.MouseEvent) => e.preventDefault();

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
      <DragIcon type="primary"/>
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

export default ConstructorElementWrapper;