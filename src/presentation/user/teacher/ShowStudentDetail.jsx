import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ShowStudentDetailContainer from "../../../container/user/teacher/showStudentDetail.container";
import Loading from "../../../shared/Loading";
import NotFound from "../../../shared/NotFound";
import ErrorButton from "../../../shared/button/ErrorButton";
import EDTabel from "../../../shared/tabel/EDTabel";
import { studentTableHeaderArray } from "../../../description/teacher/showStudentDetail.description";

const ShowStudentDetail = () => {
  const {
    allStudent,
    navigateToStudentInDetail,
    getAllStudentData,
    isError,
    isLoading,
  } = ShowStudentDetailContainer();
  if (isLoading) return <Loading />;
  const actionObj = {
    view: [
      {
        Component: RemoveRedEyeIcon,
        onClick: navigateToStudentInDetail,
      },
    ],
  };
  if (isError)
    return (
      <>
        <div className="container" style={{ margin: "0" }}>
          <NotFound text={"Some thing went wrong"} />
          <ErrorButton
            innerText={"Retry"}
            onClick={() => getAllStudentData()}
          />
        </div>
      </>
    );

  return (
    <>
      <div className="table-container-wrapper">
        <div className="table-container">
          <h1 className="text-center">All Student Detail </h1>

          <EDTabel
            headerArray={studentTableHeaderArray}
            data={allStudent}
            actionObj={actionObj}
          />
        </div>
      </div>
    </>
  );
};
export default ShowStudentDetail;
