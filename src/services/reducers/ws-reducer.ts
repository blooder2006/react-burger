import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_MESSAGE_ORDERS
} from "../actions/ws-actions";
import { TWSActions } from "../actions/ws-actions";
import { IWSState } from "../../utils/interfaces-and-types";

export const initialState: IWSState = {
  wsConnected: false,
  message: null,
  messageOrders: null,
};

export const wsReducer = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,

        message: action.payload,
      };

      case WS_GET_MESSAGE_ORDERS:
        return {
          ...state,
          error: undefined,
  
          messageOrders: action.payload,
        };

    default:
      return state;
  }
};
