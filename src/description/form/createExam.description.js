export const CREATE_EXAM_FORM_NAME = "createExam";

export const CREATE_EXAM_HEADER_NAME = "Create Exam";

export const ATTRIBUTE_NEXT_BUTTON = {
  innerText: "Next",
  sx: {
    width: "100px",
    height: "50px",
    fontSize: "18px",
  },
};

export const ATTRIBUTE_PREV_BUTTON = {
  innerText: "Prev",
  sx: {
    width: "100px",
    height: "50px",
    fontSize: "18px",
  },
};

export const totalOption = 4;

export const ATTRIBUTE_SUBMIT_BUTTON = {
  innerText: "SUBMIT",
  sx: {
    width: "100px",
    height: "50px",
    fontSize: "18px",
  },
};

export const createExamForm = [
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