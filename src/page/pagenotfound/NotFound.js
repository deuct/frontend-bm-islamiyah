import React, { useEffect } from "react";
import "./style/NotFound.css";
import { useNavigate } from "react-router-dom";
import NotFoundImg from "../../files/image/background/notfound.png";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/404");
  }, []);

  return (
    <>
      <div id="page-notfound">
        <div id="notfound-body">
          <img src={NotFoundImg} className="notfound-img" />
          <h1>404 Error</h1>
          <p>Can't find the page that are you looking for.</p>
        </div>
      </div>
    </>
  );
}

export default NotFound;
