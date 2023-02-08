import { useEffect, useState } from "react";

export const useCardHome = (axiosJWT, configAxios, valueForm) => {
  const URLAPI = {
    nasabah: "/nasabah/total-nasabah",
    saldo: "/nasabah/total-saldo",
    transaksi: "/transaksi/total-transaksi",
  };

  const [resultCount, setResultCount] = useState([]);
  const [resData, setResData] = useState("");

  useEffect(() => {
    if (valueForm.nama !== "") {
      getData();
    }
  }, [valueForm]);

  let endPoint;

  const getData = async () => {
    try {
      endPoint = valueForm.nama;

      if (endPoint === "nasabah") {
        endPoint = URLAPI.nasabah;
        setResData("total_nasabah");
      } else if (endPoint === "saldo") {
        endPoint = URLAPI.saldo;
        setResData("total_saldo");
      } else if (endPoint === "transaksi") {
        endPoint = URLAPI.transaksi;
        setResData("total_transaksi");
      }

      const response = await axiosJWT.post(
        `${endPoint}`,
        {
          dateStart: valueForm.period_start,
          dateEnd: valueForm.period_end,
        },
        configAxios
      );

      if (response) {
        setResultCount(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitDate = async (e) => {
    try {
      e.preventDefault();

      endPoint = valueForm.nama;

      if (endPoint === "nasabah") {
        endPoint = URLAPI.nasabah;
        setResData("total_nasabah");
      } else if (endPoint === "saldo") {
        endPoint = URLAPI.saldo;
        setResData("total_saldo");
      } else if (endPoint === "transaksi") {
        endPoint = URLAPI.transaksi;
        setResData("total_transaksi");
      }

      const response = await axiosJWT.post(
        `${endPoint}`,
        {
          dateStart: e.target.periodStart.value,
          dateEnd: e.target.periodEnd.value,
        },
        configAxios
      );

      if (response) {
        setResultCount(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { submitDate, resultCount, resData };
};
