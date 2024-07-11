import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShowExamContainer from "../../../container/user/teacher/showExam.container";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Loading from "../../../shared/Loading";
import EDTabel from "../../../shared/tabel/EDTabel";
import {
  tableHeaderArray,
  rowPerPageArray,
} from "../../../description/teacher/showExam.description";

const ShowExam = () => {
  const {
    deleteIsLoading,
    viewExamNavigate,
    isLoading,
    allExam = [],
    editExamNavigate,
    deleteExam,
  } = ShowExamContainer();
  if (isLoading || deleteIsLoading === true) return <Loading />;
  const actionObj = {
    action: [
      {
        Component: RemoveRedEyeIcon,
        onClick: viewExamNavigate,
      },
      {
        Component: EditIcon,
        onClick: editExamNavigate,
      },
      {
        Component: DeleteIcon,
        onClick: deleteExam,
      },
    ],
  };
  return (
    <>
      <div className="table-container-wrapper">
        <div className="table-container">
          <h1 className="text-center">Exam</h1>
          <EDTabel
            headerArray={tableHeaderArray}
            data={allExam}
            actionObj={actionObj}
            rowPerPageArray={rowPerPageArray}
          />
        </div>
        {allExam.length === 0 && (
          <h2 style={{ textAlign: "center" }}>There is no exam.</h2>
        )}
      </div>
    </>
  );
};

export default ShowExam;
