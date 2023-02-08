export const Pembilang = (nilai) => {
  nilai = Math.abs(nilai);
  var simpanNilaiBagi = 0;
  var huruf = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
  ];
  var temp = "";

  if (nilai < 12) {
    temp = " " + huruf[nilai];
  } else if (nilai < 20) {
    temp = Pembilang(nilai - 10) + " Belas";
  } else if (nilai < 100) {
    simpanNilaiBagi = Math.floor(nilai / 10);
    temp = Pembilang(simpanNilaiBagi) + " Puluh" + Pembilang(nilai % 10);
  } else if (nilai < 200) {
    temp = " Seratus" + Pembilang(nilai - 100);
  } else if (nilai < 1000) {
    simpanNilaiBagi = Math.floor(nilai / 100);
    temp = Pembilang(simpanNilaiBagi) + " Ratus" + Pembilang(nilai % 100);
  } else if (nilai < 2000) {
    temp = " Seribu" + Pembilang(nilai - 1000);
  } else if (nilai < 1000000) {
    simpanNilaiBagi = Math.floor(nilai / 1000);
    temp = Pembilang(simpanNilaiBagi) + " Ribu" + Pembilang(nilai % 1000);
  } else if (nilai < 1000000000) {
    simpanNilaiBagi = Math.floor(nilai / 1000000);
    temp = Pembilang(simpanNilaiBagi) + " Juta" + Pembilang(nilai % 1000000);
  } else if (nilai < 1000000000000) {
    simpanNilaiBagi = Math.floor(nilai / 1000000000);
    temp =
      Pembilang(simpanNilaiBagi) + " Miliar" + Pembilang(nilai % 1000000000);
  } else if (nilai < 1000000000000000) {
    simpanNilaiBagi = Math.floor(nilai / 1000000000000);
    temp =
      Pembilang(nilai / 1000000000000) +
      " Triliun" +
      Pembilang(nilai % 1000000000000);
  }

  return temp;
};
