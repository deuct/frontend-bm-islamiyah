import { useState, useEffect } from "react";

export const useValueForm = (axiosJWT, configAxios) => {
  const [norek, setNorek] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [noBaris, setNoBaris] = useState("");

  return {
    norek,
    setNorek,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    noBaris,
    setNoBaris,
  };
};

export const useBukuTabungan = (dataNasabah, startDate, endDate, noBaris) => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  const printBukuTabungan = () => {
    console.log(startDate);

    const valueForm = {
      startDate: startDate,
      endDate: endDate,
      norek: dataNasabah.norek,
      namaNasabah: dataNasabah.nama_lengkap,
      kelasNasabah: dataNasabah.kelas,
      jurusanNasabah: dataNasabah.nama_jurusan,
      nomorBaris: noBaris,
      reportType: "Buku Tabungan",
    };

    console.log(valueForm);

    let reportWindow = window.open(
      `${baseURL}/report/view/buku-tabungan/?startDate=${valueForm.startDate}&endDate=${valueForm.endDate}&reportType=${valueForm.reportType}&norek=${valueForm.norek}&namaNasabah=${valueForm.namaNasabah}&nomorBaris=${valueForm.nomorBaris}&kelas=${valueForm.kelasNasabah}&jurusan=${valueForm.jurusanNasabah}`,
      "",
      "MsgWindow"
    );
  };

  return {
    printBukuTabungan,
  };
};
