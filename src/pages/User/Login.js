import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import Main from "../../layouts/Main";

function Login() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("acces_token")
  );
  useEffect(() => {
    if (accessToken) redirect("");
    return () => {
      console.log("cleanup");
    };
  }, [accessToken]);

  return <Main title="Login"></Main>;
}

export default Login;
