import { createSlice } from '@reduxjs/toolkit';

const kidsSlice = createSlice({
  name: 'FavoriteKids',
  initialState: {
    kids: []
  },
  reducers: {

    addNewKid: (state, action) => {
      if (state.kids.find(kid => action.payload.id != kid.id)) {
        state.kids = { ...state.kids, ...action.payload.kid }
      }

    },
    deleteKid: (state, action) => {
      state.kids.splice(state.kids.indexOf(action.payload.kid.id), 1);
    },
    loadKidssList: (state, action) => {
      console.log("action " + JSON.stringify(action))
      state.kids = action.payload.kidsList;
    },
  }
});

export const loadKidssList = kidsSlice.actions.loadKidssList;
export const addNewKid = kidsSlice.actions.addNewKid;
export const deleteKid = kidsSlice.actions.deleteKid;
export default kidsSlice.reducer;