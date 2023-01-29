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
  

function PlatPanel(props: { polygons: Feature<Polygon>[]; }) {
    let polygonArea = 0;
//   let polygons: Feature<Polygon>[] = props.polygons;
  
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
        <div>
            <div>Tract {polyIndex + 1}</div>
            <div>{areaInAcres(poly)} acres</div>
            <div>Coordinates</div>
            <div>{items}</div>
        </div>)
    })
  }

  return (
    <div className="plat-panel">
      <h3>Tracts</h3>
      {polygonArea > 0 && (
        <p>
          Total area: {metersSquareToAcres(polygonArea)} &nbsp;
          acres
        </p>
      )}
      {props.polygons && (
      <div className="polygons">
        {printCoordinates(props.polygons)}
      </div>

      )}
    </div>
  );
}
export default React.memo(PlatPanel);