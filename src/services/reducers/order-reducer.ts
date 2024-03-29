import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
} from "../actions/order-actions";

import type { TOrderActions } from "../actions/order-actions";
import { IOrderState } from "../../utils/interfaces-and-types";

export const initialState: IOrderState = {
  orderNumber: null,
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        orderNumber: null,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        loading: false,
      };
    }
    case GET_ORDER_FAIL: {
      return {
        ...state,
        error: action.payload,
        loading: false,
        orderNumber: null,
      };
    }
    default: {
      return state;
    }
  }
};
