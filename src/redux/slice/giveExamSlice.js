import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  whereToAdd: 0,
  answerOfQuestion: [],
};

const giveExamSlice = createSlice({
  name: "giveExam",
  initialState: initialState,
  reducers: {
    addQuestion: (state, action) => {
      const { questions } = action.payload;
      state.questions = questions;
    },
    whereToAddUpdate: (state, action) => {
      state.whereToAdd = action.payload.whereToAdd;
    },
    addAnswer: (state, action) => {
      state.answerOfQuestion[state.whereToAdd] = action.payload;
    },
    addAllAnswer: (state, action) => {
      state.answerOfQuestion = action.payload.answer;
    },
    resetGiveExamState: (state) => {
      state.questions = [];
      state.whereToAdd = 0;
      state.answerOfQuestion = [];
    },
  },
});

export const {
  addAnswer,
  addQuestion,
  resetGiveExamState,
  addAllAnswer,
  whereToAddUpdate,
} = giveExamSlice.actions;

export default giveExamSlice.reducer;
