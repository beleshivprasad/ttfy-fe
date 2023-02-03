import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { sentenceCase } from "../helpers/string";

function FormError(props) {
  const {
    flashMessageType,
    flashMessage,
    showFlashMessage,
    setShowFlashMessage,
    errors,
  } = props;

  const getErrorMessage = () => {
    if (errors) {
      if (Array.isArray(errors)) {
        if (errors.length) return errors[0].msg;
        return flashMessage;
      }
      return errors;
    }
    return flashMessage;
  };

  return (
    <React.Fragment>
      <Snackbar
        open={showFlashMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setShowFlashMessage(false)}
        autoHideDuration={4000}
      >
        <Alert severity={flashMessageType || "info"}>
          {sentenceCase(getErrorMessage())}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default FormError;
