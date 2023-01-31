import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CTable from "../../components/custom/CTable";
import Main from "../../layouts/Main";
import client from "../../services/axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await client.get("/user");
      setUsers(data);
      setColumns([
        {
          text: "ID",
          value: "id",
        },
        {
          text: "First Name",
          value: "first_name",
        },
        {
          text: "Last Name",
          value: "last_name",
        },
        {
          text: "Email",
          value: "email",
        },
      ]);
    }
    fetchUsers();
  }, []);

  return (
    <Main>
      <Box style={{ padding: 0 }}>
        <CTable columns={columns} rows={users}></CTable>
      </Box>
    </Main>
  );
}

export default UserList;
