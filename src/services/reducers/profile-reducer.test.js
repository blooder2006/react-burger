import {
  SET_USER_INFO,
  DEL_USER_INFO,
  CHECKED_USER_AUTH,
  SET_USER_INFO_FAIL,
} from "../actions/user-actions";

import { initialState } from "./profile-reducer";
import { profileReducer } from "./profile-reducer";

describe("profile-reducer", () => {
  it("should return the initial state", () => {
    expect(profileReducer(undefined, {})).toEqual({
      userProfile: null,
      isAuthChecked: false,
      error: null,
    });
  });

  it("should handle SET_USER_INFO", () => {
    const action = {
      type: SET_USER_INFO,
      payload: { email: "email", name: "user name" },
    };
    const testState = profileReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      userProfile: { email: "email", name: "user name" },
    });
  });

  it("should handle DEL_USER_INFO", () => {
    const action = {
      type: DEL_USER_INFO,
    };
    const testState = profileReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
    });
  });

  it("should handle CHECKED_USER_AUTH", () => {
    const action = {
      type: CHECKED_USER_AUTH,
    };
    const testState = profileReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  it("should handle SET_USER_INFO_FAIL", () => {
    const action = {
      type: SET_USER_INFO_FAIL,
      payload: "error msg",
    };
    const testState = profileReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      error: "error msg",
    });
  });
});
