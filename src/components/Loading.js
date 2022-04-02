import React from "react";
import { Spinner } from "reactstrap";

function Loading() {
  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <Spinner color="warning">Loading...</Spinner>
    </div>
  );
}

export default Loading;
