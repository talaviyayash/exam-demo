export const EDIT_EXAM_FORM_NAME = "editExam";

export const EDIT_EXAM_HEADER_NAME = "Edit Exam";

export const LOADING_EXAM_DATA = "editExam";

export const UPDATE_EXAM_STATE = "updateExam";

export const ATTRIBUTE_NEXT_BUTTON = {
  innerText: "Next",
  className: "btn-all",
};
export const ATTRIBUTE_PREV_BUTTON = {
  innerText: "Prev",
  className: "btn-all",
};
export const ATTRIBUTE_UPDATE_BUTTON = {
  innerText: "UPDATE",
  className: "btn-all",
};

export const editExamForm = [
  {
    name: "subject",
    type: "text",
    required: {
      isRequired: true,
      defaultMsg: "Please Enter the Subject.",
    },
    attributes: {
      name: "subject",
      id: "subject",
    },
    labelName: "Subject",
  },
  {
    name: "question",
    type: "text",
    required: {
      isRequired: true,
      defaultMsg: "Please Enter the Question.",
    },
    attributes: {
      name: "question",
      id: "question",
    },
    labelName: "Question",
  },
  {
    name: "answer",
    type: "radio",
    required: {
      isRequired: true,
      defaultMsg: "Please select one option.",
    },
    labelName: "A",
    attributes: {
      name: "answer",
      id: "A",
      value: "options1",
    },
  },
  {
    name: "options1",
    type: "text",
    required: {
      isRequired: true,
      defaultMsg: "Please add answer of option.",
    },
    attributes: {
      name: "options1",
      id: "options1",
    },
    labelName: "Options1",
  },
  {
    name: "answer",
    type: "radio",
    required: {
      isRequired: true,
      defaultMsg: "Please select one option.",
    },
    labelName: "B",
    attributes: {
      name: "answer",
      id: "B",
      value: "options2",
    },
  },
  {
    name: "options2",
    type: "text",
    required: {
      isRequired: true,
      defaultMsg: "Please add answer of option.",
    },
    attributes: {
      name: "options2",
      id: "options2",
    },
    labelName: "Options2",
  },
  {
    name: "answer",
    type: "radio",
    required: {
      isRequired: true,
      defaultMsg: "Please select one option.",
    },
    labelName: "C",
    attributes: {
      name: "answer",
      id: "C",
      value: "options3",
    },
  },
  {
    name: "options3",
    type: "text",
    required: {
      isRequired: true,
      defaultMsg: "Please add answer of option.",
    },
    attributes: {
      name: "options3",
      id: "options3",
    },
    labelName: "Options3",
  },
  {
    name: "answer",
    type: "radio",
    required: {
      isRequired: true,
      defaultMsg: "Please select one option.",
    },
    labelName: "D",
    attributes: {
      id: "D",
      name: "answer",
      value: "options4",
    },
  },
  {
    name: "options4",
    type: "text",
    required: {
      isRequired: true,
      defaultMsg: "Please add answer of option.",
    },
    attributes: {
      name: "options4",
      id: "options4",
    },
    labelName: "Options4",
  },
  {
    name: "note",
    type: "text",
    required: {
      isRequired: false,
    },
    attributes: {
      name: "note",
      id: "note",
    },
    labelName: "Note",
  },
];
