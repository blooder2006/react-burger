import {
    HIDE_MODAL,
} from "../actions/modal-actions";

import type { TModalActions } from "../actions/modal-actions";
import { IModalState } from "../../utils/interfaces-and-types";

export const initialState: IModalState = {
  modalVisible: false,
  header: "",
  modalContent: {},
  details: null,
  useNavBackStep: false,
};

export const modalReducer = (state = initialState, action: TModalActions) => {
  switch (action.type) {

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

    default: {
      return state;
    }
  }
};
