import { IBurgerOrder } from "../../utils/interfaces-and-types";

export const SET_DONE_ORDERS: "SET_DONE_ORDERS" = "SET_DONE_ORDERS";

export const SET_PENDING_ORDERS: "SET_PENDING_ORDERS" = "SET_PENDING_ORDERS";

export interface ISetDoneOrdersAction {
  readonly type: typeof SET_DONE_ORDERS;
  readonly payload: Array<string>;
}

export interface ISetPendingOrdersAction {
  readonly type: typeof SET_PENDING_ORDERS;
  readonly payload: Array<string>;
}

export type TFeedActions = ISetDoneOrdersAction | ISetPendingOrdersAction;
