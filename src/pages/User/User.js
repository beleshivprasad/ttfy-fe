import React from "react";
import { useParams } from "react-router-dom";
import Main from "../../layouts/Main";

function User() {
  const { id } = useParams();
  console.log(id);
  return <Main title="User">{id}</Main>;
}

export default User;
