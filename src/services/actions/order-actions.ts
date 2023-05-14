import { fetchWithRefresh } from "../../utils/auth";
import { getCookie } from "../../utils/auth";
import { IBurgerRequest } from "../../utils/interfaces-and-types";
import { AppDispatch } from "../../utils/interfaces-and-types";
import { AppThunk } from "../../utils/interfaces-and-types";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAIL: "GET_ORDER_FAIL" = "GET_ORDER_FAIL";

export interface IBurgerResponse {
  success: boolean;
  order: {
    number: number;
  };
}

export interface IOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: number;
}

export interface IOrderFailAction {
  readonly type: typeof GET_ORDER_FAIL;
  readonly payload: string;
}

export type TOrderActions =
  | IOrderRequestAction
  | IOrderSuccessAction
  | IOrderFailAction;

//запрос на создание заказа
export const getOrder: AppThunk = (
  url: string,
  burgerRequest: IBurgerRequest
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    return fetchWithRefresh(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify(burgerRequest),
    })
      .then((dataJson: IBurgerResponse) =>
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: dataJson.order.number,
        })
      )
      .catch((e: Error) => {
        dispatch({
          type: GET_ORDER_FAIL,
          payload: e.message,
        });
      });
  };
};
