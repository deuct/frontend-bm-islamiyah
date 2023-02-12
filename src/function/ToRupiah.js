export const ToRupiah = (rpNull) => {
  var rupiah = document.getElementById("rupiah");

  if (rupiah === null) {
    if (rpNull !== null) {
      rupiah = rpNull;
    } else {
      rupiah = 0;
    }
  }

  const formatRupiah = (angka, prefix) => {
    console.log("angka : ", angka);
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  };

  return { rupiah, formatRupiah };
};
