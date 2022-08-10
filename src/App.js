import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt, { LngLat, LngLatBounds } from "@tomtom-international/web-sdk-maps";
import { services } from '@tomtom-international/web-sdk-services';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';
import * as React from "react";
import { useState, useEffect, useRef } from "react";

import {
  Container,
  Col
} from "reactstrap";

import "./styles.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const searchApiKey = 'P7KHFLYhymC5g3qmRU9q9tQ9PHAubmdS';
  const mapElement = useRef();
  
  const [map, setMap] = useState({});

  fetch('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=yYvXsqg0rBw2qm8s90MOKe0ZS8GoVTQubns3lqGA&query=Cheddar%20Cheese')
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log('error');
  });
 
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

    ttSearchBox.on('tomtom.searchbox.resultselected', function(response) {
      let point = response.data.result.position;
      let long = response.data.result.position?.lng;
      let lat = response.data.result.position?.lat;
      map.flyTo({center: point, zoom: 9});
  });
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
    <div id='map' className = 'map'></div>

    <Router>
    
<Routes>=
  </Routes>

  </Router>

    </div>
  );

  

}

export default App;
