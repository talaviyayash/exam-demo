import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import SelectOption from "../CommonInput/EDSelect";
import EDInput from "../CommonInput/EDInput";

const paginationButtonCss = {
  width: "50px",
  height: "30px",
  cursor: "pointer",
};

const EDTabel = ({
  headerArray = [],
  data = [],
  actionObj = {},
  rowPerPageArray = [5, 10, 15, 20],
}) => {
  const [page, setPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(rowPerPageArray[0]);
  const [dataToShow, setDataToShow] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [formateData, setFormateData] = useState([...data]);

  const handlePrev = (pageToSet) => {
    if (pageToSet !== 0) return setPage(pageToSet);
  };

  const handleNext = (pageToSet) => {
    if (totalPage >= pageToSet) setPage(pageToSet);
  };
  const handleLast = (pageToSet) => {
    if (totalPage !== 0) setPage(pageToSet);
  };

  const handelRowPerPage = (e) => {
    setRowPerPage(e.target.value);
    setPage(1);
  };
  const searchValueFunc = () => {
    const allData = [...data];
    return allData.filter((val) => {
      const valueFound = headerArray.filter((value = {}) => {
        const searchKeyValue = String(val?.[value?.key]);
        const searchValueRegex = new RegExp(searchValue.trim() ?? "", "i");
        return searchKeyValue.match(searchValueRegex);
      });
      return valueFound.length > 0;
    });
  };

  const handelSearch = (e) => {
    setSearchValue(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    let formateData = searchValueFunc();
    setFormateData(formateData);
    formateData = formateData.slice((page - 1) * rowPerPage, rowPerPage * page);
    setDataToShow(formateData);
  }, [page, rowPerPage, data, searchValue]);
  useEffect(() => {
    const totalPage = Math.ceil(formateData.length / rowPerPage);
    setTotalPage(totalPage);
  }, [rowPerPage, formateData]);
  const lengthOfFormateData = formateData.length;
  const rowOfRow =
    lengthOfFormateData === 0
      ? `0 - 0`
      : page * rowPerPage > lengthOfFormateData
      ? `${page * rowPerPage - rowPerPage + 1} - ${lengthOfFormateData}`
      : `${page * rowPerPage - rowPerPage + 1} - ${page * rowPerPage}`;

  console.log(page);
  return (
    <>
      <div style={{ width: "1000px", justifyContent: "end", display: "flex" }}>
        <EDInput
          value={searchValue}
          label="Search"
          id="search-input"
          onChange={handelSearch}
        />
      </div>
      <div style={{ height: "366px" }}>
        <TableContainer
          component={Paper}
          sx={{ width: "1000px !important", maxHeight: "366px" }}
        >
          <Table
            sx={{
              minWidth: 650,
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {headerArray.map(({ name, align = "left" }, index) => (
                  <TableCell key={index} align={align}>
                    {name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataToShow.map((row, parentIndex) => (
                <TableRow
                  key={parentIndex}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  height={20}
                >
                  {headerArray.map(
                    ({ key, isAction, align = "left" }, index) => (
                      <TableCell key={index} align={align}>
                        {isAction
                          ? actionObj[key]?.map(
                              ({ Component, onClick }, index) => (
                                <Component
                                  key={index}
                                  onClick={() => onClick(row, parentIndex)}
                                  row={row}
                                />
                              )
                            )
                          : row[key]}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {formateData.length === 0 && (
          <div
            style={{
              textAlign: "center",
              margin: "50px 0 0 0",
              fontSize: "25px",
            }}
          >
            No Result Found.
          </div>
        )}
      </div>

      <div className="pagination">
        <SelectOption
          option={rowPerPageArray}
          label={"Rows per page:"}
          value={rowPerPage}
          handleChange={handelRowPerPage}
        />
        <div>
          {rowOfRow} of {lengthOfFormateData}
        </div>
        <div>
          <FirstPageIcon
            onClick={() => setPage(1)}
            sx={paginationButtonCss}
            className={page === 1 ? "deactivate" : "active"}
          />
          <KeyboardArrowLeftIcon
            onClick={() => handlePrev(page - 1)}
            sx={paginationButtonCss}
            className={page === 1 ? "deactivate" : "active"}
          />
          <KeyboardArrowRightIcon
            onClick={() => handleNext(page + 1)}
            sx={paginationButtonCss}
            className={totalPage <= page ? "deactivate" : "active"}
          />
          <LastPageIcon
            onClick={() => handleLast(totalPage)}
            sx={paginationButtonCss}
            className={
              totalPage === page || totalPage === 0 ? "deactivate" : "active"
            }
          />
        </div>
      </div>
    </>
  );
};

export default memo(EDTabel);
