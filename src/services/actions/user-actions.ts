import { fetchWithRefresh } from "../../utils/auth";
import { getCookie } from "../../utils/auth";
import { BASE_URL, USER_INFO_ENDPOINT } from "../../utils/urls";
import {
  IPatchUserRequest,
  IGetUserResponse,
  IUser,
} from "../../utils/interfaces-and-types";
import { AppDispatch } from "../../utils/interfaces-and-types";
import { AppThunk } from "../../utils/interfaces-and-types";

export const SET_USER_INFO: "SET_USER_INFO" = "SET_USER_INFO";
export const SET_USER_INFO_FAIL: "SET_USER_INFO_FAIL" = "SET_USER_INFO_FAIL";
export const DEL_USER_INFO: "DEL_USER_INFO" = "DEL_USER_INFO";
export const CHECKED_USER_AUTH: "CHECKED_USER_AUTH" = "CHECKED_USER_AUTH";
export const PATCH_USER_INFO_REQUEST: "PATCH_USER_INFO_REQUEST" =
  "PATCH_USER_INFO_REQUEST";
export const PATCH_USER_INFO_SUCCESS: "PATCH_USER_INFO_SUCCESS" =
  "PATCH_USER_INFO_SUCCESS";
export const PATCH_USER_INFO_FAIL: "PATCH_USER_INFO_FAIL" =
  "PATCH_USER_INFO_FAIL";

export interface ISetUserInfoAction {
  readonly type: typeof SET_USER_INFO;
  readonly payload: IUser;
}

export interface ISetIserInfoFailAction {
  readonly type: typeof SET_USER_INFO_FAIL;
  readonly payload: string;
}

export interface IDelUserInfoAction {
  readonly type: typeof DEL_USER_INFO;
}

export interface ICheckedUserAuthAction {
  readonly type: typeof CHECKED_USER_AUTH;
}

export interface IPatchUserInfoRequestAction {
  readonly type: typeof PATCH_USER_INFO_REQUEST;
}

export interface IPatchUserInfoSuccessAction {
  readonly type: typeof PATCH_USER_INFO_SUCCESS;
}

export interface IPatchUserInfoFailAction {
  readonly type: typeof PATCH_USER_INFO_FAIL;
}

export type TUserActions =
  | ISetUserInfoAction
  | ISetIserInfoFailAction
  | IDelUserInfoAction
  | ICheckedUserAuthAction
  | IPatchUserInfoRequestAction
  | IPatchUserInfoSuccessAction
  | IPatchUserInfoFailAction;

//запрос на получение данных пользователя
export const getUser: AppThunk = (url: string) => {
  return async function (dispatch: AppDispatch) {
    const getUserInfoOptions = {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: "Bearer " + getCookie("accessToken"),
      },
    };
    return await fetchWithRefresh(url, getUserInfoOptions)
      .then((dataJson: IGetUserResponse) => {
        dispatch({
          type: SET_USER_INFO,
          payload: dataJson.user,
        });
        return dataJson.user;
      })
      .catch((e: Error) => {
        dispatch({
          type: SET_USER_INFO_FAIL,
          payload: e.message,
        });
      });
  };
};

//запрос на изменение данных пользователя
export const patchUser: AppThunk = (
  url: string,
  userAttrs: IPatchUserRequest
) => {
  return function (dispatch: AppDispatch) {
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
      .catch((e: Error) => {
        dispatch({
          type: SET_USER_INFO_FAIL,
          payload: e.message,
        });
      });
  };
};

//проверка авторизации
export const checkUserAuth: AppThunk = () => {return function (dispatch: AppDispatch) {
  if (getCookie("accessToken")) {
    dispatch(getUser(`${BASE_URL}${USER_INFO_ENDPOINT}`));
  }
    dispatch({
      type: CHECKED_USER_AUTH,
    });

}};