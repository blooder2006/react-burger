import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAIL,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAIL,
} from "../actions/auth-actions";

import type { TAuthActions } from "../actions/auth-actions";
import { ILoginLogoutState } from "../../utils/interfaces-and-types";

export const initialState: ILoginLogoutState = {
  loading: false,
  accessToken: null,
  refreshToken: null,
  error: null,
  message: null,
  userLogedIn: null,
};

export const loginLogoutReducer = (state = initialState, action: TAuthActions) => {
  switch (action.type) {
    case POST_LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
        accessToken: null,
        refreshToken: null,
        error: null,
      };
    }
    case POST_LOGIN_SUCCESS: {
      return {
        ...state,
        accessToken: action.payload.accessToken.split("Bearer ")[1],
        refreshToken: action.payload.refreshToken,
        userLogedIn: action.payload.user,
        loading: false,
      };
    }
    case POST_LOGIN_FAIL: {
      return {
        ...state,
        error: action.payload,
        loading: false,
        accessToken: null,
        refreshToken: null,
      };
    }
    case POST_LOGOUT_REQUEST: {
      return {
        ...state,
        loading: true,
        message: null,
        error: null,
      };
    }
    case POST_LOGOUT_SUCCESS: {
      return {
        ...state,
        message: action.payload,
        userLogedIn: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
      };
    }
    case POST_LOGOUT_FAIL: {
      return {
        ...state,
        error: action.payload,
        loading: false,
        message: null,
      };
    }
    default: {
      return state;
    }
  }
};
