import React from "react";
import { useTheme } from "@emotion/react";
import { StyledTableCell, StyledTableRow } from "../Components/StyledTable";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

/**
 * Displays a table of all the users in the database.
 *
 * @returns {JSX.Element} The rendered React component.
 */
const UsersTable = ({ users, setUser }) => {
  const theme = useTheme();

  return (
    <TableContainer>
      <Table
        sx={{
          m: 3,
          maxWidth: "95%",
          backgroundColor: theme.palette.background.paper,
          border: `3px solid ${theme.palette.primary.light}`,
        }}
        aria-label="user table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Username</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Created at</StyledTableCell>
            <StyledTableCell align="center">Admin?</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow key={user.id} onClick={() => setUser(user)}>
              <TableCell component="th" scope="row" align="center">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell align="center">{user.username}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.address}</TableCell>
              <TableCell align="center">{user.createdAt}</TableCell>
              <TableCell align="center">
                {user.roles.includes("ROLE_ADMIN") ? "YES" : ""}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
