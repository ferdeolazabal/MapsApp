import { useContext, useState } from "react"
import { MapContext, PlacesContext } from "../context"
import { Feature } from "../interfaces/places"

export const SearchResults = () => {
    
    const { isLoadingPlaces, places, userLocation } = useContext( PlacesContext )
    const { map, getRouteBetweenPoints } = useContext( MapContext )

    const [activeId, setActiveId] = useState('')

    const onPlaceClicked = ( place: Feature ) => {
        setActiveId( place.id )
        const [ lng, lat ] = place.center
        map?.flyTo({
            center: [ lng, lat ],
            zoom: 14,
        })
    }

    const getRoute = ( place: Feature ) => {
        if (!userLocation) return;
        const [ lng, lat ] = place.center
        getRouteBetweenPoints( userLocation, [ lng, lat ] )
    }

    if ( isLoadingPlaces ) {
        return <p className="mt-3 alert alert-warning">Loading...</p>
    };

    if ( places.length === 0 ) return <></>;

    return (
        <ul className="list-group mt-3">
            {
                places.map( place => (

                    <li 
                        className={'list-group-item list-group-item-action pointer ' + (place.id === activeId ? 'active' : '')}
                        key={place.id}
                        onClick={() => onPlaceClicked(place)}
                    >
                    <h6> { place.text_es } </h6>
                    <p 
                        style={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}
                    >
                        { place.place_name_es }
                    </p>

                    <button 
                        className={`btn btn-sm ${ activeId === place.id ? 'btn-outline-light': 'btn-outline-primary'} `}
                        onClick={ () => getRoute( place ) }
                    >
                        Direcciones
                    </button>

                    </li>


                ))
            }

        </ul>
)
}
