import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useCardHome } from "../function/useCardHome";

function CardHome(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;
  const valueForm = props.valueForm;

  const { submitDate, resultCount, resData } = useCardHome(
    axiosJWT,
    configAxios,
    valueForm
  );

  return (
    <>
      <Col className="card-home" xs={3} md={3} lg={3}>
        <div className="ch-title">
          <p>Total {props.cardName}</p>
        </div>
        <div className="ch-body">
          <Row>
            <Col>
              <Form onSubmit={submitDate}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Period From :</Form.Label>
                  <Form.Control
                    type="date"
                    name="periodStart"
                    defaultValue={valueForm.period_start}
                  />
                  <Form.Label>Period To :</Form.Label>
                  <Form.Control
                    type="date"
                    name="periodEnd"
                    defaultValue={valueForm.period_end}
                  />
                </Form.Group>
                <Button className="ch-btn-search ms-auto" type="submit">
                  Search
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="ch-body-res">
                Result:{" "}
                <span className="ch-br-val">
                  {resultCount ? resultCount[resData] : "0"}
                </span>{" "}
                {props.cardName} Tercatat
              </p>
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
}

export default CardHome;
