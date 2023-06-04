import { IMessage } from "../../utils/interfaces-and-types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_GET_MESSAGE_ORDERS: 'WS_GET_MESSAGE_ORDERS' = 'WS_GET_MESSAGE_ORDERS';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
  }
  
  export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
  }
  
  export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: Event;
  }
  
  export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
  }
  
  export interface IWSGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: IMessage;
  }

  export interface IWSGetMessageOrdersAction {
    readonly type: typeof WS_GET_MESSAGE_ORDERS;
    readonly payload: IMessage;
  }
  
  export interface IWSSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: {message: string};
  }
  
  export type TWSActions =
    | IWSConnectionStart
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetMessageAction
    | IWSSendMessageAction
    | IWSGetMessageOrdersAction;

export type TWSStoreActions = {
    wsInit: typeof  WS_CONNECTION_START,
    wsSendMessage: typeof  WS_SEND_MESSAGE,
    onOpen: typeof  WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof  WS_CONNECTION_ERROR,
    onMessage: typeof  WS_GET_MESSAGE,
    onMessageOrders: typeof  WS_GET_MESSAGE_ORDERS,
    };
      