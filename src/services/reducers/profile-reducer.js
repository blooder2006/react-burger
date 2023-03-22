import {
  SET_USER_INFO,
  DEL_USER_INFO,
  CHECKED_USER_AUTH,
} from "../actions/actions";

const initialState = {
  userProfile: null,
  isAuthChecked: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO: {
      return {
        ...state,
        userProfile: action.payload,
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
    default: {
      return state;
    }
  }
};
