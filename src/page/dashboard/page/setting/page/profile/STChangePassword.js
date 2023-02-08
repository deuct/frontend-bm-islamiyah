import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSTChangePassword } from "../../function/useSTChangePassword";
import FormModal from "../../../../../../component/FormModal";

function STChangePassword(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;
  const windowType = props.windowType;

  const { valueForm, submitPassword, message, setMessage, isSuccess } =
    useSTChangePassword(axiosJWT, configAxios, windowType);

  return (
    <>
      <FormModal isSuccess={isSuccess} />
      <Row className="justify-content-center">
        <Col xs={6} md={6} sm={12}>
          <Form onSubmit={submitPassword}>
            <Form.Group className="form-st">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => (valueForm.oldPassword = e.target.value)}
                onFocus={(e) => setMessage("")}
              />
            </Form.Group>
            <Form.Group className="form-st">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => (valueForm.password = e.target.value)}
                onFocus={(e) => setMessage("")}
              />
            </Form.Group>
            <Form.Group className="form-st">
              <Form.Label>Re-type New Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => (valueForm.secondPassword = e.target.value)}
                onFocus={(e) => setMessage("")}
              />
            </Form.Group>
            {message ? (
              <p className="text-danger text-center mt-3">{message}</p>
            ) : (
              ""
            )}
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

export default STChangePassword;
