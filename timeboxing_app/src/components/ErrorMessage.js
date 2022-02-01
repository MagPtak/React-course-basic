import React from "react";

function ErrorMessage(props) {
  const { hasError, message, children } = props;
  return hasError ? message : children;
}

export default ErrorMessage;
