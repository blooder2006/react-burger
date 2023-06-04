import { burgerIngredientsReducer } from "./burger-ingredients-reducer";
import {
  FILL_INGREDIENTS_LIST,
  CALC_BUN_COUNTER,
  CALC_SAUCE_COUNTER,
  CALC_MAIN_COUNTER,
} from "../actions/ingredients-actions";
import { initialState } from "./burger-ingredients-reducer";

describe("burger-ingredients-reducer", () => {
    it('should return the initial state', () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual({
            bunList: [],
            sauceList: [],
            mainList: [],
          })
      })


  it("should handle FILL_INGREDIENTS_LIST", () => {
    const action = {
      type: FILL_INGREDIENTS_LIST,
      bunList: [
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
        },
      ],
      sauceList: [
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
        },
      ],
      mainList: [
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
        },
      ],
    };
    const testState = burgerIngredientsReducer(initialState, action);

    expect(testState).toEqual({
      ...initialState,
      bunList: [
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
        },
      ],
      sauceList: [
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
        },
      ],
      mainList: [
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
        },
      ],
    });
  });
  it("should handle CALC_BUN_COUNTER", () => {
    const action = {
      type: CALC_BUN_COUNTER,
      bunList: [
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
        },
      ],
    };

    const testState = burgerIngredientsReducer(initialState, action);
    expect(testState).toEqual({
      ...initialState,
      bunList: [
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
        },
      ],
    });
  });
  it("should handle CALC_SAUCE_COUNTER", () => {
    const action = {
        type: CALC_SAUCE_COUNTER,
        sauceList: [
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
          },
        ],
      };
  
      const testState = burgerIngredientsReducer(initialState, action);
      expect(testState).toEqual({
        ...initialState,
        sauceList: [
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
          },
        ],
      });
  });
  it("should handle CALC_MAIN_COUNTER", () => {
    const action = {
        type: CALC_MAIN_COUNTER,
        mainList: [
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
          },
        ],
      };
  
      const testState = burgerIngredientsReducer(initialState, action);
      expect(testState).toEqual({
        ...initialState,
        mainList: [
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
          },
        ],
      });
  });
});
