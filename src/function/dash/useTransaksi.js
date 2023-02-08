import { useState, useEffect } from "react";

export const useGetIdTransaksi = (axiosJWT, configAxios) => {
  const [idTransaksiData, setIdTransaksiData] = useState("");

  useEffect(() => {
    getIdTransaksi();
  }, []);

  const getIdTransaksi = async () => {
    const response = await axiosJWT.get("/transaksi/newid", configAxios);

    if (response) {
      setIdTransaksiData(response.data);
    }
  };

  return { idTransaksiData };
};
