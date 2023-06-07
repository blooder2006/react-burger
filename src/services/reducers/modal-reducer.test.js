import {
    HIDE_MODAL,
  } from "../actions/modal-actions";

import { initialState } from "./modal-reducer";

import { modalReducer } from "./modal-reducer";

describe("modal-reducer", () => {
    it("should return the initial state", () => {
        expect(modalReducer(undefined, {})).toEqual({
            modalVisible: false,
            header: "",
            modalContent: {},
            details: null,
            useNavBackStep: false,
        });
      });

      it("should handle HIDE_MODAL", () => {
        const action = {
          type: HIDE_MODAL,
        };
        const testState = modalReducer(initialState, action);
        expect(testState).toEqual({
          ...initialState
        });
      });
});