import { GeoJsonLayer } from 'deck.gl';
import chroma from 'chroma-js';

export function renderLayers(props) {
    const parks = props.data;

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    }

    return new GeoJsonLayer({
        id: 'geojson',
        data: parks,
        opacity: 0.5,
        stroked: true,
        filled: true,
        extruded: true,
        fp64: true,

        getFillColor: (f) => {
            let visits = Math.floor(Math.random() * (16000 - 4000) + 4000);
            let scale = chroma.scale(['white', '#ed0046']);
            let color = scale(visits / 16000).hex();
            console.log(color);
            return [hexToRgb(color).r, hexToRgb(color).g, hexToRgb(color).b];
        },
        getLineColor: (f) => [0, 255, 0],

        pickable: true,
        onHover: ({x, y, object}) => {
            const tooltip = document.getElementById('tooltip');
            if (object && object.properties.tags.name) {
                tooltip.style.top = `${y}px`;
                tooltip.style.left = `${x}px`;
                tooltip.innerHTML = `${object.properties.tags.name}`;
            } else {
              tooltip.innerHTML = '';
            }
        },
        onClick: ({x, y, object}) => {
            const tooltip = document.getElementById('tooltip');
            if (object && object.properties.tags.name) {
                tooltip.style.top = `${y}px`;
                tooltip.style.left = `${x}px`;
                tooltip.innerHTML = `${object.properties.tags.name}`;
            } else {
              tooltip.innerHTML = '';
            }
        }
    });
}