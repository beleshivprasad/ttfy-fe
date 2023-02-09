import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import PersistentDrawerLeft from "../components/PersistentDrawer";

function Main(props) {
  return (
    <Box m={0} p={0} maxWidth="100vw" maxHeight={"100vh"}>
      <Stack spacing={4}>
        {/* <NavBar /> */}
        <PersistentDrawerLeft>
          <Container maxWidth={"100vh"}>
            <Box mb={3}>
              <Typography fontSize={35} fontWeight="bold">
                {props.title}
              </Typography>
            </Box>
            <Box m={0} p={0} width={"100%"}>
              {props.children}
            </Box>
          </Container>
        </PersistentDrawerLeft>
      </Stack>
    </Box>
  );
}

export default Main;
