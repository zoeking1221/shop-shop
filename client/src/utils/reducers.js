import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from "./actions";
import { useReducer } from 'react';

export const reducer = (state, action) => {
    switch (action.type) {
      // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
      case UPDATE_PRODUCTS:
        return {
          ...state,
          products: [...action.products]
        };
      // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
      case UPDATE_CATEGORIES:
        return {
          ...state,
          categories: [...action.categories]
        };

     case UPDATE_CURRENT_CATEGORY:
        return {
            ...state,
            currentCategory: action.currentCategory
        };   
  
      default:
        return state;
    }
  };

  // this function will be used to help initialize our global state object
  // then provide us with the functionality for updating that state by running it through our custom reducer() function
  // aka more in depth way of using the useState() hook
  export function useProductReducer(initialState) {
      return useReducer(reducer, initialState);
  }