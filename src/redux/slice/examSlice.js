import { createSlice } from "@reduxjs/toolkit";
import { EMPTY_STRING } from "../../description/globel.description";

const initialState = {
  subjectName: EMPTY_STRING,
  questions: [],
  notes: [],
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
      const { subject, whereToAdd, ...questions } = action.payload.question;
      state.questions[state.whereToAdd] = questions;
      state.whereToAdd = whereToAdd ?? state.whereToAdd + 1;
      state.subjectName = subject;
    },
    addAllState: (state, action) => {
      const { questions, subjectName, whereToAdd } = action.payload;
      state.subjectName = subjectName;
      state.questions = questions;
      state.whereToAdd = whereToAdd;
    },
    whereToAddUpdate: (state, action) => {
      state.whereToAdd = action.payload.whereToAdd;
    },
  },
});

export const { addSubjectName, addQuestion, addAllState, whereToAddUpdate } =
  examSlice.actions;

export default examSlice.reducer;
