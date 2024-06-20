import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjectName: "",
  questions: [],
  whereToAdd: 0,
};

const examSlice = createSlice({
  name: "exam",
  initialState: initialState,
  reducers: {
    addSubjectName: (state, action) => {
      state.subjectName = action.payload.subjectName;
    },
    addQuestion: (state, action) => {
      state.questions[state.whereToAdd] = action.payload.question;
      state.whereToAdd = state.whereToAdd + 1;
    },
    whereToAddUpdate: (state, action) => {
      state.whereToAdd = action.payload.whereToAdd;
    },
  },
});

export const { addSubjectName, addQuestion, whereToAddUpdate } =
  examSlice.actions;

export default examSlice.reducer;
