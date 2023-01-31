import React from 'react';

import { GeoJSONSource } from 'react-map-gl';
import {useState, useCallback} from 'react';
import Map from 'react-map-gl';
import {Feature, Polygon, Geometry, GeoJsonObject} from 'geojson';

import DrawControl from './draw-control';
import PlatPanel from './plat-panel';

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

    const onLoad = useCallback(e => {
      setFeatures(currFeatures => {
        const newFeatures = {...currFeatures};
        console.info("onXXX called!! -->", e);
        e.target.addSource('saved-tracts', 
                      {type: "geojson", data: {
                        type: 'Feature', geometry: {
                          type: 'Polygon', coordinates:
                            [
                              [
                              [-84.09664418683968, 30.344758219152112],
                              [-84.09274120450422, 30.34531649572932],
                              [-84.09422908174795, 30.340515213101938],
                              [-84.09664418683968, 30.344758219152112]
                              ]
                            ]      
                          }
                        }
                      });
        e.target.addLayer({
            id: 'saved-tracts-shade',
            type: 'fill',
            source: 'saved-tracts', // reference the data source
            layout: {},
            paint: {
              'fill-color': '#0080ff', // blue color fill
              'fill-opacity': 0.5
            }
          });
        e.target.addLayer({id: 'saved-tracts-outline', 
                          type: 'line', 
                          source: 'saved-tracts', 
                          layout: {}, 
                          paint: {
                            'line-color': '#000',
                            'line-width': 3
                          }});

        e.target.fitBounds([
          [-84.09664418683968, 30.344758219152112],
          [-84.09274120450422, 30.34531649572932],
        ], {
          maxZoom: 14
        });
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
          longitude: -84.2779765322549,
          latitude: 30.373922250390194,
          zoom: 12
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={TOKEN}
        onLoad={onLoad}
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
      <PlatPanel polygons={Object.values(features)} />
    </div>
    </div>
  );
}

export default App;
