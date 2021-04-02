// import our actions
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
  } from '../utils/actions';

import { reducer } from '../utils/reducers';

// create a sample of what our global state will look like
// current category refers to the index of the categories array
const initialState = {
    products: [],
    categories: [{ name: 'Food' }],
    currentCategory: '1',
    cart: [
        {
            _id: '1',
            name: 'Soup',
            purchaseQuantity: 1
        },
        {
            _id: '2',
            name: 'Bread',
            purchaseQuantity: 2
          }
    ],
    cartOpen: false
};

// tests
// newSate object will be the result of what comes from function reducer()
test('UPDATE PRODUCTS', () => {
    let newState = reducer(initialState, {
        type: UPDATE_PRODUCTS,
        products: [{}, {}]
    });

    expect(newState.products.length).toBe(2);
    expect(initialState.products.length).toBe(0);
});

test('UPDATE_CATEGORIES', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CATEGORIES,
        categories: [{}, {}]
    });

    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
});

test('UPDATE_CURRENT_CATEGORY', () => {
    let newState = reducer(initialState, {
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: '2'
    });
  
    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
  });


  // shopping cart tests
  // a reducer should treat the original state as immutable
  // test should verify that the initialState was not affected by the update
  test('ADD_TO_CART', () => {
    let newState = reducer(initialState, {
        type: ADD_TO_CART,
        product: { purchaseQuantity: 1 }
    });

    expect(newState.cart.length).toBe(3);
    expect(initialState.cart.length).toBe(2);
  });

  test('ADD_MULTIPLE_TO_CART', () => {
      let newState = reducer(initialState, {
          type: ADD_MULTIPLE_TO_CART,
          products: [{}, {}]
      });

      expect(newState.cart.length).toBe(4);
      expect(initialState.cart.length).toBe(2);
  });


  // this test will remove both cart items from initialState, one after the other
  // test the removal of both b/c removing the last item from the cart should also close it
  test('REMOVE_FROM_CART', () => {
    let newState1 = reducer(initialState, {
      type: REMOVE_FROM_CART,
      _id: '1'
    });
  
    // cart is still open
    expect(newState1.cartOpen).toBe(true);
  
    // the second item should now be the first
    expect(newState1.cart.length).toBe(1);
    expect(newState1.cart[0]._id).toBe('2');
  
    let newState2 = reducer(newState1, {
      type: REMOVE_FROM_CART,
      _id: '2'
    });
  
    // cart is empty and closed
    expect(newState2.cartOpen).toBe(false);
    expect(newState2.cart.length).toBe(0);
  
    expect(initialState.cart.length).toBe(2);
  });

  // udpate item quantities
  test('UPDATE_CART_QUANTITY', () => {
    let newState = reducer(initialState, {
      type: UPDATE_CART_QUANTITY,
      _id: '1',
      purchaseQuantity: 3
    });
  
    expect(newState.cartOpen).toBe(true);
    expect(newState.cart[0].purchaseQuantity).toBe(3);
    expect(newState.cart[1].purchaseQuantity).toBe(2);
  
    expect(initialState.cartOpen).toBe(false);
  });


  // expects the cart to be empty and closed after the CLEAR_CART action is called
  test('CLEAR_CART', () => {
      let newState = reducer(initialState, {
          type: CLEAR_CART
      });

      expect(newState.cartOpen).toBe(false);
      expect(newState.cart.length).toBe(0);
      expect(initialState.cart.length).toBe(2);
  });

  // handle cart's visibility toggle
  // expects cartOpen to be the opposite of its previous value each time the action is called
  test('TOGGLE_CART', () => {
      let newState = reducer(initialState, {
          type: TOGGLE_CART
      });

      expect(newState.cartOpen).toBe(true);
      expect(initialState.cartOpen).toBe(false);

      let newState2 = reducer(newState, {
          type: TOGGLE_CART
      });

      expect(newState2.cartOpen).toBe(false);
  });
