import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useRPForm } from "../function/useRP";

function RPFormRED(props) {
  const { previewForm, valueForm } = useRPForm("RekapEndOfDay");

  return (
    <>
      <Col xs={10} lg={10} md={10}>
        <Form className="mb-2 justify-content-center">
          <Row className="justify-content-center">
            <Col xs={10} md={10} lg={10}>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Row className="justify-content-center">
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Period Date</Form.Label>
                  </Col>
                  <Col xs={6} md={6} lg={6}>
                    <Form.Control
                      type="Date"
                      onChange={(e) => {
                        valueForm.dateStart = e.target.value;
                        valueForm.dateEnd = e.target.value;
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Row className="justify-content-center">
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Report Type</Form.Label>
                  </Col>
                  <Col xs={6} md={6} lg={6}>
                    <Form.Control
                      type="text"
                      value="Rekap End of Day"
                      readonly
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Row className="justify-content-center">
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Show Type</Form.Label>
                  </Col>
                  <Col xs={6} md={6} lg={6}>
                    <Form.Control
                      as="select"
                      onChange={(e) => (valueForm.showType = e.target.value)}
                    >
                      <option value="preview">Preview</option>
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <div className="text-center" onClick={(e) => previewForm()}>
                <Button>Show Data</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Col>
    </>
  );
}

export default RPFormRED;
