import { checkResponse } from "../../utils/check-response";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAIL = "GET_INGREDIENTS_FAIL";

export const CHANGE_SELECTED_INGREDIENTS = "CHANGE_SELECTED_INGREDIENTS";
export const CHANGE_TOTAL_PRICE = "CHANGE_TOTAL_PRICE";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAIL = "GET_ORDER_FAIL";

export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

export const ADD_COMPONENT = "ADD_COMPONENT";
export const DEL_COMPONENT = "DEL_COMPONENT";
export const ADD_BUN = "ADD_BUN";

export const FILL_INGREDIENTS_LIST = "FILL_INGREDIENTS_LIST";
export const CALC_BUN_COUNTER = "CALC_BUN_COUNTER";
export const CALC_SAUCE_COUNTER = "CALC_SAUCE_COUNTER";
export const CALC_MAIN_COUNTER = "CALC_MAIN_COUNTER";

//получение всех ингредиентов по url
export function getAllIngredients(url) {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });

    fetch(url)
      .then((res) => checkResponse(res))
      .then((dataJson) =>
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: dataJson.data,
        })
      )
      .catch((e) => {
        dispatch({
          type: GET_INGREDIENTS_FAIL,
          payload: e.message,
        });
      });
  };
}

//отправка заказа и получение номера заказа по url
export function getOrder(url, burgerRequest) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(burgerRequest),
    })
    .then((res) => checkResponse(res))
      .then((dataJson) =>
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: dataJson.order.number,
        })
      )
      .catch((e) => {
        dispatch({
          type: GET_ORDER_FAIL,
          payload: e.message,
        });
      });
  };
}
