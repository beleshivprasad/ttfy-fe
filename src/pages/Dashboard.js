import React from "react";
import { useLoaderData } from "react-router-dom";
import Main from "../layouts/Main";

function Dashboard() {
  const loaderData = useLoaderData();
  return <Main title="Dashboard"></Main>;
}

export default Dashboard;
