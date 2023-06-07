import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_MESSAGE_ORDERS
} from "../actions/ws-actions";
import { initialState } from "./ws-reducer";
import { wsReducer } from "./ws-reducer";

describe("ws-reducer", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {})).toEqual({
      wsConnected: false,
      message: null,
      messageOrders: null,
    });
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    const action = {
      type: WS_CONNECTION_SUCCESS,
    };
    const testState = wsReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      wsConnected: true,
      error: undefined,
    });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    const action = {
      type: WS_CONNECTION_ERROR,
      payload: "error msg",
    };
    const testState = wsReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      error: "error msg",
    });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    const action = {
      type: WS_CONNECTION_CLOSED,
    };
    const testState = wsReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      error: undefined,
    });
  });

  it("should handle WS_GET_MESSAGE", () => {
    const action = {
      type: WS_GET_MESSAGE,
      payload: {
        orders: [
            {ingredients: ["111", "222", "333"],
            _id: "string",
            status: "created",
            number: 12345,
            createdAt: "string",
            updatedAt: "string",
            name: "string"}
        ],
        total: 10,
        totalToday: 5,
      },
    };
    const testState = wsReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      message: {
        orders: [
            {ingredients: ["111", "222", "333"],
            _id: "string",
            status: "created",
            number: 12345,
            createdAt: "string",
            updatedAt: "string",
            name: "string"}
        ],
        total: 10,
        totalToday: 5,
      }
    });
  });

  it("should handle WS_GET_MESSAGE_ORDERS", () => {
    const action = {
      type: WS_GET_MESSAGE_ORDERS,
      payload: {
        orders: [
            {ingredients: ["111", "222", "333"],
            _id: "string",
            status: "created",
            number: 12345,
            createdAt: "string",
            updatedAt: "string",
            name: "string"}
        ],
        total: 10,
        totalToday: 5,
      },
    };
    const testState = wsReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      messageOrders: {
        orders: [
            {ingredients: ["111", "222", "333"],
            _id: "string",
            status: "created",
            number: 12345,
            createdAt: "string",
            updatedAt: "string",
            name: "string"}
        ],
        total: 10,
        totalToday: 5,
      }
    });
  });
});
