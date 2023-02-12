import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import FormModal from "../../../../../component/FormModal";
import { useTRNewForm, useValueForm } from "../function/useTRNewForm";

function TRFormAdd(props) {
  const configAxios = props.configAxios;
  const axiosJWT = props.axiosJWT;
  const aksi = props.aksi;

  const {
    formatRupiah,
    rupiah,
    idTransaksi,
    norek,
    setNorek,
    teller,
    jumlahUang,
    setJumlahUang,
    tglTransaksi,
    jmlUang,
    setJmlUang,
  } = useValueForm(axiosJWT, configAxios);

  const {
    submitTransaksi,
    isSuccess,
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
  } = useTRNewForm(
    axiosJWT,
    configAxios,
    aksi,
    idTransaksi,
    norek,
    teller,
    jumlahUang,
    tglTransaksi
  );

  return (
    <>
      <FormModal isSuccess={isSuccess} formName="transaksi" />
      <Col xs={11} md={11} sm={11}>
        <Form onSubmit={submitTransaksi}>
          <Row>
            <Col xs={6} md={6} lg={6}>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>ID Transaksi</Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      readOnly
                      value={idTransaksi}
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Tanggal </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="date"
                      readOnly
                      value={tglTransaksi}
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Nomor Rekening </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setNorek(e.target.value);
                        setMsg("");
                        setNama("");
                        setJurusan("");
                        setKelas("");
                      }}
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Nama Nasabah </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      defaultValue={nama}
                      readOnly
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Kelas </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      defaultValue={kelas}
                      readOnly
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Jurusan </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      defaultValue={jurusan}
                      readOnly
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col xs={6} md={6} lg={6}>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Tipe Transaksi </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control type="text" value={tipeTransaksi} readOnly />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Teller Tertugas</Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      placeholder=""
                      defaultValue={teller}
                      readOnly
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="rupiah">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Jumlah Uang</Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setJumlahUang(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        rupiah.value = formatRupiah(e.target.value, "Rp. ");
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Terbilang</Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      as="textarea"
                      onChange={(e) => setTerbilang(e.target.value)}
                      value={terbilang}
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center text-center mt-4">
            <Col xs={3} md={3} lg={3}>
              <Button className="btn-nsb" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        {msg ? <div className="text-danger text-center">{msg}</div> : ""}
        <hr />
      </Col>
    </>
  );
}

export default TRFormAdd;
