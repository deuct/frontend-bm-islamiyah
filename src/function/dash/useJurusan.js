import { useState, useEffect } from "react";

export const useAllJurusan = (axiosJWT, configAxios) => {
  const [jurusanData, setJurusanData] = useState([]);

  useEffect(() => {
    getJurusanData();
  }, []);

  const getJurusanData = async () => {
    const response = await axiosJWT.get("/jurusan/all", configAxios);

    if (response) {
      setJurusanData(response.data);
    }
  };

  return { jurusanData };
};
