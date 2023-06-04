import {
  POST_REGISTER_USER_REQUEST,
  POST_REGISTER_USER_SUCCESS,
  POST_REGISTER_USER_FAIL,
} from "../actions/auth-actions";
import { initialState } from "./register-reducer";
import { registerReducer } from "./register-reducer";

describe("register-reducer", () => {
  it("should return the initial state", () => {
    expect(registerReducer(undefined, {})).toEqual({
      loading: false,
      accessToken: null,
      refreshToken: null,
      error: null,
    });
  });

  it("should handle POST_REGISTER_USER_REQUEST", () => {
    const action = {
      type: POST_REGISTER_USER_REQUEST,
    };
    const testState = registerReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should handle POST_REGISTER_USER_FAIL", () => {
    const action = {
      type: POST_REGISTER_USER_FAIL,
      payload: "error msg",
    };
    const testState = registerReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      error: "error msg",
    });
  });

  it("should handle POST_REGISTER_USER_SUCCESS", () => {
    const action = {
      type: POST_REGISTER_USER_SUCCESS,
      payload: {
        accessToken: "Bearer accessToken",
        refreshToken: "refreshToken",
      },
    };
    const testState = registerReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    });
  });
});
