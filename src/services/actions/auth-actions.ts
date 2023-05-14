import { checkResponse } from "../../utils/check-response";
import { IRegisterUserAndLoginResponse } from "../../utils/interfaces-and-types";
import { AppDispatch } from "../../utils/interfaces-and-types";
import { AppThunk } from "../../utils/interfaces-and-types";

export const POST_REGISTER_USER_REQUEST: "POST_REGISTER_USER_REQUEST" =
  "POST_REGISTER_USER_REQUEST";
export const POST_REGISTER_USER_SUCCESS: "POST_REGISTER_USER_SUCCESS" =
  "POST_REGISTER_USER_SUCCESS";
export const POST_REGISTER_USER_FAIL: "POST_REGISTER_USER_FAIL" =
  "POST_REGISTER_USER_FAIL";

export const POST_LOGIN_REQUEST: "POST_LOGIN_REQUEST" = "POST_LOGIN_REQUEST";
export const POST_LOGIN_SUCCESS: "POST_LOGIN_SUCCESS" = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_FAIL: "POST_LOGIN_FAIL" = "POST_LOGIN_FAIL";

export const POST_LOGOUT_REQUEST: "POST_LOGOUT_REQUEST" = "POST_LOGOUT_REQUEST";
export const POST_LOGOUT_SUCCESS: "POST_LOGOUT_SUCCESS" = "POST_LOGOUT_SUCCESS";
export const POST_LOGOUT_FAIL: "POST_LOGOUT_FAIL" = "POST_LOGOUT_FAIL";

export interface IRegisterUserRequest {
  name: string;
  password: string;
  email: string;
}

export interface ILoginRequest {
  password: string;
  email: string;
}

export interface ILogoutToken {
  token: string | null;
}

interface ILogoutResponse {
  success: boolean;
  message: string;
}

export interface IPostLoginRequestAction {
  readonly type: typeof POST_LOGIN_REQUEST;
}

export interface IPostLoginSuccessAction {
  readonly type: typeof POST_LOGIN_SUCCESS;
  readonly payload: IRegisterUserAndLoginResponse;
}

export interface IPostLoginFailAction {
  readonly type: typeof POST_LOGIN_FAIL;
  readonly payload: string;
}

export interface IPostLogoutRequestAction {
  readonly type: typeof POST_LOGOUT_REQUEST;
}

export interface IPostLogoutSuccessAction {
  readonly type: typeof POST_LOGOUT_SUCCESS;
  readonly payload: string;
}

export interface IPostLogoutFailAction {
  readonly type: typeof POST_LOGOUT_FAIL;
  readonly payload: string;
}

export interface IPostRegisterUserRequestAction {
  readonly type: typeof POST_REGISTER_USER_REQUEST;
}

export interface IPostRegisterUserSuccessAction {
  readonly type: typeof POST_REGISTER_USER_SUCCESS;
  readonly payload: IRegisterUserAndLoginResponse;
}

export interface IPostRegisterUserFailAction {
  readonly type: typeof POST_REGISTER_USER_FAIL;
  readonly payload: string;
}

export type TAuthActions =
  | IPostLoginRequestAction
  | IPostLoginSuccessAction
  | IPostLoginFailAction
  | IPostLogoutRequestAction
  | IPostLogoutSuccessAction
  | IPostLogoutFailAction
  | IPostRegisterUserRequestAction
  | IPostRegisterUserSuccessAction
  | IPostRegisterUserFailAction;

//запрос на регистрацию пользователя
export const postRegisterUser: AppThunk = (
  url: string,
  registerUserRequest: IRegisterUserRequest
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: POST_REGISTER_USER_REQUEST,
    });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(registerUserRequest),
    })
      .then((res) => checkResponse(res))
      .then((dataJson: IRegisterUserAndLoginResponse) =>
        dispatch({
          type: POST_REGISTER_USER_SUCCESS,
          payload: dataJson,
        })
      )
      .catch((e: Error) => {
        dispatch({
          type: POST_REGISTER_USER_FAIL,
          payload: e.message,
        });
      });
  };
};

//запрос на авторизацию пользователя
export const postLogin: AppThunk = (
  url: string,
  loginRequest: ILoginRequest
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: POST_LOGIN_REQUEST,
    });

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((res) => checkResponse(res))
      .then((dataJson: IRegisterUserAndLoginResponse) =>
        dispatch({
          type: POST_LOGIN_SUCCESS,
          payload: dataJson,
        })
      )
      .catch((e: Error) => {
        dispatch({
          type: POST_LOGIN_FAIL,
          payload: e.message,
        });
      });
  };
};

//запрос на выход пользователя
export const postLogout: AppThunk = (url: string, token: ILogoutToken) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: POST_LOGOUT_REQUEST,
    });

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(token),
    })
      .then((res) => checkResponse(res))
      .then((dataJson: ILogoutResponse) =>
        dispatch({
          type: POST_LOGOUT_SUCCESS,
          payload: dataJson.message,
        })
      )
      .catch((e: Error) => {
        dispatch({
          type: POST_LOGOUT_FAIL,
          payload: e.message,
        });
      });
  };
};
