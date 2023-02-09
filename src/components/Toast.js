import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { sentenceCase } from "../helpers/string";
import { useDispatch } from "react-redux";
import { hideFlashMessage } from "../redux/actions/flashActions";

function FormError(props) {
  const { messageType, message, showMessage, errors, hideAfter } = props;
  const dispatch = useDispatch();

  const getErrorMessage = () => {
    if (errors) {
      if (Array.isArray(errors)) {
        if (errors.length) return errors[0].msg;
        return message;
      }
      return errors;
    }
    return message;
  };

  return (
    <React.Fragment>
      {showMessage ? (
        <Snackbar
          open={showMessage}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => dispatch(hideFlashMessage())}
          autoHideDuration={hideAfter || 3000}
        >
          <Alert severity={messageType || "info"}>
            {sentenceCase(getErrorMessage())}
          </Alert>
        </Snackbar>
      ) : null}
    </React.Fragment>
  );
}

export default FormError;
