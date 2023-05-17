import { checkResponse } from "../../utils/check-response";
import { AppDispatch } from "../../utils/interfaces-and-types";
import { AppThunk } from "../../utils/interfaces-and-types";

export const POST_FORGOT_PSWD_REQUEST: "POST_FORGOT_PSWD_REQUEST" =
  "POST_FORGOT_PSWD_REQUEST";
export const POST_FORGOT_PSWD_SUCCESS: "POST_FORGOT_PSWD_SUCCESS" =
  "POST_FORGOT_PSWD_SUCCESS";
export const POST_FORGOT_PSWD_FAIL: "POST_FORGOT_PSWD_FAIL" =
  "POST_FORGOT_PSWD_FAIL";
export const POST_RESET_PSWD_REQUEST: "POST_RESET_PSWD_REQUEST" =
  "POST_RESET_PSWD_REQUEST";
export const POST_RESET_PSWD_SUCCESS: "POST_RESET_PSWD_SUCCESS" =
  "POST_RESET_PSWD_SUCCESS";
export const POST_RESET_PSWD_FAIL: "POST_RESET_PSWD_FAIL" =
  "POST_RESET_PSWD_FAIL";

interface IResetPasswordRequest {
  password: string;
  token: string;
}

interface IPostPasswordResponse {
  success?: boolean;
  message: string;
  email?: string;
}

interface IResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface IPostForgotPswdRequestAction {
  readonly type: typeof POST_FORGOT_PSWD_REQUEST;
}

export interface IPostForgotPswdSuccessAction {
  readonly type: typeof POST_FORGOT_PSWD_SUCCESS;
  readonly payload: IPostPasswordResponse;
}

export interface IPostForgotPswdFailAction {
  readonly type: typeof POST_FORGOT_PSWD_FAIL;
  readonly payload: string;
}

export interface IPostResetPswdRequestAction {
  readonly type: typeof POST_RESET_PSWD_REQUEST;
}

export interface IPostResetPswdSuccessAction {
  readonly type: typeof POST_RESET_PSWD_SUCCESS;
  readonly payload: string;
}

export interface IPostResetPswdFailAction {
  readonly type: typeof POST_RESET_PSWD_FAIL;
  readonly payload: string;
}

export type TPasswordActions =
  | IPostForgotPswdRequestAction
  | IPostForgotPswdSuccessAction
  | IPostForgotPswdFailAction
  | IPostResetPswdRequestAction
  | IPostResetPswdSuccessAction
  | IPostResetPswdFailAction;

//запрос на восстановление пароля
export const postForgotPassword: AppThunk = (url: string, email: string) => {
  return function (dispatch: AppDispatch) {
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
      .then((dataJson: IPostPasswordResponse) =>
        dispatch({
          type: POST_FORGOT_PSWD_SUCCESS,
          payload: { message: dataJson.message, email: email },
        })
      )
      .catch((e: Error) => {
        dispatch({
          type: POST_FORGOT_PSWD_FAIL,
          payload: e.message,
        });
      });
  };
};

//запрос на установку нового пароля при его восстановлении
export const postResetPassword: AppThunk = (
  url: string,
  resetPasswordRequest: IResetPasswordRequest
) => {
  return function (dispatch: AppDispatch) {
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
      .then((dataJson: IResetPasswordResponse) =>
        dispatch({
          type: POST_RESET_PSWD_SUCCESS,
          payload: dataJson.message,
        })
      )
      .catch((e: Error) => {
        dispatch({
          type: POST_RESET_PSWD_FAIL,
          payload: e.message,
        });
      });
  };
};
