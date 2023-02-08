import { useEffect, useState } from "react";

export const useSTHomeDate = (axiosJWT, configAxios) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const [dateData, setDateData] = useState([]);

  const [dateSaldoStart, setDateSaldoStart] = useState();
  const [dateSaldoEnd, setDateSaldoEnd] = useState();
  const [dateTransaksiStart, setDateTransaksiStart] = useState();
  const [dateTransaksiEnd, setDateTransaksiEnd] = useState();
  const [dateNasabahStart, setDateNasabahStart] = useState();
  const [dateNasabahEnd, setDateNasabahEnd] = useState();

  let valueForm = {
    dateSaldoStart: "",
    dateSaldoEnd: "",
    dateTransaksiStart: "",
    dateTransaksiEnd: "",
    dateNasabahStart: "",
    dateNasabahEnd: "",
  };

  useEffect(() => {
    assignDate();
  }, [dateData]);

  const assignDate = () => {
    dateData.map((date) => {
      if (date.name === "nasabah") {
        setDateNasabahStart(date.period_start);
        setDateNasabahEnd(date.period_end);
      } else if (date.name === "transaksi") {
        setDateTransaksiStart(date.period_start);
        setDateTransaksiEnd(date.period_end);
      } else if (date.name === "saldo") {
        setDateSaldoStart(date.period_start);
        setDateSaldoEnd(date.period_end);
      }
    });
  };

  useEffect(() => {
    getDateData();
  }, []);

  const getDateData = async () => {
    try {
      const response = await axiosJWT.get(
        "/setting/master-data/homedate/all",
        configAxios
      );

      if (response) {
        setDateData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitDateNasabah = async (e) => {
    e.preventDefault();

    valueForm.dateSaldoStart = dateSaldoStart;
    valueForm.dateSaldoEnd = dateSaldoEnd;
    valueForm.dateNasabahStart = dateNasabahStart;
    valueForm.dateNasabahEnd = dateNasabahEnd;
    valueForm.dateTransaksiStart = dateTransaksiStart;
    valueForm.dateTransaksiEnd = dateTransaksiEnd;

    console.log(valueForm);

    try {
      const response = await axiosJWT.post(
        "/setting/master-data/homedate/update",
        valueForm,
        configAxios
      );

      if (response) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    submitDateNasabah,
    dateNasabahStart,
    setDateNasabahStart,
    dateNasabahEnd,
    setDateNasabahEnd,
    dateSaldoStart,
    setDateSaldoStart,
    dateSaldoEnd,
    setDateSaldoEnd,
    dateTransaksiStart,
    setDateTransaksiStart,
    dateTransaksiEnd,
    setDateTransaksiEnd,
    isSuccess,
  };
};
