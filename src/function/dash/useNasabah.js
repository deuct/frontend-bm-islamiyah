import { useState, useEffect } from "react";

export const useGetNorek = (axiosJWT, configAxios) => {
  const [noRekening, setNoRekening] = useState("");

  useEffect(() => {
    getNoRek();
  }, []);

  const getNoRek = async () => {
    try {
      const response = await axiosJWT.get("/nasabah/newid", configAxios);

      setNoRekening(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { noRekening };
};

export const useGetNasabahById = (axiosJWT, configAxios, noRekening) => {
  const [dataNasabah, setDataNasabah] = useState([]);

  useEffect(() => {
    if (noRekening.length == 11) {
      getNasabah();
    }
  }, [noRekening]);

  const getNasabah = async () => {
    try {
      const response = await axiosJWT.get(
        `/nasabah/one/${noRekening}`,
        configAxios
      );

      if (response) {
        setDataNasabah(response.data[0]);
      }
    } catch (error) {
      console.log("error");
    }
  };

  return { dataNasabah };
};

export const useCountUnprinted = (
  axiosJWT,
  configAxios,
  noRekening,
  endDate
) => {
  const [totalUnprinted, setTotalUnprinted] = useState([]);
  const [unprinted, setUnprinted] = useState([]);
  const [lastPrintDate, setLastPrintDate] = useState([]);
  const [startPrintDate, setStartPrintDate] = useState([]);
  const [lastTransaksi, setLastTransaksi] = useState([]);

  const valueForm = {
    end_date: endDate,
    norek: noRekening,
  };

  console.log(valueForm);

  useEffect(() => {
    getCountUnpr();
  }, [endDate, noRekening]);

  const getCountUnpr = async () => {
    try {
      const response = await axiosJWT.post(
        `/nasabah/printdate/unprinted-count`,
        valueForm,
        configAxios
      );

      if (response) {
        setTotalUnprinted(response.data.printedTotal);
        setUnprinted(response.data.printedRange);
        setLastPrintDate(response.data.lastPrintDate);
        setStartPrintDate(response.data.startPrintDate);
        setLastTransaksi(response.data.lastTransaksi);
      }
    } catch (error) {
      console.log("error");
    }
  };

  return {
    totalUnprinted,
    unprinted,
    lastPrintDate,
    startPrintDate,
    lastTransaksi,
  };
};
