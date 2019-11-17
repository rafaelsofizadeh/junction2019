import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from 'deck.gl';
import nationalParksGeojson from './data/nationalParksGeojson.json';
import { renderLayers } from './layers';
//import { tooltipStyle } from './style';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmFmYXNvZml6YWRhIiwiYSI6ImNrMzBvdXR5YjAwbjYzaG8ycXF0Z3A0bWoifQ.ynUN6MmkBIkH1YnUkjn9Ng';

const INITIAL_VIEW_STATE = {
    latitude: 60.17,
    longitude: 24.94,
    zoom: 11,
    minZoom: 3,
    maxZoom: 17,
    pitch: 45,
    bearing: 0
};

export default class VisitorMap extends Component {
    state = {
        style: 'mapbox://styles/mapbox/dark-v9'
    };

    render() {
        return (
            <div>
                <DeckGL
                    layers={renderLayers({ data: nationalParksGeojson })}
                    initialViewState={INITIAL_VIEW_STATE}
                    controller
                >
                    <StaticMap
                        mapStyle={this.state.style}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                    />
                </DeckGL>
            </div>
        );
    }
}