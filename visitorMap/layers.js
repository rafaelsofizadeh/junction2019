import { GeoJsonLayer } from 'deck.gl';

export function renderLayers(props) {
    const parks = props.data;

    return new GeoJsonLayer({
        id: 'geojson',
        data: parks,
        opacity: 0.5,
        stroked: true,
        filled: true,
        extruded: false,
        fp64: false,

        getFillColor: (c) => [0, 240, 0],
        getLineColor: (c) => [0, 255, 0],

        pickable: true
    });
}