import { createStore, combineReducers } from "redux";

const initState = {
  products: [],
  users: []
};

const reducer = (state = initState, action) => {
  const { users } = state;
  switch (action.type) {
    case "SET_USERS":
      return Object.assign({}, state, { users: action.users });
      break;
    case "SET_PRODUCTS":
      return Object.assign({}, state, { products: action.products });
      break;
    case "CREATE_USERS":
      return Object.assign({}, state, { users: [...users, action.user] });
      break;
    case "DELETE_USER":
      const index = users.findIndex(user => user.id === action.id * 1);
      return Object.assign({}, state, {
        users: [...users.slice(0, index), ...users.slice(index + 1)]
      });

      break;
  }
  return state;
};

const store = createStore(reducer);

export default store;
