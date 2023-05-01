import React, { useState } from "react";

function TableData(props) {
  const [tableData, setTableData] = useState([]); //managing table data state

  return (
    <div>
      <h1>Table Display</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>CNIC</th>
            <th>Email</th>
            <th>Phone</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((dataItem) => (
            <tr key={dataItem.id}>
              <td>{dataItem.name}</td>
              <td>{dataItem.address}</td>
              <td>{dataItem.cnic}</td>
              <td>{dataItem.email}</td>
              <td>{dataItem.phone}</td>
              <td>{dataItem.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableData;
