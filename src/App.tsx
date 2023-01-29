import React from 'react';

import {useState, useCallback} from 'react';
import Map from 'react-map-gl';
import {Feature, Polygon, Geometry, GeoJsonObject} from 'geojson';

import DrawControl from './draw-control';
import ControlPanel from './control-panel';
import Plat from './plat';

import './App.css';

// Set your mapbox token here
const TOKEN = 'pk.eyJ1IjoiYnJlZXZvIiwiYSI6ImNsZGM1Zmc1azA0NHgzcHFocGRlM2s1MjgifQ.YHAEkttHtv7xL4eo10_-7w'; 

function App() {
  const [features, setFeatures] = useState({});
  const [plat, setPlat] = useState({});

  const onUpdate = useCallback(e => {
    setFeatures(currFeatures => {
      const newFeatures = {...currFeatures};
      for (const f of e.features) {
          newFeatures[f.id!] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback(e => {
    setFeatures(currFeatures => {
      const newFeatures = {...currFeatures};
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        Plat Map
      </header>
      <div id='map'>
      <Map
        initialViewState={{
          longitude: -91.874,
          latitude: 42.76,
          zoom: 12
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={TOKEN}
      >
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </Map>
      <Plat features={Object.values(features)} />
      <ControlPanel polygons={Object.values(features)} />
    </div>
    </div>
  );
}

export default App;
