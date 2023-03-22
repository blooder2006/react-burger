import { fetchWithRefresh } from "../../utils/auth";
import { getCookie } from "../../utils/auth";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAIL = "GET_ORDER_FAIL";

//запрос на создание заказа
export function getOrder(url, burgerRequest) {
    return function (dispatch) {
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
  