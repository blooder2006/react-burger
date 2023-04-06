import { checkResponse } from "../../utils/check-response";
import { Dispatch } from 'redux';

export const POST_FORGOT_PSWD_REQUEST = "POST_FORGOT_PSWD_REQUEST";
export const POST_FORGOT_PSWD_SUCCESS = "POST_FORGOT_PSWD_SUCCESS";
export const POST_FORGOT_PSWD_FAIL = "POST_FORGOT_PSWD_FAIL";
export const POST_RESET_PSWD_REQUEST = "POST_RESET_PSWD_REQUEST";
export const POST_RESET_PSWD_SUCCESS = "POST_RESET_PSWD_SUCCESS";
export const POST_RESET_PSWD_FAIL = "POST_RESET_PSWD_FAIL";

interface IResetPasswordRequest {
  password: string;
  token: string;
}

interface IPostPasswordResponse {
  success: boolean;
  message: string;
}

interface IResetPasswordResponse {
  success: boolean;
  message: string;
}

//запрос на восстановление пароля
export function postForgotPassword(url: string, email: string)  {
    return function (dispatch: Dispatch) {
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
  }
  
  //запрос на установку нового пароля при его восстановлении
  export function postResetPassword(url: string, resetPasswordRequest: IResetPasswordRequest) {
    return function (dispatch: Dispatch) {
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
  }