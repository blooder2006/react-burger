import {
  POST_FORGOT_PSWD_REQUEST,
  POST_FORGOT_PSWD_SUCCESS,
  POST_FORGOT_PSWD_FAIL,
  POST_RESET_PSWD_REQUEST,
  POST_RESET_PSWD_SUCCESS,
  POST_RESET_PSWD_FAIL,
} from "../actions/password-actions";

const initialState = {
  messageForForgot: null,
  messageForReset: null,
  loading: false,
  errorForForgot: null,
  errorForReset: null,
  emailForReset: null,
};

export const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_FORGOT_PSWD_REQUEST: {
      return {
        ...state,
        loading: true,
        errorForForgot: null,
        messageForForgot: null,
        emailForReset: null,
      };
    }
    case POST_FORGOT_PSWD_SUCCESS: {
      return {
        ...state,
        messageForForgot: action.payload.message,
        emailForReset: action.payload.email,
        loading: false,
      };
    }
    case POST_FORGOT_PSWD_FAIL: {
      return {
        ...state,
        errorForForgot: action.payload,
        loading: false,
        messageForForgot: null,
      };
    }
    case POST_RESET_PSWD_REQUEST: {
      return {
        ...state,
        loading: true,
        errorForReset: null,
        messageForReset: null,
      };
    }
    case POST_RESET_PSWD_SUCCESS: {
      return {
        ...state,
        messageForReset: action.payload,
        loading: false,
        emailForReset: null,
      };
    }
    case POST_RESET_PSWD_FAIL: {
      return {
        ...state,
        errorForReset: action.payload,
        loading: false,
        messageForReset: null,
      };
    }
    default: {
      return state;
    }
  }
};
