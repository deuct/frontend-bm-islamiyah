import { useState, useEffect } from "react";

export const useRPForm = (reportType) => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  const valueForm = {
    dateStart: "",
    dateEnd: "",
    reportType: reportType,
    showType: "Preview",
  };

  const previewForm = () => {
    let reportWindow = window.open(
      `${baseURL}/report/view/?dateStart=${valueForm.dateStart}&dateEnd=${valueForm.dateEnd}&reportType=${valueForm.reportType}&showType=${valueForm.showType}`,
      "",
      "MsgWindow"
    );
  };

  return {
    previewForm,
    valueForm,
  };
};
