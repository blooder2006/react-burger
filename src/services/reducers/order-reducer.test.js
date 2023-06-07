import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
  } from "../actions/order-actions";
import { initialState } from "./order-reducer";
import { orderReducer } from "./order-reducer";

describe("order-reducer", () => {
    it("should return the initial state", () => {
        expect(orderReducer(undefined, {})).toEqual({
            orderNumber: null,
            loading: false,
            error: null,
        });
      });

      it("should handle GET_ORDER_REQUEST", () => {
        const action = {
          type: GET_ORDER_REQUEST,
        };
        const testState = orderReducer(initialState, action);
        expect(testState).toEqual({
          ...initialState,
          loading: true,
        });
      });

      it("should handle GET_ORDER_FAIL", () => {
        const action = {
          type: GET_ORDER_FAIL,
          payload: "error msg",
        };
        const testState = orderReducer(initialState, action);
        expect(testState).toEqual({
          ...initialState,
          error: "error msg",
        });
      });

      it("should handle GET_ORDER_SUCCESS", () => {
        const action = {
          type: GET_ORDER_SUCCESS,
          payload: 12345
        };
        const testState = orderReducer(initialState, action);
        expect(testState).toEqual({
          ...initialState,
          orderNumber: 12345
        });
      });
});