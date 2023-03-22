import { checkResponse } from "../../utils/check-response";
import { getCookie } from "../../utils/auth";
import { fetchWithRefresh } from "../../utils/auth";
import { BASE_URL, USER_INFO_ENDPOINT } from "../../utils/urls";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAIL = "GET_INGREDIENTS_FAIL";

export const CHANGE_SELECTED_INGREDIENTS = "CHANGE_SELECTED_INGREDIENTS";
export const CHANGE_TOTAL_PRICE = "CHANGE_TOTAL_PRICE";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAIL = "GET_ORDER_FAIL";

export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const SHOW_MODAL_WITH_NAV_STEP = "SHOW_MODAL_WITH_NAV_STEP";
export const SET_DETAILS = "SET_DETAILS";

export const ADD_COMPONENT = "ADD_COMPONENT";
export const DEL_COMPONENT = "DEL_COMPONENT";
export const ADD_BUN = "ADD_BUN";

export const FILL_INGREDIENTS_LIST = "FILL_INGREDIENTS_LIST";
export const CALC_BUN_COUNTER = "CALC_BUN_COUNTER";
export const CALC_SAUCE_COUNTER = "CALC_SAUCE_COUNTER";
export const CALC_MAIN_COUNTER = "CALC_MAIN_COUNTER";

export const POST_FORGOT_PSWD_REQUEST = "POST_FORGOT_PSWD_REQUEST";
export const POST_FORGOT_PSWD_SUCCESS = "POST_FORGOT_PSWD_SUCCESS";
export const POST_FORGOT_PSWD_FAIL = "POST_FORGOT_PSWD_FAIL";

export const POST_RESET_PSWD_REQUEST = "POST_RESET_PSWD_REQUEST";
export const POST_RESET_PSWD_SUCCESS = "POST_RESET_PSWD_SUCCESS";
export const POST_RESET_PSWD_FAIL = "POST_RESET_PSWD_FAIL";

export const POST_REGISTER_USER_REQUEST = "POST_REGISTER_USER_REQUEST";
export const POST_REGISTER_USER_SUCCESS = "POST_REGISTER_USER_SUCCESS";
export const POST_REGISTER_USER_FAIL = "POST_REGISTER_USER_FAIL";

export const POST_LOGIN_REQUEST = "POST_LOGIN_REQUEST";
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_FAIL = "POST_LOGIN_FAIL";

export const POST_LOGOUT_REQUEST = "POST_LOGOUT_REQUEST";
export const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
export const POST_LOGOUT_FAIL = "POST_LOGOUT_FAIL";

export const SET_USER_INFO = "SET_USER_INFO";
export const DEL_USER_INFO = "DEL_USER_INFO";
export const CHECKED_USER_AUTH = "CHECKED_USER_AUTH";

export const PATCH_USER_INFO_REQUEST = "PATCH_USER_INFO_REQUEST";
export const PATCH_USER_INFO_SUCCESS = "PATCH_USER_INFO_SUCCESS";
export const PATCH_USER_INFO_FAIL = "PATCH_USER_INFO_FAIL";

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

//запрос на восстановление пароля
export function postForgotPassword(url, email) {
  return function (dispatch) {
    dispatch({
      type: POST_FORGOT_PSWD_REQUEST,
    });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => checkResponse(res))
      .then((dataJson) =>
        dispatch({
          type: POST_FORGOT_PSWD_SUCCESS,
          payload: { message: dataJson.message, email: email },
        })
      )
      .catch((e) => {
        dispatch({
          type: POST_FORGOT_PSWD_FAIL,
          payload: e.message,
        });
      });
  };
}

//запрос на установку нового пароля при его восстановлении
export function postResetPassword(url, resetPasswordRequest) {
  return function (dispatch) {
    dispatch({
      type: POST_RESET_PSWD_REQUEST,
    });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(resetPasswordRequest),
    })
      .then((res) => checkResponse(res))
      .then((dataJson) =>
        dispatch({
          type: POST_RESET_PSWD_SUCCESS,
          payload: dataJson.message,
        })
      )
      .catch((e) => {
        dispatch({
          type: POST_RESET_PSWD_FAIL,
          payload: e.message,
        });
      });
  };
}

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

    fetch(url, {
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

    fetch(url, {
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

//запрос на получение данных пользователя
export function getUser(url) {
  return function (dispatch) {
    const getUserInfoOptions = {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: "Bearer " + getCookie("accessToken"),
      },
    };
    return fetchWithRefresh(url, getUserInfoOptions).then((dataJson) => {
      dispatch({
        type: SET_USER_INFO,
        payload: dataJson.user,
      });
      return dataJson.user;
    });
  };
}

//запрос на изменение данных пользователя
export function patchUser(url, userAttrs) {
  return function (dispatch) {
    const patchUserInfoOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify(userAttrs),
    };
    fetchWithRefresh(url, patchUserInfoOptions).then((dataJson) => {
      dispatch({
        type: SET_USER_INFO,
        payload: dataJson.user,
      });
    });
  };
}

//проверка авторизации
export const checkUserAuth = () => (dispatch) => {
  if (getCookie("accessToken")) {
    dispatch(getUser(`${BASE_URL}${USER_INFO_ENDPOINT}`)).finally(() =>
      dispatch({
        type: CHECKED_USER_AUTH,
      })
    );
  } else {
    dispatch({
      type: CHECKED_USER_AUTH,
    });
  }
};

//запрос на создание заказа
export function getOrder(url, burgerRequest) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    return fetchWithRefresh(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify(burgerRequest),
    })
      .then((dataJson) =>
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: dataJson.order.number,
        })
      )
      .catch((e) => {
        dispatch({
          type: GET_ORDER_FAIL,
          payload: e.message,
        });
      });
  };
}
