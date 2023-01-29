import * as React from 'react';
import {Feature, Polygon, Geometry, GeoJsonObject} from 'geojson';
import Tract from './tract';

import './plat.css';

function Plat(props: { features: Feature<Polygon>[]; }) {
    for (const f of props.features) {
        new Tract({polygon: f});
    }

    return (
        <div>Tract</div>
    );
}
export default React.memo(Plat);