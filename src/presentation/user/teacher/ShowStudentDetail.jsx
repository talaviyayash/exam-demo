import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ShowStudentDetailContainer from "../../../container/user/teacher/showStudentDetail.container";
import Loading from "../../../shared/Loading";
import NotFound from "../../../shared/NotFound";
import ErrorButton from "../../../shared/button/ErrorButton";

const ShowStudentDetail = () => {
  const {
    allStudent,
    navigateToStudentInDetail,
    getAllStudentData,
    isError,
    isLoading,
  } = ShowStudentDetailContainer();
  if (isLoading) return <Loading />;
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allStudent.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell align="right">
                  <RemoveRedEyeIcon
                    onClick={() => navigateToStudentInDetail(row._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ShowStudentDetail;
