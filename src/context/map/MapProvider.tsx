import { useContext, useReducer, useEffect } from "react";
import { Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";
import { PlacesContext } from "../";

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
};

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
};

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ( { children } : Props ) => {
    
    const [state, dispatch] = useReducer( mapReducer, INITIAL_STATE );
    const { places } = useContext( PlacesContext );

    useEffect(() => {
        state.markers.forEach( marker => marker.remove() );
        const newMarkers: Marker[] = [];
        
        for (const place of places ) {
            const [ lng, lat ] = place.center;
            const popup = new Popup()
                .setHTML(`
                    <h6>${ place.text_es }</h6>
                    <p>${ place.place_name_es }</p>
                `);

            const newMarker = new Marker()
                .setLngLat([lng, lat])
                .setPopup(popup)
                .addTo(state.map!);

            newMarkers.push( newMarker );
        }

        dispatch({ type: "SET_MARKERS", payload: newMarkers });

    }, [places, state.map, state.markers]);
    

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