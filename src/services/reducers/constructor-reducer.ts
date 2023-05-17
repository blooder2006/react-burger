import {
  CHANGE_SELECTED_INGREDIENTS,
  CHANGE_TOTAL_PRICE,
  ADD_COMPONENT,
  DEL_COMPONENT,
  ADD_BUN,
} from "../actions/ingredients-actions";

import type { TIngredientsActions } from "../actions/ingredients-actions";
import { IConstructorState } from "../../utils/interfaces-and-types";

const initialState: IConstructorState = {
  selectedIngredients: [],
  selectedBun: {} as any,
  totalPrice: 0,
};

export const constructorReducer = (state = initialState, action: TIngredientsActions ) => {
  switch (action.type) {
    case CHANGE_SELECTED_INGREDIENTS: {
      return {
        ...state,
        selectedIngredients: action.payload,
      };
    }

    case CHANGE_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.payload,
      };
    }
    case ADD_COMPONENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.item],
      };
    }
    case DEL_COMPONENT: {
      return {
        ...state,
        selectedIngredients: [
          ...state.selectedIngredients.filter(
            (elem, index) => index !== action.index
          ),
        ],
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        selectedBun: { ...action.item },
      };
    }
    default: {
      return state;
    }
  }
};
