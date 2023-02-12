import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import CMPBreadCrumb from "../../component/CMPBreadCrumb";
import "./style/PFIndex.css";
import { Link } from "react-router-dom";
import configAxios from "../../../../config/ConfigAxios";
import { usePFIndex } from "./function/usePFIndex";
import FormModal from "../../../../component/FormModal";

function PFIndex(props) {
  const breadCrumbData = ["Profile", "My Profile"];

  const name = props.name;
  const baseURL = process.env.REACT_APP_API_URL;

  const {
    photoNew,
    setPhotoNew,
    photoPath,
    profileName,
    setProfileName,
    username,
    handleImageChange,
    changePassword,
    submitProfile,
    isSuccess,
  } = usePFIndex(configAxios, name);

  console.log(baseURL + photoPath);

  return (
    <>
      <FormModal isSuccess={isSuccess} />
      <CMPBreadCrumb breadCrumbData={breadCrumbData} />
      <Row className="justify-content-center mt-2">
        <Col xs={12} md={6} lg={6}>
          <div className="profile-title">
            <h1>Profile Page</h1>
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-center mt-1">
        <Col xs={12} md={6} lg={6}>
          <Row className="mb-2">
            <Col xs={4} md={4} lg={4} className="text-right">
              <span>Current Photo : </span>
            </Col>
            <Col xs={6} md={6} lg={6}>
              <div className="profile-pict">
                {photoPath ? (
                  <img src={baseURL + photoPath} width="120px" />
                ) : (
                  "Loading..."
                )}
              </div>
            </Col>
          </Row>
          <Form onSubmit={submitProfile}>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={4} md={4} lg={4} className="text-right">
                  <Form.Label>Change Photo : </Form.Label>
                </Col>
                <Col xs={6} md={6} lg={6}>
                  <Form.Control
                    type="file"
                    onChange={handleImageChange}
                    size="sm"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={4} md={4} lg={4} className="text-right">
                  <Form.Label>Username : </Form.Label>
                </Col>
                <Col xs={6} md={6} lg={6}>
                  <Form.Control
                    type="text"
                    size="sm"
                    defaultValue={username}
                    readOnly
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={4} md={4} lg={4} className="text-right">
                  <Form.Label>Name : </Form.Label>
                </Col>
                <Col xs={6} md={6} lg={6}>
                  <Form.Control
                    type="text"
                    size="sm"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    readOnly
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={4} md={4} lg={4} className="text-right">
                  <Form.Label>Change Password : </Form.Label>
                </Col>
                <Col xs={6} md={6} lg={6}>
                  <button
                    onClick={(e) => changePassword()}
                    type="button"
                    className="cp-button"
                  >
                    Sure
                  </button>
                </Col>
              </Row>
            </Form.Group>
            <Row className="justify-content-center mt-2">
              <Col xs={12} md={6} lg={6} className="text-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="btn-profilesave"
                >
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default PFIndex;
