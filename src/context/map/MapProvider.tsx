import { useContext, useReducer, useEffect } from "react";
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";
import { PlacesContext } from "../";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [places, state.map ]);
    

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

    const getRouteBetweenPoints = async( start: [number, number], end: [number, number]) => {

        const resp = await directionsApi.get<DirectionsResponse>( `/${ start.join(',') }; ${ end.join(',') }` );

        const { distance, duration, geometry} = resp.data.routes[0]
        const { coordinates: coords } = geometry;
        let kms = distance / 1000;
            kms = Math.round( kms * 100)
            kms /= 100;
        
        let minutes = Math.floor(duration / 60);
        console.log({ kms, minutes });

        const bounds = new LngLatBounds(
            start,
            start
        );

        for ( const coord of coords ) {
            const newCoord: [number, number] = [ coord[0], coord[1] ];
            bounds.extend( newCoord );
        };

        state.map?.fitBounds( bounds, { padding: 200 } );

        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                        type: 'Feature',
                        properties: {
                            distance: distance,
                        },
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }]

            }
        };

        if ( state.map?.getLayer('route') ) {
            state.map?.removeLayer('route');
            state.map?.removeSource('route');
        }

        state.map?.addSource( 'route', sourceData );

        state.map?.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3bb2d0',
                'line-width': 6
            }
        });

    }


    return (
        <MapContext.Provider value={{ 
            ...state,
            setMap,
            getRouteBetweenPoints
        }}>
            { children }
        </MapContext.Provider>
    )
};