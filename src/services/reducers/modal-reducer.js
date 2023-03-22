import {
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_MODAL_WITH_NAV_STEP,
  SET_DETAILS,
} from "../actions/actions";

const initialState = {
  modalVisible: false,
  header: "",
  modalContent: {},
  details: null,
  useNavBackStep: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        ...state,
        modalVisible: true,
        header: action.header,
        modalContent: action.modalContent,
        details: action.details,
        useNavBackStep: false,
      };
    }
    case SHOW_MODAL_WITH_NAV_STEP: {
      return {
        ...state,
        modalVisible: true,
        header: action.header,
        modalContent: action.modalContent,
        details: action.details,
        useNavBackStep: true,
      };
    }
    case HIDE_MODAL: {
      return {
        ...state,
        modalVisible: false,
        header: "",
        modalContent: {},
        details: null,
        useNavBackStep: false,
      };
    }
    case SET_DETAILS: {
      return {
        ...state,
        details: action.details,
      };
    }
    default: {
      return state;
    }
  }
};
