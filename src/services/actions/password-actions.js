import { checkResponse } from "../../utils/check-response";

export const POST_FORGOT_PSWD_REQUEST = "POST_FORGOT_PSWD_REQUEST";
export const POST_FORGOT_PSWD_SUCCESS = "POST_FORGOT_PSWD_SUCCESS";
export const POST_FORGOT_PSWD_FAIL = "POST_FORGOT_PSWD_FAIL";
export const POST_RESET_PSWD_REQUEST = "POST_RESET_PSWD_REQUEST";
export const POST_RESET_PSWD_SUCCESS = "POST_RESET_PSWD_SUCCESS";
export const POST_RESET_PSWD_FAIL = "POST_RESET_PSWD_FAIL";

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