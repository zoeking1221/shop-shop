import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from './actions';
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

    case ADD_TO_CART:
        return {
            ...state,
            cartOpen: true,
            // spread operator to preserve everything else on state
            // update the cart property to add action.product to the end of array
            cart: [...state.cart, action.product]
        };

    case ADD_MULTIPLE_TO_CART:
        return {
            ...state,
            cart: [...state.cart, ...action.products],
        };

    // filter method only keeps the items that don't match the provided _id property
    // in return statement, we check length of the array to set cartOpen to false when array empty
    case REMOVE_FROM_CART:
        let newState = state.cart.filter(product => {
            return product._id !== action._id;
        });
        return {
            ...state,
            cartOpen: newState.length > 0,
            cart: newState
        };

        case UPDATE_CART_QUANTITY:
            return {
              ...state,
              cartOpen: true,
              cart: state.cart.map(product => {
                if (action._id === product._id) {
                  product.purchaseQuantity = action.purchaseQuantity;
                }
                return product;
              })
            };

        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };

        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
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

