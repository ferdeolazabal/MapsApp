import { PlacesProvider } from './context';


if( navigator.geolocation ) {
    navigator.geolocation.getCurrentPosition( position => {
        const { latitude, longitude } = position.coords;
        console.log( 'latitud',latitude, 'longitud',longitude );
    } );
} else {
    console.log( 'Geolocation is not supported by this browser.' );
    throw new Error( 'Geolocation is not supported by this browser.' );
}

export const MapsApp = () => {
    return (
        <PlacesProvider>
            <h1>Hola mundo</h1>
        </PlacesProvider>
)
}
