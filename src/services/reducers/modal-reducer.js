import { SHOW_MODAL, HIDE_MODAL } from "../actions/actions";

const initialState = {
  modalVisible: false,
  header: "",
  modalContent: {},
  details: null,
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
      };
    }
    case HIDE_MODAL: {
      return {
        ...state,
        modalVisible: false,
        header: "",
        modalContent: {},
        details: null,
      };
    }
    default: {
      return state;
    }
  }
};
