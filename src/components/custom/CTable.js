import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";

function CTable(props) {
  function columns() {
    return props.columns.map((column, idx) => {
      return (
        <TableCell key={`table-column-cell-${idx + 1}`}>
          {column.text}
        </TableCell>
      );
    });
  }

  function rows() {
    return props.rows.map((row, idx) => {
      return (
        <TableRow key={`table-body-row-${idx + 1}`}>
          {props.columns.map((column, idx) => {
            return (
              <TableCell key={`${row[column.value]}-${idx + 1}`}>
                {row[column.value]}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "grey" }}>{columns()}</TableRow>
        </TableHead>
        <TableBody>{rows()}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default CTable;
