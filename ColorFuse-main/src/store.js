// store.js

import { createStore } from 'redux';

const initialState = {
  imageData: null,
  posterData: null, 
  imageBase64: null,
  posterVal: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IMAGE_DATA':
      return {
        ...state,
        imageData: action.payload,
      };
    case 'SET_POSTER_DATA': 
      return {
        ...state,
        posterData: action.payload,
      };
      case 'SET_IMAGE_BASE64':
      return {
        ...state,
        imageBase64: action.payload,
      };
    case 'SET_POSTER_VAL': 
      return {
        ...state,
        posterVal: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(rootReducer);

export default store;
