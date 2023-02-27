import {
  FILL_INGREDIENTS_LIST,
  CALC_BUN_COUNTER,
  CALC_SAUCE_COUNTER,
  CALC_MAIN_COUNTER,
} from "../actions/actions";

const initialState = {
  bunList: [],
  sauceList: [],
  mainList: [],
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILL_INGREDIENTS_LIST: {
      return {
        ...state,
        bunList: action.bunList,
        sauceList: action.sauceList,
        mainList: action.mainList,
      };
    }
    case CALC_BUN_COUNTER: {
      return {
        ...state,
        bunList: action.bunList,
      };
    }
    case CALC_SAUCE_COUNTER: {
      return {
        ...state,
        sauceList: action.sauceList,
      };
    }
    case CALC_MAIN_COUNTER: {
      return {
        ...state,
        mainList: action.mainList,
      };
    }
    default: {
      return state;
    }
  }
};
