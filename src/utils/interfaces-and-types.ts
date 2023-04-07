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

export interface IRegisterUserAndLoginResponse extends IGetUserResponse{
  accessToken: string;
  refreshToken: string;
}


export interface IPatchUserRequest {
  name: string;
  email:string;
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
  userLogedIn: IUser;
}

export interface IRegisterState {
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
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
}

export type TDragCallback = (dragIndex: number, hoverIndex: number) => void;

export interface IBackground {
  pathname: string;
  search?: string;
  hash?: string;
  state?: object | null;
  key?: string;
}
