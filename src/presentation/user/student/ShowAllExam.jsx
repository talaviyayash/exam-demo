import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ShowAllExamContainer from "../../../container/user/student/showAllExam.container";
import Loading from "../../../shared/Loading";
import { Button } from "@mui/material";
import ShowResult from "./ShowResult";
import { SHOW_EXAM } from "../../../description/student/showAllExam.description";
import { GIVE_EXAM } from "../../../utils/constants";

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
  if (showResult.show)
    return (
      <ShowResult setShowResult={setShowResult} data={showResult.result[0]} />
    );

  return (
    <>
      <div className="table-container">
        <h1> All Exam</h1>
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "1000px",
            overflowX: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Table
            sx={{ maxWidth: "1000px", overflowX: "auto" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Subject Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allExam.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.subjectName}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        if (row.Result.length === 0) {
                          return redirectToGiveExam(row.subjectName, row._id);
                        }
                        showResultHandel(row.Result);
                      }}
                    >
                      {row.Result.length === 0 ? GIVE_EXAM : SHOW_EXAM}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ShowAllExam;
