import { useState, useEffect } from "react";
import { useGetNasabahById } from "../../../../../function/dash/useNasabah";
import { useCurrentTeller } from "../../../../../function/dash/useTeller";
import { useGetIdTransaksi } from "../../../../../function/dash/useTransaksi";
import { DateToday } from "../../../../../function/DateToday";
import { Pembilang } from "../../../../../function/Terbilang";
import { ToRupiah } from "../../../../../function/ToRupiah";

export const useValueForm = (axiosJWT, configAxios) => {
  const { dateToday } = DateToday();
  const { idTransaksiData } = useGetIdTransaksi(axiosJWT, configAxios);
  const { currentTeller } = useCurrentTeller();

  const [idTransaksi, setIdTransaksi] = useState("");
  const [norek, setNorek] = useState("");
  const [teller, setTeller] = useState();
  const [jumlahUang, setJumlahUang] = useState("");
  const [jmlUang, setJmlUang] = useState("");
  const [tglTransaksi, setTglTransaksi] = useState(dateToday);

  useEffect(() => {
    setIdTransaksi(idTransaksiData);
  }, [idTransaksiData]);

  useEffect(() => {
    setTeller(currentTeller);
  }, [currentTeller]);

  useEffect(() => {
    if (jumlahUang && typeof jumlahUang !== "number") {
      let splitJumlahUang = jumlahUang;
      splitJumlahUang = splitJumlahUang.replace(/\D+/g, "");
      splitJumlahUang = parseInt(splitJumlahUang);

      setJumlahUang(splitJumlahUang);
    }
  }, [jumlahUang]);

  const { formatRupiah, rupiah } = ToRupiah();

  return {
    rupiah,
    formatRupiah,
    idTransaksi,
    setIdTransaksi,
    norek,
    setNorek,
    teller,
    setTeller,
    jumlahUang,
    setJumlahUang,
    tglTransaksi,
    jmlUang,
    setJmlUang,
  };
};

export const useTRNewForm = (
  axiosJWT,
  configAxios,
  aksi,
  idTransaksi,
  norek,
  teller,
  jumlahUang,
  tglTransaksi
) => {
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [terbilang, setTerbilang] = useState("");

  let tipeTransaksi;

  if (aksi === "Penarikan") {
    tipeTransaksi = "penarikan";
  } else if (aksi === "Setoran") {
    tipeTransaksi = "setoran";
  }

  const submitTransaksi = async (e) => {
    try {
      e.preventDefault();

      const valueForm = {
        idTransaksi: idTransaksi,
        norek: norek,
        teller: teller,
        jumlah: jumlahUang,
        tglTransaksi: tglTransaksi,
        type: tipeTransaksi,
      };

      let counter = 0;

      if (nama.length === 0) {
        setMsg("please enter valid norek");
        counter = 1;
        return;
      }

      for (let i in valueForm) {
        if (valueForm[i].length === 0) {
          setMsg(i + " is empty");
          counter = 1;
          return;
        }
      }

      if (counter === 0) {
        console.log(valueForm);
        const response = await axiosJWT.post(
          "/transaksi/add",
          valueForm,
          configAxios
        );

        if (response) {
          setIsSuccess(true);
        }
      }
    } catch (error) {
      // console.log(error);
      setMsg(error.response.data.msg);
    }
  };

  const { dataNasabah } = useGetNasabahById(axiosJWT, configAxios, norek);

  useEffect(() => {
    if (norek.length == 11 && dataNasabah) {
      assignNasabah();
    }
  }, [norek, dataNasabah]);

  const assignNasabah = async () => {
    console.log("masuk sini");

    setNama(dataNasabah.nama_lengkap);
    setKelas(dataNasabah.kelas);
    setJurusan(dataNasabah.nama_jurusan);
  };

  useEffect(() => {
    getTerbilang();
  }, [jumlahUang]);

  const getTerbilang = () => {
    let hasilTerbilang = Pembilang(jumlahUang);
    hasilTerbilang = hasilTerbilang.replace(/\s\s+/g, " ").trim();

    if (hasilTerbilang.length > 0) {
      setTerbilang(hasilTerbilang + " Rupiah");
    }
  };

  return {
    submitTransaksi,
    isSuccess,
    idTransaksi,
    tglTransaksi,
    kelas,
    setKelas,
    nama,
    setNama,
    jurusan,
    setJurusan,
    tipeTransaksi,
    terbilang,
    setTerbilang,
    msg,
    setMsg,
  };
};
