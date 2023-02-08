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
            return (
              <>
                <tr key={data.id_transaksi}>
                  <td>{index + 1}</td>
                  <td>{data.id_transaksi}</td>
                  <td>{data.Tanggal}</td>
                  <td>{data.Keterangan}</td>
                  <td>{data.debet}</td>
                  <td>{data.kredit}</td>
                  <td>{(totalVal += data.debet + data.kredit)}</td>
                </tr>
              </>
            );
          })}
          <tr>
            <td colSpan={4} className="text-right">
              Grand Total
            </td>
            <td>{totalDebet}</td>
            <td>{totalKredit}</td>
            <td>{totalVal}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ViewRekapEndOfDay;
