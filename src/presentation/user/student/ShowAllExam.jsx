import ShowAllExamContainer from "../../../container/user/student/showAllExam.container";
import Loading from "../../../shared/Loading";
import { Button } from "@mui/material";
import ShowResult from "./ShowResult";
import EDTabel from "../../../shared/tabel/EDTabel";
import { allExamTableHeader } from "../../../description/student/showAllExam.description";

const ShowButton = ({ row, onClick }) => (
  <>
    <Button variant="outlined" onClick={onClick}>
      {row.Result.length === 0 ? "Give Exam" : "Show Results"}
    </Button>
  </>
);

const ShowAllExam = () => {
  const {
    isLoading,
    allExam,
    redirectToGiveExam,
    showResult,
    setShowResult,
    showResultHandel,
  } = ShowAllExamContainer();

  if (isLoading) return <Loading />;

  const actionObj = {
    action: [
      {
        Component: ShowButton,
        onClick: (row) => {
          if (row.Result.length === 0) {
            return redirectToGiveExam(row.subjectName, row._id);
          }
          return showResultHandel(row.Result);
        },
      },
    ],
  };
  return (
    <>
      {showResult.show && (
        <ShowResult
          show={showResult.show}
          setShowResult={setShowResult}
          data={showResult?.result[0]}
        />
      )}
      <div
        className="table-container"
        style={{ display: !showResult.show ? "flex" : "none" }}
      >
        <h1> All Exam</h1>
        <EDTabel
          headerArray={allExamTableHeader}
          data={allExam}
          actionObj={actionObj}
        />
      </div>
    </>
  );
};

export default ShowAllExam;
