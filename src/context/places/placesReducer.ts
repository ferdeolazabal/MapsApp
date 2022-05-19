import { Feature } from '../../interfaces/places';
import { PlacesState } from './PlacesProvider';

type PlacesAction = 
| { type: 'setUserLocation', payload: [ number, number ] }
| { type: 'setLoadingPlaces', payload: boolean }
| { type: 'setPlaces', payload: Feature[] }

export const placesReducer = ( state: PlacesState, { type, payload }: PlacesAction ): PlacesState => {

    switch (type) {
        case 'setUserLocation':
            return {
                ...state,
                isLoading: false,
                userLocation: payload
            };

        case 'setLoadingPlaces':
            return {
                ...state,
                isLoadingPlaces: payload,
                places: []
            };

        case 'setPlaces':
            return {
                ...state,
                isLoadingPlaces: false,
                places: payload
            };
            
        default:
            return state;
    };
};