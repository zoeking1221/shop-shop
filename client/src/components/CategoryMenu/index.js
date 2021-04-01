import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

// import our custom useStoreContext() hook
import { useStoreContext } from "../../utils/GlobalState";

function CategoryMenu () {
  const [state, dispatch] = useStoreContext();

const { categories } = state;

const { data: categoryData } = useQuery(QUERY_CATEGORIES);

useEffect(() => {
  // if categoryData exists or has changed from the response of useQuery, then run dispatch()
  if (categoryData) {
    // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
    dispatch({
      type: UPDATE_CATEGORIES,
      categories: categoryData.categories
    });
  }
}, [categoryData, dispatch]);

// update tteh click handler to update global state instead of using the function we receive as a prop from Home
const handleClick = id => {
  dispatch({
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: id
  });
};


  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
