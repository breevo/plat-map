import {Feature, Polygon, Geometry, GeoJsonObject} from 'geojson';


export default function Tract(props: { polygon: Feature<Polygon>; }) {
    
    console.info("Tract: ", props.polygon);



}