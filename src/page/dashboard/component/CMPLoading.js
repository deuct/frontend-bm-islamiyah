import React, { useState } from "react";
import "./style/CMPLoading.css";

function CMPLoading(props) {
  return (
    <>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
        <h4 className="loading-text">Loading...</h4>
      </div>
    </>
  );
}

export default CMPLoading;
