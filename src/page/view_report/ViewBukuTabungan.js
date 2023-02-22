import React from "react";
import { Button } from "react-bootstrap";
import { useViewBukuTabungan } from "./function/useViewBukuTabungan";
import "./style/ViewBukuTabungan.css";

function ViewBukuTabungan(props) {
  const { params, generatePDF, tabunganData } = useViewBukuTabungan();

  const name = params.get("namaNasabah");
  const kelas = params.get("kelas");
  const jurusan = params.get("jurusan");
  const isNewPage = params.get("isNewPage");
  let nomorBaris = parseInt(params.get("nomorBaris"));

  // if (nomorBaris !== 1) {
  //   nomorBaris -= 1;
  // }

  console.log(nomorBaris);
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
                <td rowSpan={2} style={{ width: "112px" }}>
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
            <tbody
              style={
                nomorBaris == 1
                  ? {
                      marginTop: isNewPage === "checked" ? "28px" : "66px",
                      display: "block",
                      marginLeft: "35px",
                    }
                  : {
                      marginTop:
                        isNewPage === "checked"
                          ? 20 + nomorBaris * 16 + "px"
                          : 50 + nomorBaris * 16 + "px",
                      display: "block",
                      marginLeft: "35px",
                    }
              }
            >
              {tabunganData
                ? tabunganData.map((tb, index) => (
                    <tr
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontSize: "8px",
                      }}
                      key={index}
                    >
                      <td style={{ width: "	65px" }}>{tb.tgl_transaksi}</td>
                      <td style={{ width: "70px" }}>
                        {tb.debet !== 0
                          ? tb.debet
                              .toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })
                              .slice(0, -3)
                          : "-"}
                      </td>
                      <td style={{ width: "70px" }}>
                        {tb.kredit !== 0
                          ? tb.kredit
                              .toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })
                              .slice(0, -3)
                          : "-"}
                      </td>
                      <td style={{ width: "70px" }}>
                        {tb.saldo
                          .toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                          .slice(0, -3)}
                      </td>
                      <td style={{ width: "75.6px" }}></td>
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
