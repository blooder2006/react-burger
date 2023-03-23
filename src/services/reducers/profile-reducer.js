import {
  SET_USER_INFO,
  DEL_USER_INFO,
  CHECKED_USER_AUTH,
  SET_USER_INFO_FAIL
} from "../actions/user-actions";

const initialState = {
  userProfile: null,
  isAuthChecked: false,
  error: null
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO: {
      return {
        ...state,
        userProfile: action.payload,
        error: null
      };
    }
    case DEL_USER_INFO: {
      return {
        ...state,
        userProfile: null,
      };
    }
    case CHECKED_USER_AUTH: {
      return {
        ...state,
        isAuthChecked: true,
      };
    }
    case SET_USER_INFO_FAIL: {
      return {
        ...state,
        error: action.payload,
        userProfile: null,
        isAuthChecked: false,
      };
    }
    default: {
      return state;
    }
  }
};
