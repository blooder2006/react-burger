import {
  POST_REGISTER_USER_REQUEST,
  POST_REGISTER_USER_SUCCESS,
  POST_REGISTER_USER_FAIL,
} from "../actions/auth-actions";

const initialState = {
  loading: false,
  accessToken: null,
  refreshToken: null,
  error: null,
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REGISTER_USER_REQUEST: {
      return {
        ...state,
        loading: true,
        accessToken: null,
        refreshToken: null,
        error: null
      };
    }
    case POST_REGISTER_USER_SUCCESS: {
      return {
        ...state,
        accessToken: action.payload.accessToken.split('Bearer ')[1],
        refreshToken: action.payload.refreshToken,
        loading: false,
      };
    }
    case POST_REGISTER_USER_FAIL: {
      return {
        ...state,
        error: action.payload,
        loading: false,
        accessToken: null,
        refreshToken: null,
      };
    }
    default: {
      return state;
    }
  }
};
