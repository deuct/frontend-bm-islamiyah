import { useState, useEffect } from "react";

export const useNBSaldo = (axiosJWT, configAxios) => {
  const [showTable, setShowTable] = useState(false);
  const [dataNasabah, setDataNasabah] = useState([]);

  const saldoShow = async (e) => {
    try {
      e.preventDefault();

      const response = await axiosJWT.post(
        "/nasabah/saldo",
        { norek: dataToSubmit },
        configAxios
      );

      if (response) {
        setDataNasabah(response.data);
      }

      setShowTable(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [data, setData] = useState("");
  const [dataToSubmit, setDataToSubmit] = useState([]);

  const addData = (e) => {
    e.preventDefault();

    setDataToSubmit((prev) => [...prev, data]);
    setData("");
  };

  return {
    dataToSubmit,
    setDataToSubmit,
    addData,
    saldoShow,
    data,
    setData,
    dataNasabah,
    showTable,
  };
};
