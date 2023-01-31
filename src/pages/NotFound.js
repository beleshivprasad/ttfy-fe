import { Container, Typography } from "@mui/material";
import React, { Component } from "react";
import Main from "../layouts/Main";

export class NotFound extends Component {
  render() {
    return (
      <Main title={"Page Not Found"}>
        <Container maxWidth={"100%"} style={{ padding: 0 }}>
          <Typography fontFamily={'monospace'}>
            page you are looking for might have been moved/removed
          </Typography>
        </Container>
      </Main>
    );
  }
}

export default NotFound;
