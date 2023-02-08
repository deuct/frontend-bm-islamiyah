import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormModal from "../../../../../../component/FormModal";
import { useSTHomeDate } from "../../function/useSTHomeDate";
import "../../style/STHomeDate.css";

function STHomeDate(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;

  const {
    submitDateNasabah,
    dateNasabahStart,
    setDateNasabahStart,
    dateNasabahEnd,
    setDateNasabahEnd,
    dateSaldoStart,
    setDateSaldoStart,
    dateSaldoEnd,
    setDateSaldoEnd,
    dateTransaksiStart,
    setDateTransaksiStart,
    dateTransaksiEnd,
    setDateTransaksiEnd,
    isSuccess,
  } = useSTHomeDate(axiosJWT, configAxios);

  return (
    <>
      <FormModal isSuccess={isSuccess} />
      <Row className="justify-content-center">
        <Col xs={6} md={6} sm={12}>
          <Form onSubmit={submitDateNasabah}>
            <Form.Group className="form-st">
              <Form.Label className="mr-2">Date Nasabah</Form.Label>
              <Form.Control
                type="date"
                defaultValue={dateNasabahStart}
                onChange={(e) => setDateNasabahStart(e.target.value)}
              />
              <span className="mx-3 date-separator"></span>
              <Form.Control
                type="date"
                defaultValue={dateNasabahEnd}
                onChange={(e) => setDateNasabahEnd(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-st">
              <Form.Label className="mr-2">Date Saldo</Form.Label>
              <Form.Control
                type="date"
                defaultValue={dateSaldoStart}
                onChange={(e) => setDateSaldoStart(e.target.value)}
              />
              <span className="mx-3 date-separator"></span>
              <Form.Control
                type="date"
                defaultValue={dateSaldoEnd}
                onChange={(e) => setDateSaldoEnd(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-st mb-2">
              <Form.Label className="mr-2">Date Transaksi</Form.Label>
              <Form.Control
                type="date"
                defaultValue={dateTransaksiStart}
                onChange={(e) => setDateTransaksiStart(e.target.value)}
              />
              <span className="mx-3 date-separator"></span>
              <Form.Control
                type="date"
                defaultValue={dateTransaksiEnd}
                onChange={(e) => setDateTransaksiEnd(e.target.value)}
              />
            </Form.Group>
            <div className="btn-save-setting">
              <Button variant="info" type="submit">
                Save Change
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default STHomeDate;
