// UPDATE_PRODUCTS is used by the ProductList component
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";

// UPDATE_CATEGORIES works a lot like UPDATE_PRODUCTS in that we want to take the list of categories retrieved from the server by Apollo and store it in this global state. 
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";

// UPDATE_CURRENT_CATEGORY is the connecting piece of data for the previous two actions we created
// we want to be able to select a category from the state created by UPDATE_CATEGORIES and display products for that category from the list we create from the UPDATE_PRODUCTS action
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";

// cart
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const TOGGLE_CART = 'TOGGLE_CART';