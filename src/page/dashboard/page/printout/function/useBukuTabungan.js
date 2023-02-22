import { useState, useEffect } from "react";

export const useValueForm = (axiosJWT, configAxios) => {
  const [norek, setNorek] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [noBaris, setNoBaris] = useState("");
  const [isNewPage, setIsNewPage] = useState(false);

  return {
    norek,
    setNorek,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    noBaris,
    setNoBaris,
    isNewPage,
    setIsNewPage,
  };
};

export const useBukuTabungan = (
  dataNasabah,
  startDate,
  endDate,
  noBaris,
  isNewPage,
  unprinted
) => {
  const printBukuTabungan = () => {
    const baseURL = process.env.REACT_APP_BASE_URL;

    const valueForm = {
      startDate: startDate,
      endDate: endDate,
      norek: dataNasabah.norek,
      namaNasabah: dataNasabah.nama_lengkap,
      kelasNasabah: dataNasabah.kelas,
      jurusanNasabah: dataNasabah.nama_jurusan,
      nomorBaris: noBaris,
      isNewPage: isNewPage,
      reportType: "Buku Tabungan",
    };

    if (isNewPage) {
      isNewPage = "checked";
    } else {
      isNewPage = "unchecked";
    }

    if (noBaris > 12) {
      alert("Nomor Baris Must be less than 12");
      return;
    }

    if (noBaris == 1 && unprinted > 12) {
      alert("Transaksi Belum Dicetak Must be less than 12");
      return;
    } else if (noBaris == 2 && unprinted > 11) {
      alert("Transaksi Belum Dicetak Must be less than 11");
      return;
    } else if (noBaris == 3 && unprinted > 10) {
      alert("Transaksi Belum Dicetak Must be less than 10");
      return;
    } else if (noBaris == 4 && unprinted > 9) {
      alert("Transaksi Belum Dicetak Must be less than 9");
      return;
    } else if (noBaris == 5 && unprinted > 8) {
      alert("Transaksi Belum Dicetak Must be less than 8");
      return;
    } else if (noBaris == 6 && unprinted > 7) {
      alert("Transaksi Belum Dicetak Must be less than 7");
      return;
    } else if (noBaris == 7 && unprinted > 6) {
      alert("Transaksi Belum Dicetak Must be less than 6");
      return;
    } else if (noBaris == 8 && unprinted > 5) {
      alert("Transaksi Belum Dicetak Must be less than 5");
      return;
    } else if (noBaris == 9 && unprinted > 4) {
      alert("Transaksi Belum Dicetak Must be less than 4");
      return;
    } else if (noBaris == 10 && unprinted > 3) {
      alert("Transaksi Belum Dicetak Must be less than 3");
      return;
    } else if (noBaris == 11 && unprinted > 2) {
      alert("Transaksi Belum Dicetak Must be less than 2");
      return;
    } else {
      let reportWindow = window.open(
        `${baseURL}/report/view/buku-tabungan/?startDate=${valueForm.startDate}&endDate=${valueForm.endDate}&reportType=${valueForm.reportType}&norek=${valueForm.norek}&namaNasabah=${valueForm.namaNasabah}&nomorBaris=${valueForm.nomorBaris}&kelas=${valueForm.kelasNasabah}&jurusan=${valueForm.jurusanNasabah}&isNewPage=${valueForm.isNewPage}`,
        "",
        "MsgWindow"
      );
    }
  };

  return {
    printBukuTabungan,
  };
};
