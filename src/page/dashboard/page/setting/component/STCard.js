import React from "react";
import { Link } from "react-router-dom";
import "../style/STCard.css";

function STCard(props) {
  return (
    <>
      <Link to={`/dashboard/setting/page?code=${props.code}`}>
        <div className="setting-card">
          <div className="sc-icon">{props.icon}</div>
          <h2>{props.title}</h2>
        </div>
      </Link>
    </>
  );
}

export default STCard;
