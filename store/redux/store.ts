import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import kidsStore from './kids';


const rootReducer = combineReducers({
  kidsStore: kidsStore,
});

// Create the Redux store
export const store = configureStore({
  reducer: {
    // Combine reducers from different slices
    kidsStore: kidsStore
  }
});

// Define the type for the dispatch function
export type AppDispatch = typeof store.dispatch;
export default store;