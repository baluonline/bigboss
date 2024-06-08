import { createSlice } from '@reduxjs/toolkit';
import { uniqBy } from 'lodash';

const initialState: any = {
  kids: [],
  habits: []
};
const kidsSlice = createSlice({
  name: 'FavoriteKids',
  initialState,
  reducers: {
    addNewKid: (state, action) => {
      const newKid = action.payload;
      // Check if the kid already exists in the state
      if (!state.kids.some(kid => kid.id === newKid.id)) {
        state.kids.push(newKid);
      }
      console.log('add new Kids ' + JSON.stringify(state))
    },
    deleteKid: (state, action) => {
      state.kids.splice(state.kids.indexOf(action.payload.kid.id), 1);
    },
    loadKidsList: (state, action) => {
      console.log('action ' + JSON.stringify(action.payload))
      state.kids = uniqBy([...state.kids, ...action.payload], 'id');
    },
    loadHabitsList: (state, action) => {
      state.habits = uniqBy([...state.habits, ...action.payload], 'name');
    }
  }
});


export const loadKidsList = kidsSlice.actions.loadKidsList;
export const addNewKid = kidsSlice.actions.addNewKid;
export const deleteKid = kidsSlice.actions.deleteKid;

export const loadHabitsList = kidsSlice.actions.loadHabitsList;

export default kidsSlice.reducer;