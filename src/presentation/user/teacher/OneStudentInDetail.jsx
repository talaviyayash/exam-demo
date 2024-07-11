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
import EDTabel from "../../../shared/tabel/EDTabel";
import { studentHeaderArray } from "../../../description/teacher/oneStudentInDetail.description";

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
          <EDTabel
            headerArray={studentHeaderArray}
            data={studentInfo?.Result}
          />
        ) : (
          <>
            <NotFound text={"No Result found"} />
          </>
        )}
      </div>
    </>
  );
};

export default OneStudentInDetail;
