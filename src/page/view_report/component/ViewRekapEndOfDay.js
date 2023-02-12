import React from "react";

function ViewRekapEndOfDay(props) {
  const reportData = props.reportData;

  let totalVal = 0;
  let totalDebet = 0;
  let totalKredit = 0;
  return (
    <>
      <table border="1px" className="report-table">
        <thead>
          <tr>
            <td>No</td>
            <td>ID Transaksi</td>
            <td>Tanggal</td>
            <td>Keterangan</td>
            <td>Debet</td>
            <td>Kredit</td>
            <td>Saldo</td>
          </tr>
        </thead>
        <tbody>
          {reportData.map((data, index) => {
            totalDebet += data.debet;
            totalKredit += data.kredit;

            let kreditConvert;
            if (data.kredit !== null) {
              kreditConvert = data.kredit.toString();
              kreditConvert = kreditConvert.replace(/[^\w\s]/gi, "");
              kreditConvert = parseInt(kreditConvert);
              kreditConvert = kreditConvert
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                .slice(0, -3);
            }
            return (
              <>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.id_transaksi}</td>
                  <td>{data.Tanggal}</td>
                  <td>{data.Keterangan}</td>
                  <td>
                    {data.debet !== null
                      ? data.debet
                          .toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                          .slice(0, -3)
                      : "-"}
                  </td>
                  <td>{data.kredit !== null ? kreditConvert : "-"}</td>
                  <td style={{ display: "none" }}>
                    {(totalVal += data.debet + data.kredit)}
                  </td>
                  <td>
                    {totalVal
                      .toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                      .slice(0, -3)}
                  </td>
                </tr>
              </>
            );
          })}
          <tr>
            <td colSpan={4} className="text-right">
              Grand Total
            </td>
            <td>
              {totalDebet
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                .slice(0, -3)}
            </td>
            <td>
              {totalKredit
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                .slice(0, -3)}
            </td>
            <td>
              {totalVal
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                .slice(0, -3)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ViewRekapEndOfDay;
