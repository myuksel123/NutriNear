import "../styles.css";
import tt from "@tomtom-international/web-sdk-services";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CalculateRoute() {
  const [startLatitude, setStartLatitude] = useState("");
  const [startLongitude, setStartLongitude] = useState("");
  const [destinationLatitude, setDestinationLatitude] = useState("");
  const [destinationLongitude, setDestinationLongitude] = useState("");
  const [result, setResult] = useState({});

  const calculateRoute = () => {
    tt.services.calculateRoute({
        key: "P7KHFLYhymC5g3qmRU9q9tQ9PHAubmdS",
        locations: `${startLatitude},${startLongitude}:${destinationLatitude},${destinationLongitude}`
      })
      .go()
      .then(function (routeData) {
        console.log(routeData.toGeoJson());
        const data = routeData.toGeoJson();
        setResult(data);
      })
      .catch((err) => {
        console.log(err);
        notify();
      });
  };

  const resultList = result.features ? (
    <div className="col-xs-12 col-md-4 col" key={result.id}>
      <div className="box">
        <div className="result">
          <h4>
            Distance in KM {result.features[0].properties.summary.lengthInMeters / 1000}
          </h4>
          <h4>
            Time Estimate for Journey
            {` ${result.features[0].properties.summary.travelTimeInSeconds / 60} minutes`}
          </h4>
        </div>
      </div>
    </div>
  ) : (
    <h4>Add location to get route details</h4>
  );

  const notify = () => toast("Locations cannot be mapped. Check and map again");
  return (
    <div className="App">
      <ToastContainer />
      <div>
        <h3>Start Location</h3>
        <input
          className="input"
          type="text"
          placeholder="Latitude"
          value={startLatitude}
          onChange={(e) => {
            setStartLatitude(e.target.value);
          }}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Longitude"
          value={startLongitude}
          onChange={(e) => {
            setStartLongitude(e.target.value);
          }}
          required
        />
        <h3>Destination</h3>
        <input
          className="input"
          type="text"
          placeholder="Latitude"
          value={destinationLatitude}
          onChange={(e) => {
            setDestinationLatitude(e.target.value);
          }}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Longitude"
          value={destinationLongitude}
          onChange={(e) => {
            setDestinationLongitude(e.target.value);
          }}
          required
        />
      </div>

      <button
        onClick={(e) => {
          calculateRoute();
        }}
      >
        Calculate routeData
      </button>
      {resultList}
    </div>
  );
}