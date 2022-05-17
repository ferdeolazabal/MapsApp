import { useReducer } from "react";
import { Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";

export interface MapState {
    isMapReady: boolean;
    map?: Map;
};

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined
};

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ( { children } : Props ) => {
    
    const [state, dispatch] = useReducer( mapReducer, INITIAL_STATE );
    
    const setMap = ( map: Map ) => {
        
        const myLocationPopup = new Popup()
            .setHTML(`
                <h4>Aqui Estoy</h4>
                <p>En algún lugar del mundo</p>
            `)
        new Marker( { color: '#ff0000' })
            .setLngLat( map.getCenter() )
            .setPopup( myLocationPopup )
            .addTo( map );


        dispatch( { type: "SET_MAP", payload: map } );
    }

    return (
        <MapContext.Provider value={{ 
            ...state,
            setMap
        }}>
            { children }
        </MapContext.Provider>
    )
};