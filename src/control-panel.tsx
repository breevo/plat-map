import * as React from 'react';
import area from '@turf/area';
import mapboxgl from 'mapbox-gl';
import {MapboxGeoJSONFeature} from 'mapbox-gl';
import {Feature, Polygon, Geometry, GeoJsonObject} from 'geojson';

import './control-panel.css';

function areaInAcres(polygon: Feature<Polygon>) {
  return metersSquareToAcres(Math.round(area(polygon) * 100) / 100);
}

function metersSquareToAcres(area: any) {
  return area * 0.0002471054;
}

function ControlPanel(props: { polygons: Feature<Polygon>[]; }) {
  let polygonArea = 0;
  let polygons: Feature<Polygon>[] = props.polygons;
  
  console.info("Polygons: ", props.polygons);

  for (const polygon of props.polygons) {
    polygonArea += area(polygon);
  }

  function printCoordinates(polygons: Feature<Polygon>[]) {
    if (!polygons) {
      return "No Tracts Defined Yet"      
    }
    return polygons.map(poly => {
      let items = poly.geometry.coordinates.map(coord => {
        return coord.map((point, index) => 
          <li key={index}>{point[0]}, {point[1]}</li>
        )
      })
      return <div>{areaInAcres(poly)}<ul>{items}</ul></div>
    })
  }

  return (
    <div className="control-panel">
      <h3>Tracts</h3>
      {polygonArea > 0 && (
        <p>
          Total area: {metersSquareToAcres(polygonArea)} &nbsp;
          acres
        </p>
      )}
      {polygons && (
      <div className="polygons">
        {printCoordinates(polygons)}
      </div>

      )}
    </div>
  );
}

export default React.memo(ControlPanel);
