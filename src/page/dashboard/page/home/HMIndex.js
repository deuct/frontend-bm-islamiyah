import React from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import "./style/HMIndex.css";
import CardHome from "./component/CardHome";
import { useHMIndex } from "./function/useHMIndex";

function HMIndex(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;

  const { homeDate, formNasabah, formSaldo, formTransaksi } = useHMIndex(
    axiosJWT,
    configAxios
  );

  return (
    <>
      <Row className="my-4 justify-content-center">
        <Col xs={12} md={12} sm={12}>
          <Row className="justify-content-center">
            <Col className="home-title" xs={10} md={10} lg={10}>
              <h1>Dashboard</h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <CardHome
              cardName="Nasabah"
              valueForm={formNasabah}
              axiosJWT={axiosJWT}
              configAxios={configAxios}
            />
            <CardHome
              cardName="Saldo"
              valueForm={formSaldo}
              axiosJWT={axiosJWT}
              configAxios={configAxios}
            />
            <CardHome
              cardName="Transaksi"
              valueForm={formTransaksi}
              axiosJWT={axiosJWT}
              configAxios={configAxios}
            />
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default HMIndex;
