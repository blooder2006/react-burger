import { checkResponse } from "../../utils/check-response";
import {
  IBurgerIngredientFromApi,
  IBurgerIngredientForConstructor,
  IBurgerIngredientForList,
} from "../../utils/interfaces-and-types";
import { AppDispatch } from "../../utils/interfaces-and-types";
import { AppThunk } from "../../utils/interfaces-and-types";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAIL: "GET_INGREDIENTS_FAIL" =
  "GET_INGREDIENTS_FAIL";
export const FILL_INGREDIENTS_LIST: "FILL_INGREDIENTS_LIST" =
  "FILL_INGREDIENTS_LIST";
export const CALC_BUN_COUNTER: "CALC_BUN_COUNTER" = "CALC_BUN_COUNTER";
export const CALC_SAUCE_COUNTER: "CALC_SAUCE_COUNTER" = "CALC_SAUCE_COUNTER";
export const CALC_MAIN_COUNTER: "CALC_MAIN_COUNTER" = "CALC_MAIN_COUNTER";
export const CHANGE_SELECTED_INGREDIENTS: "CHANGE_SELECTED_INGREDIENTS" =
  "CHANGE_SELECTED_INGREDIENTS";
export const CHANGE_TOTAL_PRICE: "CHANGE_TOTAL_PRICE" = "CHANGE_TOTAL_PRICE";
export const ADD_COMPONENT: "ADD_COMPONENT" = "ADD_COMPONENT";
export const DEL_COMPONENT: "DEL_COMPONENT" = "DEL_COMPONENT";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";

interface IGetIngredientsResponse {
  success: boolean;
  data: Array<IBurgerIngredientFromApi>;
}

export interface IFillIngredientsListAction {
  readonly type: typeof FILL_INGREDIENTS_LIST;
  readonly bunList: Array<IBurgerIngredientForList>;
  readonly sauceList: Array<IBurgerIngredientForList>;
  readonly mainList: Array<IBurgerIngredientForList>;
}

export interface ICalcBunCounterAction {
  readonly type: typeof CALC_BUN_COUNTER;
  readonly bunList: Array<IBurgerIngredientForList>;
}

export interface ICalcSauceCounterAction {
  readonly type: typeof CALC_SAUCE_COUNTER;
  readonly sauceList: Array<IBurgerIngredientForList>;
}

export interface ICalcMainCounterAction {
  readonly type: typeof CALC_MAIN_COUNTER;
  readonly mainList: Array<IBurgerIngredientForList>;
}

export interface IChangeSelectedIngredientsAction {
  readonly type: typeof CHANGE_SELECTED_INGREDIENTS;
  readonly payload: Array<IBurgerIngredientForConstructor>;
}

export interface IChangeTotalPriceAction {
  readonly type: typeof CHANGE_TOTAL_PRICE;
  readonly payload: number;
}

export interface IAddComponentAction {
  readonly type: typeof ADD_COMPONENT;
  readonly item: IBurgerIngredientForConstructor;
}

export interface IDelComponentAction {
  readonly type: typeof DEL_COMPONENT;
  readonly index: number;
}

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly item: IBurgerIngredientForList;
}

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<IBurgerIngredientFromApi>;
}

export interface IGetIngredientsFailAction {
  readonly type: typeof GET_INGREDIENTS_FAIL;
  readonly payload: string;
}

export type TIngredientsActions =
  | IFillIngredientsListAction
  | ICalcBunCounterAction
  | ICalcSauceCounterAction
  | ICalcMainCounterAction
  | IChangeSelectedIngredientsAction
  | IChangeTotalPriceAction
  | IAddComponentAction
  | IDelComponentAction
  | IAddBunAction
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailAction;

//получение всех ингредиентов по url
export const getAllIngredients: AppThunk = (url: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });

    fetch(url)
      .then((res) => checkResponse(res))
      .then((dataJson: IGetIngredientsResponse) =>
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: dataJson.data,
        })
      )
      .catch((e: Error) => {
        dispatch({
          type: GET_INGREDIENTS_FAIL,
          payload: e.message,
        });
      });
  };
};
