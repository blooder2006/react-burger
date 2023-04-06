import { checkResponse } from "../../utils/check-response";
import { Dispatch } from 'redux';
import { IRegisterUserAndLoginResponse } from "../../utils/interfaces-and-types";

export const POST_REGISTER_USER_REQUEST = "POST_REGISTER_USER_REQUEST";
export const POST_REGISTER_USER_SUCCESS = "POST_REGISTER_USER_SUCCESS";
export const POST_REGISTER_USER_FAIL = "POST_REGISTER_USER_FAIL";

export const POST_LOGIN_REQUEST = "POST_LOGIN_REQUEST";
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_FAIL = "POST_LOGIN_FAIL";

export const POST_LOGOUT_REQUEST = "POST_LOGOUT_REQUEST";
export const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
export const POST_LOGOUT_FAIL = "POST_LOGOUT_FAIL";



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

//запрос на регистрацию пользователя
export function postRegisterUser(url: string, registerUserRequest: IRegisterUserRequest) {
    return function (dispatch: Dispatch) {
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
  }
  
  //запрос на авторизацию пользователя
  export function postLogin(url: string, loginRequest: ILoginRequest) {
    return function (dispatch: Dispatch) {
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
  }
  
  //запрос на выход пользователя
  export function postLogout(url: string, token: ILogoutToken) {
    return function (dispatch: Dispatch) {
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
  }