import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import CMPBreadCrumb from "../../component/CMPBreadCrumb";
import { useNBMyBalance } from "./function/useNBMyBalance";
import "./style/NBMyBalance.css";

function NBMyBalance(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;
  const breadCrumbData = ["Nasabah", "My Balance"];

  const { norekNasabah, saldoNasabah, lastTransaksi } = useNBMyBalance(
    configAxios,
    axiosJWT
  );

  return (
    <>
      <CMPBreadCrumb breadCrumbData={breadCrumbData} />
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={6} lg={6}>
          <div id="balance-title">
            <h1>My Balance</h1>
            <p>You can check your balance through this menu</p>
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-center mt-2">
        <Col xs={12} md={6} lg={6}>
          <div id="balance-box">
            <Form>
              <Form.Group className="mb-2">
                <Row className="justify-content-center">
                  <Col xs={12} md={4} lg={4} className="text-right">
                    <Form.Label>Nomor Rekening :</Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={6} className="text-right">
                    <Form.Control type="text" value={norekNasabah} readOnly />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-2">
                <Row className="justify-content-center">
                  <Col xs={12} md={4} lg={4} className="text-right">
                    <Form.Label>Last Transaction Date :</Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={6} className="text-right">
                    <Form.Control type="date" value={lastTransaksi} readOnly />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-2">
                <Row className="justify-content-center">
                  <Col xs={12} md={4} lg={4} className="text-right">
                    <Form.Label>Total Balance :</Form.Label>
                  </Col>
                  <Col xs={12} md={6} lg={6} className="text-right">
                    <Form.Control type="text" value={saldoNasabah} readOnly />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
            <Row className="mt-4 mb-2 justify-content-center">
              <Col xs={12} md={6} lg={6} className="text-center">
                <Link id="btn-backtohome" to="/dashboard/">
                  Back To Home
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default NBMyBalance;
