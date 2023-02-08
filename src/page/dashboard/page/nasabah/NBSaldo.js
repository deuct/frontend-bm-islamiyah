import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button, Table } from "react-bootstrap";
import CMPBoxData from "../../component/CMPBoxData";
import CMPBreadCrumb from "../../component/CMPBreadCrumb";

import { DataContext } from "../../../../helper/context/Context";
import { useNBSaldo } from "./function/useNBSaldo";

function NBSaldo(props) {
  const configAxios = props.configAxios;
  const axiosJWT = props.axiosJWT;
  const breadCrumbData = ["Nasabah", "Saldo Nasabah"];

  const {
    dataToSubmit,
    setDataToSubmit,
    addData,
    saldoShow,
    data,
    setData,
    dataNasabah,
    showTable,
  } = useNBSaldo(axiosJWT, configAxios);

  return (
    <>
      <CMPBreadCrumb breadCrumbData={breadCrumbData} />
      <DataContext.Provider value={{ dataToSubmit, setDataToSubmit }}>
        <Row className="my-4 justify-content-center">
          <Col xs={12} md={12} sm={12} className="nasabah-title">
            <Row>
              <Col>
                <h1>Saldo Nasabah Show</h1>
                <hr />
              </Col>
            </Row>
            <Row className="justify-content-center mt-2 mb-5">
              <Col xs={10} lg={10} md={10}>
                <Form
                  className="mb-2 justify-content-center"
                  onSubmit={addData}
                >
                  <Row className="justify-content-center">
                    <Col xs={10} md={10} lg={10}>
                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Row>
                          <Col xs={2} md={2} lg={2}>
                            <Form.Label>No. Rekening</Form.Label>
                          </Col>
                          <Col xs={6} md={6} lg={6}>
                            <Form.Control
                              type="text"
                              placeholder="Masukkan nomor rekening..."
                              value={data}
                              onChange={(e) => setData(e.target.value)}
                            />
                          </Col>
                          <Col xs={2} md={2} lg={2}>
                            <Button type="submit" variant="secondary">
                              +
                            </Button>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>

                <Row className="justify-content-center">
                  <Col xs={10} md={10} sm={10}>
                    <Row>
                      <Col xs={2} md={2} sm={2}>
                        <p>List No. Rekening</p>
                      </Col>
                      <Col xs={8} md={8} sm={8}>
                        <CMPBoxData dataToSubmit={dataToSubmit} />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <Col xs={10} md={10} lg={10}>
                    <div className="text-center mt-5">
                      <Button
                        type="submit"
                        className="btn-nsb"
                        onClick={saldoShow}
                      >
                        Show Data
                      </Button>
                    </div>
                    {showTable === true ? (
                      <Table striped bordered hover size="sm" className="mt-5">
                        <thead>
                          <tr>
                            <th>No. Rekening</th>
                            <th>Nama Nasabah</th>
                            <th>Kelas</th>
                            <th>Jurusan</th>
                            <th>Saldo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataNasabah.map((nasabah, index) => (
                            <tr key={index}>
                              <td>{nasabah.norek}</td>
                              <td>{nasabah.nama_lengkap}</td>
                              <td>{nasabah.kelas}</td>
                              <td>{nasabah.nama_jurusan}</td>
                              <td>{nasabah.saldo}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p className="text-center text-info mt-5">
                        No data selected
                      </p>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </DataContext.Provider>
    </>
  );
}

export default NBSaldo;
