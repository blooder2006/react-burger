import { constructorReducer } from "./constructor-reducer";
import {
  CHANGE_SELECTED_INGREDIENTS,
  CHANGE_TOTAL_PRICE,
  ADD_COMPONENT,
  DEL_COMPONENT,
  ADD_BUN,
} from "../actions/ingredients-actions";
import { initialState } from "./constructor-reducer";

describe("constructor-reducer", () => {
  it("should return the initial state", () => {
    expect(constructorReducer(undefined, {})).toEqual({
      selectedIngredients: [],
      selectedBun: {},
      totalPrice: 0,
    });
  });

  it("should handle CHANGE_SELECTED_INGREDIENTS", () => {
    const action = {
      type: CHANGE_SELECTED_INGREDIENTS,
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
          counter: 5,
          dragId: "string",
        },
      ],
    };

    const testState = constructorReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      selectedIngredients: [
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
          counter: 5,
          dragId: "string",
        },
      ],
    });
  });

  it("should handle ADD_BUN", () => {
    const action = {
      type: ADD_BUN,
      item: {
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
        counter: 5,
        dragId: "string",
      },
    };

    const testState = constructorReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      selectedBun: {
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
        counter: 5,
        dragId: "string",
      },
    });
  });

  it("should handle CHANGE_TOTAL_PRICE", () => {
    const action = {
      type: CHANGE_TOTAL_PRICE,
      payload: 1000,
    };

    const testState = constructorReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      totalPrice: 1000,
    });
  });

  it("should handle ADD_COMPONENT", () => {
    const action = {
      type: ADD_COMPONENT,
      item: {
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
        counter: 5,
        dragId: "string",
      },
    };

    const testState = constructorReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      selectedIngredients: [{
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
        counter: 5,
        dragId: "string",
      }],
    });
  });

  it("should handle DEL_COMPONENT", () => {
    const action = {
      type: DEL_COMPONENT,
      index: 0,
    };

    const stateForDelTest = {
        ...initialState,
        selectedIngredients: [{
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
            counter: 5,
            dragId: "string",
          }],
      }

    const testState = constructorReducer(stateForDelTest, action);

    expect(testState).toEqual({
      ...initialState
    });
  });

});
