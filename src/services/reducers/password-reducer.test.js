import {
  POST_FORGOT_PSWD_REQUEST,
  POST_FORGOT_PSWD_SUCCESS,
  POST_FORGOT_PSWD_FAIL,
  POST_RESET_PSWD_REQUEST,
  POST_RESET_PSWD_SUCCESS,
  POST_RESET_PSWD_FAIL,
} from "../actions/password-actions";
import { initialState } from "./password-reducer";
import { passwordReducer } from "./password-reducer";

describe("password-reducer", () => {
  it("should return the initial state", () => {
    expect(passwordReducer(undefined, {})).toEqual({
      messageForForgot: null,
      messageForReset: null,
      loading: false,
      errorForForgot: null,
      errorForReset: null,
      emailForReset: null,
    });
  });

  it("should handle POST_FORGOT_PSWD_REQUEST", () => {
    const action = {
      type: POST_FORGOT_PSWD_REQUEST,
    };
    const testState = passwordReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should handle POST_RESET_PSWD_REQUEST", () => {
    const action = {
      type: POST_RESET_PSWD_REQUEST,
    };
    const testState = passwordReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should handle POST_FORGOT_PSWD_FAIL", () => {
    const action = {
      type: POST_FORGOT_PSWD_FAIL,
      payload: "error msg",
    };
    const testState = passwordReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      errorForForgot: "error msg",
    });
  });

  it("should handle POST_RESET_PSWD_FAIL", () => {
    const action = {
      type: POST_RESET_PSWD_FAIL,
      payload: "error msg",
    };
    const testState = passwordReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      errorForReset: "error msg",
    });
  });

  it("should handle POST_FORGOT_PSWD_SUCCESS", () => {
    const action = {
      type: POST_FORGOT_PSWD_SUCCESS,
      payload: {
        message: "message",
        email: "email",
      },
    };
    const testState = passwordReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      messageForForgot: "message",
      emailForReset: "email",
    });
  });

  it("should handle POST_RESET_PSWD_SUCCESS", () => {
    const action = {
      type: POST_RESET_PSWD_SUCCESS,
      payload: "message",
    };
    const testState = passwordReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      messageForReset: "message",
    });
  });
});
