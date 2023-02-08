import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormModal from "../../../../../../component/FormModal";
import { useSTLogo } from "../../function/useSTLogo";

function STLogo(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;

  const baseURL = process.env.REACT_APP_API_URL;

  const { logo, submitImage, handleImageChange, isSuccess } = useSTLogo(
    axiosJWT,
    configAxios
  );

  return (
    <>
      <FormModal
        action="Save"
        formName="Instituion Logo"
        isSuccess={isSuccess}
      />
      <Row className="justify-content-center">
        <Col xs={6} md={6} sm={12}>
          <div id="logo-setting">
            <h3>Current Logo</h3>
            <div className="logo-box">
              {logo ? (
                <img
                  src={`${baseURL}${logo.path}`}
                  alt="old-logo"
                  className="logo-setting-img"
                />
              ) : (
                "loading..."
              )}
            </div>
          </div>
          <Form>
            <Form.Group className="form-st">
              <Form.Label>Upload Logo</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
            <div className="btn-save-setting">
              <Button variant="info" onClick={submitImage}>
                Save Change
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default STLogo;
