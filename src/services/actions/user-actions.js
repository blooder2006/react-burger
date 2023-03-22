import { fetchWithRefresh } from "../../utils/auth";
import { getCookie } from "../../utils/auth";
import { BASE_URL, USER_INFO_ENDPOINT } from "../../utils/urls";

export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_INFO_FAIL = "SET_USER_INFO_FAIL";
export const DEL_USER_INFO = "DEL_USER_INFO";
export const CHECKED_USER_AUTH = "CHECKED_USER_AUTH";
export const PATCH_USER_INFO_REQUEST = "PATCH_USER_INFO_REQUEST";
export const PATCH_USER_INFO_SUCCESS = "PATCH_USER_INFO_SUCCESS";
export const PATCH_USER_INFO_FAIL = "PATCH_USER_INFO_FAIL";

//запрос на получение данных пользователя
export function getUser(url) {
  return function (dispatch) {
    const getUserInfoOptions = {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: "Bearer " + getCookie("accessToken"),
      },
    };
    return fetchWithRefresh(url, getUserInfoOptions)
      .then((dataJson) => {
        dispatch({
          type: SET_USER_INFO,
          payload: dataJson.user,
        });
        return dataJson.user;
      })
      .catch((e) => {
        dispatch({
          type: SET_USER_INFO_FAIL,
          payload: e.message,
        });
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
    fetchWithRefresh(url, patchUserInfoOptions)
      .then((dataJson) => {
        dispatch({
          type: SET_USER_INFO,
          payload: dataJson.user,
        });
      })
      .catch((e) => {
        dispatch({
          type: SET_USER_INFO_FAIL,
          payload: e.message,
        });
      });
  };
}

//проверка авторизации
export const checkUserAuth = () => (dispatch) => {
  if (getCookie("accessToken")) {
    dispatch(getUser(`${BASE_URL}${USER_INFO_ENDPOINT}`)).finally(() => {
      dispatch({
        type: CHECKED_USER_AUTH,
      });
    });
  } else {
    dispatch({
      type: CHECKED_USER_AUTH,
    });
  }
};
