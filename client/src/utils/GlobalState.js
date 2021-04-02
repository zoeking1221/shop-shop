// createContext will be used to instantiate a new Context object
//  using it to create the container to hold our global state data and functionality
// useContext allows us to use the state created from createContext
import React, { createContext, useContext } from "react";

import { useProductReducer } from './reducers';

// Every Context object comes with two components, a Provider and Consumer
// Provider: react component that we wrap our application in so it can make the state data passed into it as a prop available to other components
// Consumer: our means of grabbing and using the data Provider holds
const StoreContext = createContext();
const { Provider } = StoreContext;


// instantiate our initial global state with  useProductReducer()
// every time we run this useProductReducer function we receive: 
    // state: most up to date version of global state object
    // dispatch: method we execute to update our state - looks for an action object passed in as its argument
// StoreProvider is like our custom <Provider> component
    const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
    });
    // use this to confirm it works
    console.log(state);
        return <Provider value={[state, dispatch]} {...props} />
};

// custom react hook
const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };