import { useEffect, useState } from "react";

export const useHMIndex = (axiosJWT, configAxios) => {
  const [homeDate, setHomeDate] = useState([]);

  useEffect(() => {
    fetchHomeDate();
  }, []);

  const fetchHomeDate = async () => {
    try {
      const response = await axiosJWT.get(
        "/setting/master-data/homedate/all",
        configAxios
      );

      if (response) {
        setHomeDate(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [formNasabah, setFormNasabah] = useState({
    nama: "",
    period_start: "",
    period_end: "",
  });

  const [formSaldo, setFormSaldo] = useState({
    nama: "",
    period_start: "",
    period_end: "",
  });

  const [formTransaksi, setFormTransaksi] = useState({
    nama: "",
    period_start: "",
    period_end: "",
  });

  useEffect(() => {
    assignDateToForm();
  }, [homeDate]);

  const assignDateToForm = () => {
    homeDate.map((data) => {
      if (data.name === "nasabah") {
        setFormNasabah({
          nama: data.name,
          period_start: data.period_start,
          period_end: data.period_end,
        });
      } else if (data.name === "saldo") {
        setFormSaldo({
          nama: data.name,
          period_start: data.period_start,
          period_end: data.period_end,
        });
      } else if (data.name === "transaksi") {
        setFormTransaksi({
          nama: data.name,
          period_start: data.period_start,
          period_end: data.period_end,
        });
      }
    });
  };

  return { homeDate, formNasabah, formSaldo, formTransaksi };
};
