import { useState, useEffect } from "react";
import { useGetNasabahById } from "../../../../../function/dash/useNasabah";

export const useNBWebUserAdd = (configAxios, axiosJWT) => {
  const [nomorRekening, setNomorRekening] = useState([]);

  const { dataNasabah } = useGetNasabahById(
    axiosJWT,
    configAxios,
    nomorRekening
  );

  const [namaNasabah, setNamaNasabah] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (dataNasabah) {
      assignValue();
    }
  }, [dataNasabah]);

  const assignValue = () => {
    setNamaNasabah(dataNasabah.nama_lengkap);
    setKelas(dataNasabah.kelas);
    setJurusan(dataNasabah.nama_jurusan);
  };

  useEffect(() => {
    existWebUser();
  }, [nomorRekening, username]);

  const existWebUser = async () => {
    try {
      if (nomorRekening.length == 11) {
        const response = await axiosJWT.get(
          `/nasabah/webuser/one?username=${username}&norek=${nomorRekening}`,
          configAxios
        );

        if (response.data.length > 0) {
          setMsg("This nasabah already have web account");
        }
      }
    } catch (error) {
      setMsg("");
    }
  };

  const submitWebUser = async (e) => {
    try {
      e.preventDefault();

      const valueForm = {
        webUserName: username,
        noRekening: nomorRekening,
      };

      console.log(valueForm);

      if (msg.length > 0) {
        return;
      } else {
        const response = await axiosJWT.post(
          "/nasabah/webuser/add",
          valueForm,
          configAxios
        );

        if (response) {
          setIsSuccess(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    nomorRekening,
    setNomorRekening,
    namaNasabah,
    setNamaNasabah,
    kelas,
    setKelas,
    jurusan,
    setJurusan,
    username,
    setUsername,
    msg,
    setMsg,
    isSuccess,
    submitWebUser,
  };
};
