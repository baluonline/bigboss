import { configureStore } from '@reduxjs/toolkit';

import kidsReducer from './kids';

import kidsStore from './kids'

export const store = configureStore({
  reducer: {
    kidsStore: kidsStore
  }
});

export type AppDispatch = typeof store.dispatch

