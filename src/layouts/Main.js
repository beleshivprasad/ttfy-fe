import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import NavBar from "../components/NavBar";

function Main(props) {
  return (
    <Box m={0} p={0} width="100vw">
      <Stack spacing={4}>
        <NavBar />
        <Container maxWidth={"100%"}>
          <Box mb={3}>
            <Typography fontSize={35} fontWeight="bold">
              {props.title}
            </Typography>
          </Box>
          <Box m={0} p={0} width={"100%"}>
            {props.children}
          </Box>
        </Container>
      </Stack>
    </Box>
  );
}

export default Main;
