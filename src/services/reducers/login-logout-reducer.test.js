import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAIL,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAIL,
} from "../actions/auth-actions";
import { initialState } from "./login-logout-reducer";
import { loginLogoutReducer } from "./login-logout-reducer";

describe("login-logout-reducer", () => {
  it("should return the initial state", () => {
    expect(loginLogoutReducer(undefined, {})).toEqual({
        loading: false,
        accessToken: null,
        refreshToken: null,
        error: null,
        message: null,
        userLogedIn: null,
    });
  });

  it("should handle POST_LOGIN_REQUEST", () => {
    const action = {
      type: POST_LOGIN_REQUEST,
    };
    const testState = loginLogoutReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should handle POST_LOGOUT_REQUEST", () => {
    const action = {
      type: POST_LOGOUT_REQUEST,
    };
    const testState = loginLogoutReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should handle POST_LOGIN_FAIL", () => {
    const action = {
      type: POST_LOGIN_FAIL,
      payload: "error msg",
    };
    const testState = loginLogoutReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      error: "error msg",
    });
  });

  it("should handle POST_LOGOUT_FAIL", () => {
    const action = {
      type: POST_LOGOUT_FAIL,
      payload: "error msg",
    };
    const testState = loginLogoutReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      error: "error msg",
    });
  });

  it("should handle POST_LOGIN_SUCCESS", () => {
    const action = {
      type: POST_LOGIN_SUCCESS,
      payload: {
        accessToken: "Bearer accessToken",
        refreshToken: "refreshToken",
        user: { email: "email", name: "user name" },
      },
    };
    const testState = loginLogoutReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      userLogedIn: { email: "email", name: "user name" },
    });
  });

  it("should handle POST_LOGOUT_SUCCESS", () => {
    const action = {
      type: POST_LOGOUT_SUCCESS,
      payload: "message"
    };
    const testState = loginLogoutReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      message: "message"
    });
  });

});
