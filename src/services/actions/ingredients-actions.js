import { checkResponse } from "../../utils/check-response";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAIL = "GET_INGREDIENTS_FAIL";
export const CHANGE_SELECTED_INGREDIENTS = "CHANGE_SELECTED_INGREDIENTS";
export const CHANGE_TOTAL_PRICE = "CHANGE_TOTAL_PRICE";
export const FILL_INGREDIENTS_LIST = "FILL_INGREDIENTS_LIST";
export const CALC_BUN_COUNTER = "CALC_BUN_COUNTER";
export const CALC_SAUCE_COUNTER = "CALC_SAUCE_COUNTER";
export const CALC_MAIN_COUNTER = "CALC_MAIN_COUNTER";
export const ADD_COMPONENT = "ADD_COMPONENT";
export const DEL_COMPONENT = "DEL_COMPONENT";
export const ADD_BUN = "ADD_BUN";

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