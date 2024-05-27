import { createSlice } from '@reduxjs/toolkit';


const initialState: any = {
  kids: [],

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
    loadKidssList: (state, action) => {
      console.log('before state changes ' + state.kids)
      console.log("action.payload ", action.payload)
      state.kids.push(action.payload);
      console.log("after  kids state " + JSON.stringify(state))
    },
  }
});

export const loadKidssList = kidsSlice.actions.loadKidssList;
export const addNewKid = kidsSlice.actions.addNewKid;
export const deleteKid = kidsSlice.actions.deleteKid;
export default kidsSlice.reducer;