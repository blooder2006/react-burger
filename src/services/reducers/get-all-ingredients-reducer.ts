import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAIL,
} from "../actions/ingredients-actions";

import type { TIngredientsActions } from "../actions/ingredients-actions";
import { IGetAllIngredientsState } from "../../utils/interfaces-and-types";

export const initialState: IGetAllIngredientsState = {
  allIngredients: [],
  loading: false,
  error: null,
};

export const getAllIngredientsReducer = (state = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        allIngredients: action.payload,
        loading: false,
      };
    }
    case GET_INGREDIENTS_FAIL: {
      return {
        ...state,
        error: action.payload,
        loading: false,
        allIngredients: [],
      };
    }
    default: {
      return state;
    }
  }
};
