import xlsx from "xlsx";
import React, { useState } from "react";
import Handsontable from "handsontable";
import { HotTable, HotColumn } from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";

function Home() {
  const [items, setItems] = useState([1]);
  const hotData = Handsontable.helper.createSpreadsheetData(items.length, 3);
  const itemKey = items.map((item) => {
    return Object.keys(item);
  });
  let single = itemKey[0];
  console.log(single);
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
    promise
      .then((d) => {
        console.log(d);
        setItems(d);
      })
      .catch((err) => {
        return <h1>{err}</h1>;
      });
  };

  const hotSettings = {
    data: items.map((item) => {
      return Object.values(item);
    }),
    rowHeaders: true,
    licenseKey: "non-commercial-and-evaluation",
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

      <HotTable settings={hotSettings}>
        {single.map((singleKey, index) => {
          return <HotColumn title={singleKey} key={index} />;
        })}
      </HotTable>
    </div>
  );
}

export default Home;
