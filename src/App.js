import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import { services } from '@tomtom-international/web-sdk-services';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';
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

import "./styles.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {
  const searchApiKey = 'P7KHFLYhymC5g3qmRU9q9tQ9PHAubmdS';
  const mapElement = useRef();
  
  const [map, setMap] = useState({});
  let searchMarkersManager;

  const ttSearchBox = new SearchBox(services, {
    searchOptions: {
        key: 'P7KHFLYhymC5g3qmRU9q9tQ9PHAubmdS',
        language: 'en-GB'
    },
    labels: {
        placeholder: 'Query e.g. Berlin Airport'
    }
  });

  tt.setProductInfo('<your-product-name>', '<your-product-version>');



  useEffect(() => {
    let map = tt.map({
      key: "P7KHFLYhymC5g3qmRU9q9tQ9PHAubmdS",
      container: mapElement.current
    }
    );


  map.addControl(new tt.FullscreenControl());
  map.addControl(new tt.NavigationControl());
  map.addControl(ttSearchBox, 'top-left');
    setMap(map);
    return () => map.remove();
  }, []);

  return (
    <div className="App">
     <Container className="mapContainer">
          <Col xs="8">
            <div ref={mapElement} className="mapDiv" />
          </Col>
      </Container>
    <div id='map' class = 'map'></div>

    <Router>
    
<Routes>=
  </Routes>

  </Router>

    </div>
  );

  

}

export default App;
