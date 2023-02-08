import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { Pembilang } from "../function/TRTerbilang";
import { DateToday } from "../function/TRDateToday";

import FormModal from "../../../../../component/FormModal";

function TRFormEdit(props) {
  const configAxios = props.configAxios;
  const axiosJWT = props.axiosJWT;

  const [isSuccess, setIsSuccess] = useState(false);

  // Form
  const dateToday = DateToday();

  const tglTransaksi = dateToday;
  const tipeTransaksi = "penarikan";

  const [idTransaksi, setIdTransaksi] = useState("");
  const [norek, setNorek] = useState("");
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [teller, setTeller] = useState("");
  const [jumlahUang, setJumlahUang] = useState("");
  const [terbilang, setTerbilang] = useState("");

  const submitPenarikan = async (e) => {
    try {
      e.preventDefault();

      const valueForm = {
        idTransaksi: idTransaksi,
        norek: norek,
        teller: teller,
        jumlah: jumlahUang,
        terbilang: terbilang,
        transactionDate: tglTransaksi,
        type: tipeTransaksi,
      };

      const response = await axiosJWT.post(
        "/transaksi/add",
        valueForm,
        configAxios
      );

      if (response) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get one nasabah
  useEffect(() => {
    oneNasabah();
  }, [norek]);

  const oneNasabah = async () => {
    try {
      const response = await axiosJWT.get(`/nasabah/one/${norek}`, configAxios);

      if (response) {
        setNama(response.data[0].full_name);
        setKelas(response.data[0].kelas);
        setJurusan(response.data[0].jurusan);
      }
    } catch (error) {
      setNama("");
      setKelas("");
      setJurusan("");
    }
  };

  // Terbilang
  useEffect(() => {
    getTerbilang();
  }, [jumlahUang]);

  const getTerbilang = () => {
    let hasilTerbilang = Pembilang(jumlahUang);
    hasilTerbilang = hasilTerbilang.replace(/\s\s+/g, " ").trim();

    setTerbilang(hasilTerbilang + " Rupiah");
  };

  // Teller, Id Transaksi
  const [tellerData, setTellerData] = useState([]);

  useEffect(() => {
    getTellerIdTransaksi();
  }, []);

  const getTellerIdTransaksi = async () => {
    try {
      const responseIdTransaksi = await axiosJWT.get(
        "/transaksi/newid",
        configAxios
      );

      const responseTeller = await axiosJWT.get("/teller/all", configAxios);

      if (responseTeller) {
        setTellerData(responseTeller.data);
        setTeller(responseTeller.data[0].id);
      }

      if (responseIdTransaksi) {
        setIdTransaksi(responseIdTransaksi.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormModal isSuccess={isSuccess} formName="penarikan" />
      <Col xs={11} md={11} sm={11}>
        <Form onSubmit={submitPenarikan}>
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
                      onBlur={(e) => setNorek(e.target.value)}
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
                      as="select"
                      placeholder=""
                      defaultValue={teller}
                      onChange={(e) => setTeller(e.target.value)}
                    >
                      {tellerData.map((teller) => {
                        return (
                          <option key={teller.id} value={teller.id}>
                            {teller.full_name}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Jumlah Penarikan</Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      onBlur={(e) => setJumlahUang(e.target.value)}
                      placeholder=""
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
        <hr />
      </Col>
    </>
  );
}

export default TRFormEdit;
