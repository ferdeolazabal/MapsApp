import { useEffect, useReducer } from "react";
import { searchApi } from "../../apis";
import { getUserLocation } from "../../helpers";
import { Feature, PlacesResponse } from "../../interfaces/places";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
};

interface Props {
    children: JSX.Element | JSX.Element[];
};

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
};

export const PlacesProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer( placesReducer, INITIAL_STATE );

    useEffect(() => {
        getUserLocation()
            .then( lngLat => dispatch( { type: 'setUserLocation',payload: lngLat }))
            .catch( err => console.log(err) );
    }, []);
    
    const searchPlacesByTerm = async( query: string ): Promise<Feature[]> => {
        if ( query.length === 0 ) {
            dispatch( { type: 'setPlaces', payload: [] } );
            return [];
        };
        if ( !state.userLocation ) throw new Error('No user location');

        dispatch( { type: 'setLoadingPlaces', payload: true } );

        const resp = await searchApi.get<PlacesResponse>(`/${ query }.json`, {
            params: {
                proximity: state.userLocation.join(','),
            }
        });

        dispatch( { type: 'setPlaces', payload: resp.data.features } );
        console.log(resp.data.features[0]);
        return resp.data.features;
    };

    return (
        <PlacesContext.Provider value={{
            ...state,
            searchPlacesByTerm
        }}>
            {children}
        </PlacesContext.Provider>
    );
};