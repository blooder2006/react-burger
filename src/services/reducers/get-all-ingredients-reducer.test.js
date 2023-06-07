import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAIL,
} from "../actions/ingredients-actions";

import { initialState } from "./get-all-ingredients-reducer";

import { getAllIngredientsReducer } from "./get-all-ingredients-reducer";

describe("get-all-ingredients-reducer", () => {
  it("should return the initial state", () => {
    expect(getAllIngredientsReducer(undefined, {})).toEqual({
      allIngredients: [],
      loading: false,
      error: null,
    });
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    const action = {
      type: GET_INGREDIENTS_REQUEST,
    };
    const testState = getAllIngredientsReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should handle GET_INGREDIENTS_FAIL", () => {
    const action = {
      type: GET_INGREDIENTS_FAIL,
      payload: "error msg",
    };
    const testState = getAllIngredientsReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      error: "error msg",
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    const action = {
      type: GET_INGREDIENTS_SUCCESS,
      payload: [
        {
          _id: "string",
          name: "string",
          type: "string",
          proteins: 5,
          fat: 5,
          carbohydrates: 5,
          calories: 5,
          price: 5,
          image: "string",
          image_mobile: "string",
          image_large: "string",
          __v: 5,
        },
      ],
    };
    const testState = getAllIngredientsReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      allIngredients: [
        {
          _id: "string",
          name: "string",
          type: "string",
          proteins: 5,
          fat: 5,
          carbohydrates: 5,
          calories: 5,
          price: 5,
          image: "string",
          image_mobile: "string",
          image_large: "string",
          __v: 5,
        },
      ],
    });
  });
});
