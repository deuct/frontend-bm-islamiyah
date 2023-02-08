import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import JsPDF from "jspdf";
import { useAxiosJWT } from "../../../function/AxiosJWT";

export const useViewBukuTabungan = (configAxios) => {
  const [params] = useSearchParams();
  const [counter, setCounter] = useState(0);

  const norek = params.get("norek");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");

  const { axiosJWT } = useAxiosJWT();

  const generatePDF = () => {
    const report = new JsPDF("potrait", "pt", "a5");

    report.html(document.querySelector("#tabungan-contents")).then(() => {
      report.save("report.pdf");
    });

    setCounter(1);
  };

  useEffect(() => {
    if (counter > 1) {
      setTimeout(() => {
        window.close();
      }, 5000);
    }
  }, [counter]);

  const [tabunganData, setTabunganData] = useState([]);

  useEffect(() => {
    if (norek.length > 0) {
      getTabungan();
    }
  }, [norek]);

  const getTabungan = async () => {
    const response = await axiosJWT.post(
      `/report/printout/bukutabungan?norek=${norek}&startDate=${startDate}&endDate=${endDate}`,
      configAxios
    );

    if (response) {
      setTabunganData(response.data);
      console.log(response.data);
    }
  };

  return { params, generatePDF, tabunganData };
};
