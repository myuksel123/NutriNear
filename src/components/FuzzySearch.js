import "../styles.css";
import tt from "@tomtom-international/web-sdk-services";
import React, { useState } from "react";
import ResultBox from "./resultBox";

export default function FuzzySearch() {
  const [name, setName] = useState("");
  const [result, setResult] = useState({});

  const fuzzySearch = (name) => {
    tt.services.FuzzySearch().key("P7KHFLYhymC5g3qmRU9q9tQ9PHAubmdS")
    .query(name).go().then((res) => {
        console.log(res);
        const amendRes = res.results;
        console.log(amendRes)
        setResult(amendRes)
        console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateRoute = () => {
    tt.services
      .calculateRoute({
        key: "8h504Wc4AXL6OPndqhrtKf70AovVBL3V",
        locations: "3.13,6.8493:3.20793,6.55466"
      })
      .go()
      .then(function (routeData) {
        console.log(routeData.toGeoJson());
      })
      .catch((err) => console.log(err));
  };
  
  const resultList = result.length > 0 ? (
     result.map((resultItem) => (
    <div className="col-xs-12 col-md-4 col" key={resultItem.id}>
      <div className="box">
        <ResultBox result={resultItem} />
      </div>
    </div>
  ))
  ):( <h2>No locations</h2>);
    
  return (
    <div className="App">
      <input
        className="input"
        type="text"
        placeholder="Search Location"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            fuzzySearch(name);
          }
        }}
        required
      />
      {resultList}
    </div>
  );
}