import React, { useState, useEffect } from "react";
import {
  Button,
  Nav,
  Container,
  Form,
  Navbar,
  NavDropdown,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsFillHouseFill,
  BsFillPeopleFill,
  BsCashCoin,
  BsFillFileEarmarkFill,
  BsFillPrinterFill,
  BsPersonCircle,
  BsArrowLeftSquareFill,
  BsGearFill,
  BsSearch,
  BsFillPersonFill,
} from "react-icons/bs";
import "./style/CMPNavbar.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../helper/context/useAuthContext";

var searchMenu = require("../../../helper/search-menu.json");
var listMenu = require("../../../helper/list-menu.json");

function CMPNavbar(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;
  const baseURL = process.env.REACT_APP_API_URL;

  const { userRole } = useAuthContext();

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [searchLink, setSearchLink] = useState("");

  const searchChange = (e) => {
    setSearchValue(e.target.value);
    setSearchLink("");
  };

  const onSearch = (search, link) => {
    setSearchValue(search);
    setSearchLink(link);
  };

  const searchAction = (e) => {
    e.preventDefault();

    if (searchLink) {
      navigate(searchLink);
    }
  };

  const [logo, setLogo] = useState([]);

  useEffect(() => {
    getLogo();
  }, []);

  const getLogo = async () => {
    try {
      const response = await axiosJWT.get("/setting/system/logo", configAxios);

      if (response) {
        setLogo(response.data[0]);
      }
    } catch (error) {
      console.log("Error logo");
      console.log(error);
    }
  };

  const [userLoginName, setUserLoginName] = useState("");

  useEffect(() => {
    setUserLoginName(props.name);
  }, [props.name]);

  useEffect(() => {
    arrangeName();
  }, [userLoginName]);

  const arrangeName = () => {
    if (userLoginName.length > 9) {
      setUserLoginName(userLoginName.slice(0, 6) + "...");
    } else {
      setUserLoginName(userLoginName);
    }
  };

  const iconMenu = [
    { root_name: "Nasabah", icon: <BsFillPeopleFill /> },
    { root_name: "Transaksi", icon: <BsCashCoin /> },
    { root_name: "Report", icon: <BsFillFileEarmarkFill /> },
    { root_name: "Print Out", icon: <BsFillPrinterFill /> },
  ];

  const [listMenuMapping, setListMenuMapping] = useState([]);
  const [listMenuSearch, setListMenuSearch] = useState([]);

  useEffect(() => {
    generateMenu();
  }, [userRole]);

  const generateMenu = () => {
    if (userRole === "admin") {
      setListMenuMapping(listMenu.admin);
      setListMenuSearch(searchMenu.admin);
    } else if (userRole === "teller") {
      setListMenuMapping(listMenu.teller);
      setListMenuSearch(searchMenu.teller);
    } else if (userRole === "nasabah") {
      setListMenuMapping(listMenu.nasabah);
      setListMenuSearch(searchMenu.nasabah);
    }
  };

  return (
    <>
      <Navbar variant="light" id="first-navbar">
        <Container className="container-top">
          <Navbar.Brand href="#home" className="d-flex">
            {logo ? (
              <img
                src={`${baseURL}${logo.path}`}
                height="40px"
                alt="company-logo"
              />
            ) : (
              "..."
            )}
            <div id="brand-title">
              <h6 className="brandtitle">Bank Mini</h6>
              <h6 className="brandtitle">SMK Islamiyah Ciputat</h6>
            </div>
          </Navbar.Brand>

          <Nav className="me-auto align-items-center">
            <Form onSubmit={searchAction} className="mr-3">
              <InputGroup className="mr-3" size="sm">
                <Form.Control
                  placeholder="Search menu.."
                  aria-label="Search menu.."
                  aria-describedby="basic-addon2"
                  className="search-navbar"
                  type="text"
                  value={searchValue}
                  onChange={searchChange}
                />
                <Button
                  className="search-navbar-btn"
                  id="button-addon2"
                  size="sm"
                  type="submit"
                >
                  <BsSearch />
                </Button>

                <div id="search-result">
                  {listMenuSearch
                    .filter((item) => {
                      const search = searchValue.toLowerCase();
                      const menuName = item.menu_name.toLowerCase();

                      return (
                        search &&
                        menuName.includes(search) &&
                        menuName !== search
                      );
                    })
                    .slice(0, 5)
                    .map((item, index) => (
                      <div
                        className="searchresult-row"
                        key={index}
                        onClick={() => onSearch(item.menu_name, item.link)}
                      >
                        {item.menu_name}
                      </div>
                    ))}
                </div>
              </InputGroup>
            </Form>

            <Dropdown align="start">
              <Dropdown.Toggle
                size="sm"
                className="profile-dropdown"
                id="dropdown-basic"
              >
                <BsPersonCircle />
                {userLoginName ? (
                  <span className="profile-name"> {userLoginName}</span>
                ) : (
                  ""
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.ItemText style={{ fontSize: ".9rem" }}>
                  Hello, {props.name}
                </Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="profiledropdown-item"
                  href="/dashboard/profile"
                >
                  <BsFillPersonFill /> Profile
                </Dropdown.Item>
                {userRole === "admin" ? (
                  <Dropdown.Item
                    className="profiledropdown-item"
                    href="/dashboard/setting/menu"
                  >
                    <BsGearFill /> Setting
                  </Dropdown.Item>
                ) : (
                  ""
                )}

                <Dropdown.Item
                  className="profiledropdown-item"
                  href="#"
                  onClick={props.Logout}
                >
                  <BsArrowLeftSquareFill /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      <Navbar style={{ background: "rgb(5, 13, 53)" }} id="second-navbar">
        <Container className="container-top">
          <Nav className="ms-auto" id="navbar-menuz">
            <Nav.Link href="/dashboard/" className="d-flex  align-items-center">
              <BsFillHouseFill className="mr-1" />
              Home
            </Nav.Link>
            {userRole.length > 0 && listMenuMapping.length > 0
              ? listMenuMapping.map((menu, index) => (
                  <NavDropdown
                    key={menu.root_name}
                    title={
                      <>
                        <div className="d-inline align-items-center">
                          {iconMenu[index].icon} {menu.root_name}
                        </div>
                      </>
                    }
                    id="navbarScrollingDropdown"
                  >
                    {menu.menu_list.map((submenu) =>
                      submenu.sub_menu ? (
                        <Dropdown key={submenu.menu_name}>
                          <Dropdown.Toggle
                            className="submenu-nav"
                            id="dropdown-basic"
                          >
                            {submenu.menu_name}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {submenu.sub_menu.map((sbm) => (
                              <Dropdown.Item
                                href={sbm.link}
                                key={sbm.menu_name}
                              >
                                {sbm.menu_name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        <NavDropdown.Item
                          href={submenu.link}
                          key={submenu.menu_name}
                        >
                          {submenu.menu_name}
                        </NavDropdown.Item>
                      )
                    )}
                  </NavDropdown>
                ))
              : ""}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default CMPNavbar;
