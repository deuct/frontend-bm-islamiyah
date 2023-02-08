import { useState, useEffect } from "react";

export const useRPForm = (reportType) => {
  const valueForm = {
    dateStart: "",
    dateEnd: "",
    reportType: reportType,
    showType: "Preview",
  };

  const previewForm = () => {
    let reportWindow = window.open(
      `http://localhost:3000/report/view/?dateStart=${valueForm.dateStart}&dateEnd=${valueForm.dateEnd}&reportType=${valueForm.reportType}&showType=${valueForm.showType}`,
      "",
      "MsgWindow"
    );
  };

  return {
    previewForm,
    valueForm,
  };
};
