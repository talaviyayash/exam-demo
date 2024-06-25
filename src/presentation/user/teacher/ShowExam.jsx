import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShowExamContainer from "../../../container/user/teacher/showExam.container";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Loading from "../../../shared/Loading";

const ShowExam = () => {
  const { viewExamNavigate, isLoading, allExam, editExamNavigate, deleteExam } =
    ShowExamContainer();
  if (isLoading) return <Loading />;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Subject Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allExam.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.subjectName}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="right">
                <RemoveRedEyeIcon
                  onClick={() => viewExamNavigate(row.subjectName, row._id)}
                />
                <EditIcon
                  onClick={() => editExamNavigate(row.subjectName, row._id)}
                />
                <DeleteIcon
                  onClick={() => deleteExam(row._id)}
                  sx={{ marginRight: "30px" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowExam;
