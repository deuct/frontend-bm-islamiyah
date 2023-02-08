import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import CMPBreadCrumb from "../../component/CMPBreadCrumb";

import STChangePassword from "./page/profile/STChangePassword";
import STTeller from "./page/masterdata/STTeller";
import STHomeDate from "./page/masterdata/STHomeDate";
import STLogo from "./page/system/STLogo";
import { useAuthContext } from "../../../../helper/context/useAuthContext";

import { useNavigate } from "react-router-dom";
import NFPageNotFound from "../notfound/NFPageNotFound";

function STPage(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;

  const { userRole } = useAuthContext();
  const navigate = useNavigate();

  const [urlParams] = useSearchParams();
  const urlCode = urlParams.get("code");

  const [breadCrumbData, setBreadCrumbData] = useState();
  const [titleSetting, setTitleSetting] = useState();
  const [subTitle, setSubTitle] = useState();

  useEffect(() => {
    check();
  }, [urlCode]);

  const check = () => {
    if (urlCode === "CHPSWD") {
      setBreadCrumbData(["Setting", "Menu", "Profile", "Change Password"]);
      setTitleSetting("Change Password");
      setSubTitle("Change your password");
    } else if (urlCode === "TD" && userRole === "admin") {
      setBreadCrumbData(["Setting", "Menu", "Master Data", "Teller Data"]);
      setTitleSetting("Teller Data");
      setSubTitle("Manage your teller data");
    } else if (urlCode === "HDS" && userRole === "admin") {
      setBreadCrumbData([
        "Setting",
        "Menu",
        "Master Data",
        "Home Date Summary",
      ]);
      setTitleSetting("Home Date Summary");
      setSubTitle("Set your default summary date");
    } else if (urlCode === "LG" && userRole === "admin") {
      setBreadCrumbData(["Setting", "Menu", "System Setting", "Company Logo"]);
      setTitleSetting("Setting Company Logo");
      setSubTitle("Change your current company logo");
    }
  };

  return (
    <>
      {breadCrumbData ? (
        <CMPBreadCrumb breadCrumbData={breadCrumbData} />
      ) : (
        <p>Empty</p>
      )}
      <Row className="justify-content-center">
        <Col xs={8} md={8} sm={12}>
          <div id="setting-page">
            {titleSetting ? <h1>{titleSetting}</h1> : <p>Empty</p>}
            {subTitle ? <p>{subTitle}</p> : <p>Empty</p>}
          </div>
        </Col>
      </Row>
      <hr />

      {urlCode === "CHPSWD" ? (
        <STChangePassword configAxios={configAxios} axiosJWT={axiosJWT} />
      ) : urlCode === "TD" && userRole === "admin" ? (
        <STTeller configAxios={configAxios} axiosJWT={axiosJWT} />
      ) : urlCode === "HDS" && userRole === "admin" ? (
        <STHomeDate configAxios={configAxios} axiosJWT={axiosJWT} />
      ) : urlCode === "LG" && userRole === "admin" ? (
        <STLogo configAxios={configAxios} axiosJWT={axiosJWT} />
      ) : (
        navigate("/dashboard/404-st")
      )}

      <Row className="justify-content-center mt-5">
        <Col xs={10} md={10} sm={12} className="text-center">
          <Link variant="info" to={"/dashboard/setting/menu"}>
            Back to Setting Menu
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default STPage;
