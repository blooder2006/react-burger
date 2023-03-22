import { checkResponse } from "../../utils/check-response";

export const POST_REGISTER_USER_REQUEST = "POST_REGISTER_USER_REQUEST";
export const POST_REGISTER_USER_SUCCESS = "POST_REGISTER_USER_SUCCESS";
export const POST_REGISTER_USER_FAIL = "POST_REGISTER_USER_FAIL";

export const POST_LOGIN_REQUEST = "POST_LOGIN_REQUEST";
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_FAIL = "POST_LOGIN_FAIL";

export const POST_LOGOUT_REQUEST = "POST_LOGOUT_REQUEST";
export const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
export const POST_LOGOUT_FAIL = "POST_LOGOUT_FAIL";

//запрос на регистрацию пользователя
export function postRegisterUser(url, registerUserRequest) {
    return function (dispatch) {
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
        .then((dataJson) =>
          dispatch({
            type: POST_REGISTER_USER_SUCCESS,
            payload: dataJson,
          })
        )
        .catch((e) => {
          dispatch({
            type: POST_REGISTER_USER_FAIL,
            payload: e.message,
          });
        });
    };
  }
  
  //запрос на авторизацию пользователя
  export function postLogin(url, loginRequest) {
    return function (dispatch) {
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
        .then((dataJson) =>
          dispatch({
            type: POST_LOGIN_SUCCESS,
            payload: dataJson,
          })
        )
        .catch((e) => {
          dispatch({
            type: POST_LOGIN_FAIL,
            payload: e.message,
          });
        });
    };
  }
  
  //запрос на выход пользователя
  export function postLogout(url, token) {
    return function (dispatch) {
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
        .then((dataJson) =>
          dispatch({
            type: POST_LOGOUT_SUCCESS,
            payload: dataJson.message,
          })
        )
        .catch((e) => {
          dispatch({
            type: POST_LOGOUT_FAIL,
            payload: e.message,
          });
        });
    };
  }