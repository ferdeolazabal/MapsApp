import { PlacesState } from './PlacesProvider';

type PlacesAction = {
    type: 'setUserLocation', payload: [ number, number ];
}


export const placesReducer = ( state: PlacesState, { type, payload }: PlacesAction ): PlacesState => {

    switch (type) {
        case 'setUserLocation':
            return {
                ...state,
                isLoading: false,
                userLocation: payload
            }
        default:
            return state;
    }

}