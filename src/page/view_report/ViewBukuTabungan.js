import React from "react";
import { Button } from "react-bootstrap";
import { useViewBukuTabungan } from "./function/useViewBukuTabungan";
import "./style/ViewBukuTabungan.css";

function ViewBukuTabungan(props) {
  const axiosInstance = props.axiosInstance;
  const configAxios = props.configAxios;

  const { params, generatePDF, tabunganData } = useViewBukuTabungan();

  const name = params.get("namaNasabah");
  const kelas = params.get("kelas");
  const jurusan = params.get("jurusan");

  console.log(tabunganData);

  return (
    <>
      <div className="text-center">
        <div id="title-confirmation">
          <h3>Confirmation Page</h3>
          <p>Below is your nasabah data that will be printed</p>
          <p>Please do cross check again before you print</p>
        </div>
        <table id="body-confirmation">
          <thead>
            <tr>
              <td className="text-center" colSpan={2}>
                Data Confirmation
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-right">Nama : </td>
              <td className="text-left">{name}</td>
            </tr>
            <tr>
              <td className="text-right">Kelas : </td>
              <td className="text-left">{kelas}</td>
            </tr>
            <tr>
              <td className="text-right">Jurusan : </td>
              <td className="text-left">{jurusan}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      {params ? (
        <>
          <table id="tabungan-header">
            <tbody>
              <tr className="text-center">
                <td rowSpan={2} style={{ width: "94.5px" }}>
                  Tanggal
                </td>
                <td colSpan={2} style={{ width: "151.2px" }}>
                  Mutasi
                </td>
                <td rowSpan={2} style={{ width: "75.6px" }}>
                  Saldo
                </td>
                <td rowSpan={2} style={{ width: "75.6px" }}>
                  Paraf
                </td>
              </tr>
              <tr className="text-center">
                <td style={{ width: "75.6px" }}>Debet</td>
                <td style={{ width: "75.6px" }}>Kredit</td>
              </tr>
            </tbody>
          </table>

          <table id="tabungan-contents">
            <tbody>
              {tabunganData
                ? tabunganData.map((tb) => (
                    <tr>
                      <td style={{ width: "75.6px" }}>{tb.tgl_transaksi}</td>
                      <td style={{ width: "75.6px" }}>
                        {tb.debet !== 0
                          ? tb.debet
                              .toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })
                              .slice(0, -3)
                          : "-"}
                      </td>
                      <td style={{ width: "75.6px" }}>
                        {tb.kredit !== 0
                          ? tb.kredit
                              .toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })
                              .slice(0, -3)
                          : "-"}
                      </td>
                      <td style={{ width: "75.6px" }}>
                        {tb.saldo
                          .toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                          .slice(0, -3)}
                      </td>
                    </tr>
                  ))
                : "Loading..."}
            </tbody>
          </table>

          <div className="text-center mt-5">
            <Button onClick={generatePDF} className="btn-printbukutabungan">
              Print
            </Button>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default ViewBukuTabungan;
