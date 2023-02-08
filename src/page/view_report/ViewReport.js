import React, { useRef, useEffect } from "react";
import "./style/ViewReport.css";
import {
  BsFillFileEarmarkExcelFill,
  BsFillFileEarmarkPdfFill,
} from "react-icons/bs";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useViewReport } from "./function/useViewReport";
import ViewJournal from "./component/ViewJournal";
import ViewRekapEndOfDay from "./component/ViewRekapEndOfDay";

function ViewReport(props) {
  const axiosInstance = props.axiosInstance;
  const configAxios = props.configAxios;

  const { params, tableRef, generatePDF, valueForm, reportData } =
    useViewReport(axiosInstance, configAxios);

  return (
    <>
      {params ? (
        <div id="report-content">
          <div id="rc-title">
            <h3>{valueForm.reportType} Report</h3>
            <div id="btn-action-group">
              <DownloadTableExcel
                filename="Report Table"
                sheet="Report"
                currentTableRef={tableRef.current}
              >
                <button className="btn-action" id="btn-excel">
                  <BsFillFileEarmarkExcelFill />
                </button>
              </DownloadTableExcel>
              <button
                className="btn-action"
                type="button"
                onClick={generatePDF}
              >
                <BsFillFileEarmarkPdfFill />
              </button>
            </div>
          </div>

          <div ref={tableRef} id="xls-tab">
            <div className="xls-title">
              <h1>{valueForm.reportType} Report</h1>
              <table className="rt-table">
                <tbody>
                  <tr>
                    <td>This report is printed by </td>
                    <td>&nbsp; : &nbsp;</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td>Start Date</td>
                    <td>&nbsp; : &nbsp;</td>
                    <td>{valueForm.dateStart}</td>
                  </tr>
                  <tr>
                    <td>End Date</td>
                    <td>&nbsp; : &nbsp;</td>
                    <td>{valueForm.dateEnd}</td>
                  </tr>
                </tbody>
              </table>
              <div>&nbsp;</div>
            </div>
            {valueForm.reportType === "Journal" ? (
              <ViewJournal reportData={reportData} />
            ) : (
              <ViewRekapEndOfDay reportData={reportData} />
            )}
          </div>
          <div id="report-footer">
            <table className="rt-table">
              <tbody>
                <tr>
                  <td>This report is printed by </td>
                  <td>&nbsp; : &nbsp;</td>
                  <td>Admin</td>
                </tr>
                <tr>
                  <td>Start Date</td>
                  <td>&nbsp; : &nbsp;</td>
                  <td>{valueForm.dateStart}</td>
                </tr>
                <tr>
                  <td>End Date</td>
                  <td>&nbsp; : &nbsp;</td>
                  <td>{valueForm.dateEnd}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default ViewReport;
