import { combineReducers } from "redux";
import { getAllIngredientsReducer } from "./get-all-ingredients-reducer";
import { orderReducer } from "./order-reducer";
import { constructorReducer } from "./constructor-reducer";
import { modalReducer } from "./modal-reducer";
import { burgerIngredientsReducer } from "./burger-ingredients-reducer";
import { passwordReducer } from "./password-reducer";
import { registerReducer } from "./register-reducer";
import { loginLogoutReducer } from "./login-logout-reducer";
import { profileReducer } from "./profile-reducer";
import { wsReducer } from "./ws-reducer";

export const rootReducer = combineReducers({
  getAllIngredientsReducer,
  orderReducer,
  constructorReducer,
  modalReducer,
  burgerIngredientsReducer,
  passwordReducer,
  registerReducer,
  loginLogoutReducer,
  profileReducer,
  wsReducer
});
