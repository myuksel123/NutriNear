import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

import "./styles.css";
import FuzzySearch from "./components/FuzzySearch";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CalculateRoute from "./components/CalculateRoute"


const MAX_ZOOM = 17;

function App() {
  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(-121.91599);
  const [mapLatitude, setMapLatitude] = useState(37.36765);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});
  const increaseZoom = () => {
    if (mapZoom < MAX_ZOOM) {
      setMapZoom(mapZoom + 1);
    }
  };

  const decreaseZoom = () => {
    if (mapZoom > 1) {
      setMapZoom(mapZoom - 1);
    }
  };

  const updateMap = () => {
    map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
    map.setZoom(mapZoom);
  };

  useEffect(() => {
    let map = tt.map({
      key: "P7KHFLYhymC5g3qmRU9q9tQ9PHAubmdS",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom
    });
    setMap(map);
    return () => map.remove();
  }, []);



  return (
    <div className="App">
     <Container className="mapContainer">
        <Row>
          <Col xs="3">
            <h4>Map Controls</h4>
            <FormGroup class = "mapControls">
              <Label for="longitude">Longitude</Label>
              <Input
                type="text"
                name="longitude"
                value={mapLongitude}
                onChange={(e) => setMapLongitude(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="latitude">Latitude</Label>
              <Input
                type="text"
                name="latitude"
                value={mapLatitude}
                onChange={(e) => setMapLatitude(e.target.value)}
              />
            </FormGroup>
            <Col xs="3">
              <Row>Zoom</Row>
              <Row>
                <Button outline color="primary" onClick={decreaseZoom}>
                  -
                </Button>
                <div className="mapZoomDisplay">{mapZoom}</div>
                <Button outline color="primary" onClick={increaseZoom}>
                  +
                </Button>
              </Row>
            </Col>
            <Col xs="5">
              <Row className="updateButton">
                <Button color="primary" onClick={updateMap}>
                  Update Map
                </Button>
              </Row>
            </Col>
          </Col>
          <Col xs="8">
            <div ref={mapElement} className="mapDiv" />
          </Col>
        </Row>
      </Container>


    <Router>
    <h3><Link to="/FuzzySearch.js">Search Location/Address</Link></h3>
    <h3><Link to="/calculateRoute.js" >Calculate Route Distance</Link></h3>
    
<Routes>
    <Route path='/FuzzySearch.js' element={<FuzzySearch/>} />
    <Route path='/calculateRoute.js' element={<CalculateRoute/>} />
  </Routes>

  </Router>

    </div>
  );

  

}

export default App;
