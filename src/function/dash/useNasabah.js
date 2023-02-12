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

  console.log(dataNasabah);

  return { dataNasabah };
};
