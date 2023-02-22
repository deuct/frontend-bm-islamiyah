import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetNasabahById } from "../../../../../function/dash/useNasabah";

export const useNBFormValue = () => {
  const [fullName, setFullName] = useState("");
  const [kelas, setKelas] = useState("");
  const [nis, setNis] = useState("");
  const [gender, setGender] = useState("");
  const [tglLahir, setTglLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [email, setEmail] = useState("");
  const [tglDaftar, setTglDaftar] = useState();
  const [ayah, setAyah] = useState("");
  const [ibu, setIbu] = useState("");
  const [pengesah, setPengesah] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [isWebUser, setIsWebUser] = useState(false);
  const [wbUserName, setWbUserName] = useState("");

  return {
    fullName,
    setFullName,
    kelas,
    setKelas,
    nis,
    setNis,
    gender,
    setGender,
    tglLahir,
    setTglLahir,
    alamat,
    setAlamat,
    noTelp,
    setNoTelp,
    email,
    setEmail,
    tglDaftar,
    setTglDaftar,
    ayah,
    setAyah,
    ibu,
    setIbu,
    pengesah,
    setPengesah,
    jurusan,
    setJurusan,
    isWebUser,
    setIsWebUser,
    wbUserName,
    setWbUserName,
  };
};

export const useNBFormAdd = (
  axiosJWT,
  configAxios,
  setTglDaftar,
  dateToday,
  noRekening,
  fullName,
  kelas,
  nis,
  gender,
  tglLahir,
  alamat,
  noTelp,
  email,
  tglDaftar,
  ayah,
  ibu,
  currentTeller,
  jurusan,
  isWebUser,
  wbUserName
) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setTglDaftar(dateToday);
  }, []);

  const valueForm = {
    noRekening: noRekening,
    namaLengkap: fullName,
    kelas: kelas,
    nis: nis,
    kodeJK: gender,
    tglLahir: tglLahir,
    alamat: alamat,
    noTelp: noTelp,
    email: email,
    tglDaftar: tglDaftar,
    ayah: ayah,
    ibu: ibu,
    pengesah: currentTeller,
    kodeJurusan: jurusan,
    isWebUser: isWebUser,
    wbUserName: wbUserName,
  };

  const submitNasabah = async (e) => {
    try {
      e.preventDefault();

      let counter = 0;

      for (let i in valueForm) {
        if (valueForm[i].length === 0) {
          if (i === "wbUserName" && valueForm[i].length === 0) {
            counter = 0;
          } else {
            setMsg(i + " is empty");
            counter = 1;
            return;
          }
        }
      }

      if (counter === 0) {
        const response = await axiosJWT.post(
          "/nasabah/add",
          valueForm,
          configAxios
        );

        if (response) {
          setIsSuccess(true);
        }
        console.log(valueForm);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { submitNasabah, isSuccess, valueForm, msg, setMsg };
};

export const useNBFormEdit = (axiosJWT, configAxios) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const [urlParams] = useSearchParams();
  const noRekening = urlParams.get("targetKey");

  const { dataNasabah } = useGetNasabahById(axiosJWT, configAxios, noRekening);

  const valueForm = {
    noRekening: noRekening,
    namaLengkap: dataNasabah.nama_lengkap,
    kelas: dataNasabah.kelas,
    nis: dataNasabah.NIS,
    kodeJK: dataNasabah.kode_jk,
    tglLahir: dataNasabah.tgl_lahir,
    alamat: dataNasabah.alamat,
    noTelp: dataNasabah.notelp,
    email: dataNasabah.email,
    tglDaftar: dataNasabah.tgl_daftar,
    ayah: dataNasabah.ayah,
    ibu: dataNasabah.ibu,
    pengesah: dataNasabah.pengesah,
    kodeJurusan: dataNasabah.kode_jurusan,
  };

  const submitNasabah = async (e) => {
    try {
      e.preventDefault();

      const response = await axiosJWT.post(
        "/nasabah/update",
        valueForm,
        configAxios
      );

      if (response) {
        setIsSuccess(true);
      }

      console.log(valueForm);
    } catch (error) {
      console.log(error);
    }
  };
  return { submitNasabah, isSuccess, valueForm };
};
