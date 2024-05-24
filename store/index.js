import { createStore } from 'redux';

// Define your initial state
const initialState = {
  variable: null, // Set the initial value of the variable to null
  isBoolean: false,
  LeadFormFilled: false
};

// Define your reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VARIABLE':
      return {
        ...state,
        variable: action.payload
      };
      case 'SET_BOOLEAN':
      return {
        ...state,
        isBoolean: action.payload
      };
      case 'SET_FORMSUBMITTED':
      return {
        ...state,
        LeadFormFilled: action.payload
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

export default store;
