import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import "./style/CMPBoxData.css";

import { DataContext } from "../../../helper/context/Context";

function CMPBoxData(props) {
  const { dataToSubmit, setDataToSubmit } = useContext(DataContext);

  //   Select data
  const [dataSelected, setDataSelected] = useState([]);

  useEffect(() => {
    setDataSelected(new Array(dataToSubmit.length).fill(false));
  }, [dataToSubmit]);

  const selectData = (position) => {
    const updateDataSelected = dataSelected.map((item, index) =>
      index === position ? !item : item
    );

    setDataSelected(updateDataSelected);
  };

  //   Delete data
  const deleteData = () => {
    dataSelected.map((sel, index) => {
      if (sel === true) {
        const dataToDelete = dataToSubmit[index];

        setDataToSubmit((prev) =>
          prev.filter((x) => {
            return x !== dataToDelete;
          })
        );
      }
    });
  };

  return (
    <>
      <div id="box-data">
        <div id="boxdata-content">
          {dataToSubmit.map((data, index) => (
            <Button
              key={index}
              className="btn-boxdata"
              style={{
                backgroundColor: dataSelected[index]
                  ? "rgb(28, 126, 126)"
                  : "RGB(232, 232, 232)",
              }}
              onClick={() => selectData(index)}
            >
              {data}
            </Button>
          ))}
        </div>
        <div
          id="boxdata-del"
          className="d-flex justify-content-end align-items-center"
        >
          <p className="text-muted fs-6 mt-2">
            if you feel anything wrong please delete the data
          </p>
          <Button
            variant="danger"
            onClick={deleteData}
            className="btn-del-boxdata"
          >
            <BsTrash />
          </Button>
        </div>
      </div>
    </>
  );
}

export default CMPBoxData;
