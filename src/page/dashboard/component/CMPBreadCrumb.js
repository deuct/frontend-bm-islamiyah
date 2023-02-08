import React from "react";
import "./style/CMPBreadCrumb.css";
import { BsChevronDoubleRight, BsChevronRight } from "react-icons/bs";

function CMPBreadCrumb(props) {
  const breadCrumbData = props.breadCrumbData;

  return (
    <>
      <div id="breadcrumb">
        {breadCrumbData.map((bc, index) => (
          <>
            {index === breadCrumbData.length - 1 ? (
              <p key={index}>{bc}</p>
            ) : (
              <p key={index}>
                {bc} <BsChevronRight size={"10px"} />
              </p>
            )}
          </>
        ))}
      </div>
    </>
  );
}

export default CMPBreadCrumb;
