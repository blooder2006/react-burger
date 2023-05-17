import {

  SET_DONE_ORDERS,
  SET_PENDING_ORDERS
} from "../actions/feed-actions";

import { IFeedState } from "../../utils/interfaces-and-types";
import { TFeedActions } from "../actions/feed-actions";

const initialState: IFeedState = {

  doneOrders: [],
  pendingOrders: [],
};


export const feedReducer = (state = initialState, action: TFeedActions) => {
  switch (action.type) {
    case SET_DONE_ORDERS: {
      return {
        ...state,
        doneOrders: action.payload,
      };
    }
    case SET_PENDING_ORDERS: {
      return {
        ...state,
        pendingOrders: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
