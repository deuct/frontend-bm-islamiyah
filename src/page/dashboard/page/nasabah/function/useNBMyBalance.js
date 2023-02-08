import { useEffect, useState } from "react";

export const useNBMyBalance = (configAxios, axiosJWT) => {
  const [norekNasabah, setNorekNasabah] = useState([]);

  useEffect(() => {
    getNorek();
  }, []);

  const getNorek = async () => {
    try {
      const response = await axiosJWT.get("/user/one", configAxios);

      if (response) {
        setNorekNasabah([response.data[0].norek]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [saldoNasabah, setSaldoNasabah] = useState("");

  useEffect(() => {
    getSaldo();
  }, [norekNasabah]);

  const getSaldo = async () => {
    try {
      const response = await axiosJWT.post(
        "/nasabah/saldo",
        { norek: norekNasabah },
        configAxios
      );

      if (response) {
        setSaldoNasabah(response.data[0].saldo);
        console.log(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [lastTransaksi, setLastTransaksi] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(2);

  useEffect(() => {
    getLastTransaksi();
  }, [saldoNasabah]);

  const getLastTransaksi = async () => {
    try {
      const response = await axiosJWT.get(
        `/transaksi/listing?page=${page}&;limit=${limit}`,
        configAxios
      );

      if (response) {
        setLastTransaksi(response.data.result[0].tgl_transaksi);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { norekNasabah, saldoNasabah, lastTransaksi };
};
