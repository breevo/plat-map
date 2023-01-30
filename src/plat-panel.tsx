import * as React from 'react';
import area from '@turf/area';
import {Feature, Polygon, Geometry, GeoJsonObject} from 'geojson';
import Tract from './tract';

import './plat-panel.css';


function areaInAcres(polygon: Feature<Polygon>) {
   return metersSquareToAcres(Math.round(area(polygon) * 100) / 100);
}
  
function metersSquareToAcres(area: any) {
  return area * 0.0002471054;
}
  
function round(value: number, precision: number) : number {
    return (Math.round((10 * precision) * value)) / (10 * precision);
}

function PlatPanel(props: { polygons: Feature<Polygon>[]; }) {
    let polygonArea = 0;
    let tractCount = props.polygons.length;
  
  console.info("Polygons: ", props.polygons);

  for (const polygon of props.polygons) {
    polygonArea += area(polygon);
  }

  function printCoordinates(polygons: Feature<Polygon>[]) {
    if (!polygons) {
      return "No Tracts Defined Yet"      
    }
    return polygons.map((poly, polyIndex) => {
      let items = poly.geometry.coordinates.map(coord => {
        return coord.map((point, coordIndex) => 
          <li key={coordIndex}>{point[0]}, {point[1]}</li>
        )
      })
      return (
        <div className="tract">
            <div>Tract {polyIndex + 1} ({round(areaInAcres(poly), 1)} acres)</div>
            <div className="sub-header">Coordinates</div>
            <div className="coordinate-panel"><ul>{items}</ul></div>
        </div>)
    })
  }

  return (
    <div className="plat-panel">
      <h1>Tracts</h1>
      {polygonArea > 0 && (
        <p>
            {tractCount} tracts ({round(metersSquareToAcres(polygonArea), 2)} acres)
        </p>
      )}
      {props.polygons && (
      <div>
        {printCoordinates(props.polygons)}
      </div>

      )}
    </div>
  );
}
export default React.memo(PlatPanel);