import xlsx from "xlsx";
import React, { useState } from "react";

function Home() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const sheet = xlsx.read(bufferArray, { type: "buffer" });
        const sheetName = sheet.SheetNames[0];
        const sheedData = sheet.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheedData);

        resolve(data);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
    promise.then((d) => {
      console.log(d);
      setItems(d);
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];

          readExcel(file);
        }}
      />
      <table class="table container">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">DOB</th>
            <th scope="col">City</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.DOB}>
              <th>{item.Name}</th>
              <td>{item.DOB}</td>
              <td>{item.City}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
