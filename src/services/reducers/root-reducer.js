import { combineReducers } from "redux";
import { getAllIngredientsReducer } from "./get-all-ingredients-reducer";
import { orderReducer } from "./order-reducer";
import { constructorReducer } from "./constructor-reducer";
import { modalReducer } from "./modal-reducer";
import { burgerIngredientsReducer } from "./burger-ingredients-reducer";

export const rootReducer = combineReducers({
  getAllIngredientsReducer,
  orderReducer,
  constructorReducer,
  modalReducer,
  burgerIngredientsReducer,
});
