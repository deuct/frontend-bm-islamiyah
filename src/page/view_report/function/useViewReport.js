import { useState, useEffect, useRef } from "react";
import JsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useAxiosJWT } from "../../../function/AxiosJWT";

export const useViewReport = (configAxios) => {
  const [params] = useSearchParams();

  const navigate = useNavigate();

  const { axiosJWT } = useAxiosJWT();

  const valueForm = {
    dateStart: params.get("dateStart"),
    dateEnd: params.get("dateEnd"),
    reportType: params.get("reportType"),
    showType: params.get("showType"),
  };

  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await axiosJWT.post(
        "/report/view",
        valueForm,
        configAxios
      );

      if (response) {
        setReportData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tableRef = useRef(null);

  const [counter, setCounter] = useState(0);

  const generatePDF = () => {
    const report = new JsPDF("landscape", "pt", "a2");

    report.html(document.querySelector("#report-content")).then(() => {
      report.save("report.pdf");
    });

    if (valueForm.showType === "pdf" && reportData.length > 0) {
      setCounter(1);
    }
  };

  useEffect(() => {
    if (reportData.length > 0) {
      if (counter < 1) {
        if (valueForm.showType === "pdf") {
          generatePDF();
        } else if (valueForm.showType === "excel") {
          autoDownloadExcel();
        }
      } else if (counter === 1) {
        setTimeout(() => {
          window.close();
        }, 1000);
      }
    }
  }, [reportData, params, counter]);

  const autoDownloadExcel = () => {
    const excelButton = document.getElementById("btn-excel");

    if (excelButton) {
      excelButton.click();
      setCounter(1);
    }
  };

  return { params, tableRef, generatePDF, valueForm, reportData };
};
