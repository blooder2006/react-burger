import { IBurgerIngredientForList } from "../../utils/interfaces-and-types";

export const SHOW_MODAL: "SHOW_MODAL" = "SHOW_MODAL";
export const HIDE_MODAL: "HIDE_MODAL" = "HIDE_MODAL";
export const SHOW_MODAL_WITH_NAV_STEP: "SHOW_MODAL_WITH_NAV_STEP" =
  "SHOW_MODAL_WITH_NAV_STEP";
export const SET_DETAILS: "SET_DETAILS" = "SET_DETAILS";

export interface IShowModalAction {
  readonly type: typeof SHOW_MODAL;
  readonly header: string;
  readonly modalContent: React.FC;
  readonly details: IBurgerIngredientForList;
}

export interface IHideModalAction {
  readonly type: typeof HIDE_MODAL;
}

export interface IShowModalWithNavStepAction {
  readonly type: typeof SHOW_MODAL_WITH_NAV_STEP;
  readonly header: string;
  readonly modalContent: React.FC;
  readonly details: IBurgerIngredientForList;
}

export interface ISetDetailsAction {
  readonly type: typeof SET_DETAILS;
  readonly details: IBurgerIngredientForList;
}

export type TModalActions =
  | IShowModalAction
  | IHideModalAction
  | IShowModalWithNavStepAction
  | ISetDetailsAction;
