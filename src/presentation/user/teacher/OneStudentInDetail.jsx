import React from "react";
import OneStudentInDetailContainer from "../../../container/user/teacher/oneStudentInDetail.container";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Loading from "../../../shared/Loading";
import NotFound from "../../../shared/NotFound";
import { NO_RESULT_FOUND } from "../../../description/teacher/oneStudentInDetail.description";

const OneStudentInDetail = () => {
  const { studentInfo, isLoading } = OneStudentInDetailContainer();
  if (isLoading) {
    return <Loading />;
  } else if (!studentInfo) {
    return <NotFound text={"Student"} />;
  }
  return (
    <>
      <div className="stud-info-container">
        <div>Name :- {studentInfo?.name}</div>
        <div>Email :- {studentInfo?.email}</div>

        {studentInfo?.Result?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Subject Name</TableCell>
                  <TableCell>Result Status</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Rank</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentInfo?.Result.length > 0 &&
                  studentInfo?.Result?.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.subjectName}
                      </TableCell>
                      <TableCell>{row.resultStatus}</TableCell>
                      <TableCell>{row.score}</TableCell>
                      <TableCell>{row.rank}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <>
            <NotFound text={NO_RESULT_FOUND} />
          </>
        )}
      </div>
    </>
  );
};

export default OneStudentInDetail;
