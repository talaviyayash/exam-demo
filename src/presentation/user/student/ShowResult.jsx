import React from "react";
import EDButton from "../../../shared/button/EDButton";

const ShowResult = ({ data, setShowResult }) => {
  const goToMainPage = () => setShowResult({ show: false });
  return (
    <>
      <div className="result-container">
        <h2>Subject : {data.subjectName}</h2>
        <div>Score : {data.score}</div>
        <div>Result Status : {data.resultStatus}</div>
        <div>Rank : {data.rank}</div>
        <EDButton onClick={goToMainPage}>Go back</EDButton>
      </div>
    </>
  );
};

export default ShowResult;
