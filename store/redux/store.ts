import { configureStore } from '@reduxjs/toolkit';
import kidsStore from './kids';

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