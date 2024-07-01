export const CREATE_EXAM_FORM_NAME = "createExam";

export const CREATE_EXAM_SUBMIT_STATE = "createExam";

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

export const ALPHABETS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const totalOption = 4;

const makeQuestion = (totalOption) => {
  const options = [];
  for (let i = 1; i <= totalOption; i++) {
    options.push({
      name: "answer",
      type: "radio",
      required: {
        isRequired: false,
        defaultMsg: "Please select one option.",
      },
      labelName: ALPHABETS[i - 1],
      attributes: {
        name: "answer",
        id: ALPHABETS[i - 1],
        value: `options${i}`,
      },
    });
    options.push({
      name: `options${i}`,
      type: "text",
      required: {
        isRequired: true,
        defaultMsg: "Please add answer of option.",
      },
      attributes: {
        name: `options${i}`,
        id: `options${i}`,
      },
      labelName: `Options${i}`,
    });
  }
  return options;
};

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
    wrapElement: {
      style: { gridColumn: "1/3" },
    },
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
    wrapElement: {
      style: { gridColumn: "1/3" },
    },
  },
  ...makeQuestion(4),
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
    wrapElement: {
      style: { gridColumn: "1/3" },
    },
  },
];
