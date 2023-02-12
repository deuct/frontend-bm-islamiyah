import React from "react";
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import {
  BsLockFill,
  BsPersonBadgeFill,
  BsCalendarWeek,
  BsFillBookmarkStarFill,
  BsStack,
} from "react-icons/bs";
import STCard from "./component/STCard";
import CMPBreadCrumb from "../../component/CMPBreadCrumb";
import { useAuthContext } from "../../../../helper/context/useAuthContext";

function STMenu() {
  const { userRole } = useAuthContext();

  const breadCrumbData = ["Setting", "Menu"];

  // const stListProfile = [
  //   { icon: <BsLockFill />, title: "Change Password", code: "CHPSWD" },
  // ];

  const stListMasterData = [
    { icon: <BsPersonBadgeFill />, title: "Teller Data", code: "TD" },
    { icon: <BsStack />, title: "Jurusan", code: "JR" },
    { icon: <BsCalendarWeek />, title: "Date of Home Summary", code: "HDS" },
  ];

  const stListSystem = [
    { icon: <BsFillBookmarkStarFill />, title: "Institution Logo", code: "LG" },
  ];

  return (
    <>
      <CMPBreadCrumb breadCrumbData={breadCrumbData} />
      <Row className="justify-content-center">
        <Col xs={8} md={8} sm={12}>
          <div id="setting-page">
            <h1>Setting Page</h1>
            <p>Here you can setting all you need in this application.</p>
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-center my-3" id="setting-page-body">
        <Col xs={10} md={10} sm={12}>
          <Tabs
            defaultActiveKey="master-data"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            {/* <Tab eventKey="profile" title="Profile">
              {stListProfile.map((setting) => (
                <STCard
                  icon={setting.icon}
                  title={setting.title}
                  code={setting.code}
                />
              ))}
            </Tab> */}
            <Tab eventKey="master-data" title="Master Data">
              {stListMasterData.map((setting) => (
                <STCard
                  icon={setting.icon}
                  title={setting.title}
                  code={setting.code}
                />
              ))}
            </Tab>
            <Tab eventKey="system-setting" title="System Setting">
              {stListSystem.map((setting) => (
                <STCard
                  icon={setting.icon}
                  title={setting.title}
                  code={setting.code}
                />
              ))}
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default STMenu;
