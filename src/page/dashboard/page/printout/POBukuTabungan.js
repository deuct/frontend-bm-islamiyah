import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import CMPBreadCrumb from "../../component/CMPBreadCrumb";
import { DateToday } from "../../../../function/DateToday";
import { useBukuTabungan, useValueForm } from "./function/useBukuTabungan";
import { useGetNasabahById } from "../../../../function/dash/useNasabah";

function POBukuTabungan(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;

  const breadCrumbData = ["Print Out", "Buku Tabungan"];

  const {
    norek,
    setNorek,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    noBaris,
    setNoBaris,
  } = useValueForm(axiosJWT, configAxios);

  const { dataNasabah } = useGetNasabahById(axiosJWT, configAxios, norek);

  const { printBukuTabungan } = useBukuTabungan(
    dataNasabah,
    startDate,
    endDate,
    noBaris
  );

  // console.log(dataNasabah);
  return (
    <>
      <CMPBreadCrumb breadCrumbData={breadCrumbData} />
      <Row className="my-4 justify-content-center">
        <Col xs={12} md={12} sm={12} className="nasabah-title">
          <Row>
            <Col>
              <h1>Print Buku Tabungan</h1>
              <hr />
            </Col>
          </Row>
          <Row className="justify-content-center mt-2 mb-5">
            <Col xs={10} lg={10} md={10}>
              <Form className="mb-2 justify-content-center">
                <Row className="justify-content-center">
                  <Col xs={10} md={10} lg={10}>
                    <Form.Group className="mb-2">
                      <Row className="justify-content-center">
                        <Col xs={3} md={3} lg={3}>
                          <Form.Label>Print Date</Form.Label>
                        </Col>
                        <Col xs={6} md={6} lg={6} className="d-flex">
                          <Form.Control
                            type="date"
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                          <span
                            style={{
                              background: "#222",
                              width: "20px",
                              height: "1px",
                              margin: "20px 10px",
                              alignItems: "center",
                            }}
                          ></span>
                          <Form.Control
                            type="date"
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Row className="justify-content-center">
                        <Col xs={3} md={3} lg={3}>
                          <Form.Label>Nomor Rekening Nasabah</Form.Label>
                        </Col>
                        <Col xs={6} md={6} lg={6}>
                          <Form.Control
                            type="text"
                            defaultValue={norek}
                            onChange={(e) => setNorek(e.target.value)}
                            placeholder=""
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Row className="justify-content-center">
                        <Col xs={3} md={3} lg={3}>
                          <Form.Label>Nomor Baris</Form.Label>
                        </Col>
                        <Col xs={6} md={6} lg={6}>
                          <Form.Control
                            type="text"
                            onChange={(e) => setNoBaris(e.target.value)}
                            placeholder=""
                            readOnly
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Row className="justify-content-center">
                        <Col xs={3} md={3} lg={3}>
                          <Form.Label>Nama Nasabah</Form.Label>
                        </Col>
                        <Col xs={6} md={6} lg={6}>
                          <Form.Control
                            type="text"
                            defaultValue={
                              dataNasabah ? dataNasabah.nama_lengkap : "..."
                            }
                            placeholder=""
                            readOnly
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Row className="justify-content-center">
                        <Col xs={3} md={3} lg={3}>
                          <Form.Label>Kelas</Form.Label>
                        </Col>
                        <Col xs={6} md={6} lg={6}>
                          <Form.Control
                            type="text"
                            defaultValue={
                              dataNasabah ? dataNasabah.kelas : "..."
                            }
                            placeholder=""
                            readOnly
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Row className="justify-content-center">
                        <Col xs={3} md={3} lg={3}>
                          <Form.Label>Jurusan</Form.Label>
                        </Col>
                        <Col xs={6} md={6} lg={6}>
                          <Form.Control
                            type="text"
                            defaultValue={
                              dataNasabah ? dataNasabah.nama_jurusan : "..."
                            }
                            placeholder=""
                            readOnly
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Row className="justify-content-center">
                        <Col xs={3} md={3} lg={3}>
                          <Form.Label>Last Print Date</Form.Label>
                        </Col>
                        <Col xs={6} md={6} lg={6}>
                          <Form.Control
                            type="text"
                            defaultValue={""}
                            placeholder=""
                            readOnly
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Row className="justify-content-center">
                        <Col xs={3} md={3} lg={3}>
                          <Form.Label>Transaksi Belum Dicetak</Form.Label>
                        </Col>
                        <Col xs={6} md={6} lg={6}>
                          <Form.Control
                            type="text"
                            defaultValue={""}
                            placeholder=""
                            readOnly
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <div
                      className="text-center"
                      onClick={(e) => printBukuTabungan()}
                    >
                      <Button>Print Data</Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default POBukuTabungan;
