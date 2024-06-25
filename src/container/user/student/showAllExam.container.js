import { useState } from "react";
import lSGetItem from "../../../hook/lSGetItem";

const ShowAllExamContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allExam, setAllExam] = useState([]);
  const userInfo = lSGetItem("userInfo");

  return {
    isLoading,
    allExam,
  };
};

export default ShowAllExamContainer;
