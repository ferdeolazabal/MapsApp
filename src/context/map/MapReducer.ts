import { MapState } from './MapProvider';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map, Marker } from '!mapbox-gl';

type MapAction = 
| { type: 'SET_MAP'; payload: Map }
| { type: 'SET_MARKERS'; payload: Marker[] }

export const mapReducer = ( state: MapState, action: MapAction): MapState => {

    switch (action.type) {
        case 'SET_MAP':
            return { 
                ...state,
                isMapReady: true,
                map: action.payload 
            };
        case 'SET_MARKERS':
            return {
                ...state,
                markers: action.payload
            };
        default:
            return state;
    };
};
