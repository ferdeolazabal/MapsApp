import { useEffect, useReducer } from "react";
import { getUserLocation } from "../../helpers";
import { PlacesContext } from "./PlacesContest";
import { placesReducer } from "./placesReducer";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
};

interface Props {
    children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined
}

export const PlacesProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer( placesReducer, INITIAL_STATE );

    useEffect(() => {
        getUserLocation()
            .then( lngLat => dispatch( { type: 'setUserLocation',payload: lngLat }))
            .catch( err => console.log(err) );
    }, [])
    

    return (
        <PlacesContext.Provider value={{
            ...state,
        }}>
            {children}
        </PlacesContext.Provider>
    )
}
