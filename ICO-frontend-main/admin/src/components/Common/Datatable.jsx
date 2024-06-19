import React from "react";
import LinkButton from "../../LinkButton";
//import { LayoutContext } from "./../../StateProvider";
import './style.css'
import {displayDate} from "../../helper/Common";
import Button from '@mui/material/Button';

const Action = ({ row, onDelete,text }) => {
  return (
    <td>
      {row.invitationAccepted ? (
        <span className="d-flex justify-content-center">
          <LinkButton
            className="view-btn"
            path="M4 4C4 1.79 5.79 0 8 0C10.21 0 12 1.79 12 4C12 6.21 10.21 8 8 8C5.79 8 4 6.21 4 4ZM7.14 15.75L6.85 15L7.14 14.25C7.84 12.5 9.08 11.14 10.61 10.22C9.79 10.08 8.92 10 8 10C3.58 10 0 11.79 0 14V16H7.27C7.23 15.91 7.18 15.83 7.14 15.75ZM15 14C14.44 14 14 14.44 14 15C14 15.56 14.44 16 15 16C15.56 16 16 15.56 16 15C16 14.44 15.56 14 15 14ZM21 15C20.06 17.34 17.73 19 15 19C12.27 19 9.94 17.34 9 15C9.94 12.66 12.27 11 15 11C17.73 11 20.06 12.66 21 15ZM17.5 15C17.5 13.62 16.38 12.5 15 12.5C13.62 12.5 12.5 13.62 12.5 15C12.5 16.38 13.62 17.5 15 17.5C16.38 17.5 17.5 16.38 17.5 15Z"
            viewBox="0 0 21 19"
            text="View"
            onClick={() => localStorage.setItem("id", row.id)}
            href={`/client/profile/${row.id}`}
            style={{ backgroundColor: "#37833B", color: "#fff" }}
            fillColor="#fff"
            width="21"
            height="19"
          />
        </span>
      ) :
          <Button variant="outlined" color="error"
          className="view-btn"
          onClick={() => onDelete(row.id,row)}
          >
          {text}
        </Button>
    }
    </td>
  );
};

const Datatable = ({ dataList, columns, props, noDataFound, onDelete }) => {
  //const { layout } = useContext(LayoutContext);
 
  return (
    <>
          <table className="MuiTable-root css-1lmmyfq">
            <thead className="MuiTableHead-root css-1wbz3t9">
              <tr className="MuiTableRow-root MuiTableRow-head css-ejjo">
                {columns.map((item, key) => {
                  return (
                    <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeMedium css-1x4r2xb" scope="col" key={key} >
                      {item.text}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="MuiTableBody-root css-1xnox0e">
              {(dataList && dataList.length > 0) ? dataList.map( (row, key) => {
                return (
                  <tr key={key} className="MuiTableRow-root MuiTableRow-hover css-e42jjo">
                    {columns.map((col, k) => {
                      if (col.type === "action" ) {
                         if(row.white_list_status.length && row.white_list_status.length > 0 && row.white_list_status === 'pending'){
                            return (
                              <Action  onDelete={onDelete} text={col.buttonText} row={row} key={k} props={props} />
                            );
                         }else if(row.white_list_status.length && row.white_list_status.length > 0 && row.white_list_status !== 'pending'){
                            return (
                              <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-twgc6a" key={k}></td>
                            );
                       }else {
                        return ( <Action  onDelete={onDelete} text={col.buttonText} row={row} key={k} props={props} /> );
                        }
                       
                      } else if(col.type === "date"){
                        return ( <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-twgc6a" key={k}>
                                  {row[col.dataField] != undefined ?  displayDate(row[col.dataField])  : ""}
                              </td>
                            )
                      } else
                        return (
                          <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-twgc6a" key={k}>
                              {row[col.dataField] !== undefined
                                ? row[col.dataField]
                                : ""}
                          </td>
                        );
                    })}
                  </tr>
                );
              }) : null
              }
            </tbody>

          </table>
          { dataList && !dataList.length > 0 &&
            <div className="no-data-found" >
              <h5>{noDataFound}</h5>
            </div>
          }
    </>
  );
};



export default Datatable
