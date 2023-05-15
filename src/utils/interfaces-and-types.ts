import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { TAuthActions } from "../services/actions/auth-actions";
import { TIngredientsActions } from "../services/actions/ingredients-actions";
import { TModalActions } from "../services/actions/modal-actions";
import { TOrderActions } from "../services/actions/order-actions";
import { TPasswordActions } from "../services/actions/password-actions";
import { TUserActions } from "../services/actions/user-actions";
import { TFeedActions } from "../services/actions/feed-actions";
import { TWSActions } from "../services/actions/ws-actions";

import { store } from "..";

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TAuthActions
  | TIngredientsActions
  | TModalActions
  | TOrderActions
  | TPasswordActions
  | TUserActions
  | TFeedActions
  | TWSActions;

/*export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;*/

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, unknown, TApplicationActions>
>;

//export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
>;

export interface IBurgerRequest {
  ingredients: Array<string>;
}

export interface IBurgerIngredientFromApi {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IGetUserResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export interface IRegisterUserAndLoginResponse extends IGetUserResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IPatchUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface IBurgerIngredientForList extends IBurgerIngredientFromApi {
  counter: number;
}

export interface IBurgerIngredientForConstructor
  extends IBurgerIngredientForList {
  dragId: string;
}

export interface IConstructorState {
  selectedIngredients: Array<IBurgerIngredientForConstructor>;
  selectedBun: IBurgerIngredientForList;
  totalPrice: number;
}

export interface IIngredientsState {
  bunList: Array<IBurgerIngredientForList>;
  sauceList: Array<IBurgerIngredientForList>;
  mainList: Array<IBurgerIngredientForList>;
}

export interface IModalState {
  modalVisible: boolean;
  header: string;
  modalContent: object;
  details: IBurgerIngredientForList | null;
  useNavBackStep: boolean;
}

export interface IGetAllIngredientsState {
  allIngredients: Array<IBurgerIngredientFromApi>;
  loading: boolean;
  error: string | null;
}

export interface IOrderState {
  orderNumber: number | null;
  loading: boolean;
  error: string | null;
}

export interface IUser {
  email: string;
  name: string;
}

export interface IProfileState {
  userProfile: IUser | null;
  isAuthChecked: boolean;
  error: string | null;
}

export interface IPasswordState {
  messageForForgot: string | null;
  messageForReset: string | null;
  loading: boolean;
  errorForForgot: string | null;
  errorForReset: string | null;
  emailForReset: string | null;
}

export interface ILoginLogoutState {
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  message: string | null;
  userLogedIn: IUser | null;
}

export interface IRegisterState {
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
}

export interface IBurgerOrder {
  ingredients: Array<string>;
  _id: string;
  status: "created" | "pending" | "done";
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IMessageResponse {
  success: boolean;
  orders: Array<IBurgerOrder>;
  total: number;
  totalToday: number;
}

export interface IMessage extends Omit<IMessageResponse, "success"> {}

export interface IFeedState {
  doneOrders: Array<string>;
  pendingOrders: Array<string>;
}

export interface IWSState {
  wsConnected: boolean;
  message: IMessage | null;

  error?: Event;
}

export interface IBurgerForOrderListProps {
  orderId: string;
  orderName: string;
  orderNumber: number;
  orderStatus: "created" | "pending" | "done";
  orderIngredients: Array<string>;
  orderCreatedAt: string;
}

export interface IIngredientForBurgerOrderProps {
  iconSrc: string;
  alt?: string;
  price: number;
  name: string;
  count: number;
}

export interface IIngredientImageProps {
  iconSrc: string;
  alt?: string;
  overflow?: number;
  extraClass?: string;
}

export interface IRootState {
  constructorReducer: IConstructorState;
  burgerIngredientsReducer: IIngredientsState;
  modalReducer: IModalState;
  getAllIngredientsReducer: IGetAllIngredientsState;
  orderReducer: IOrderState;
  profileReducer: IProfileState;
  passwordReducer: IPasswordState;
  loginLogoutReducer: ILoginLogoutState;
  registerReducer: IRegisterState;
  feedReducer: IFeedState;
  wsReducer: IWSState;
}

export type TDragCallback = (dragIndex: number, hoverIndex: number) => void;

export interface IBackground {
  pathname: string;
  search?: string;
  hash?: string;
  state?: object | null;
  key?: string;
}
