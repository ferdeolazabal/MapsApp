import { useContext } from "react"
import { PlacesContext } from "../context"

export const SearchResults = () => {
    
    const { isLoadingPlaces, places } = useContext( PlacesContext )


    if ( isLoadingPlaces ) {
        return <p className="mt-3 alert alert-warning">Loading...</p>
    };

    if ( places.length === 0 ) return <></>;

    return (
        <ul className="list-group mt-3">
            {
                places.map( place => (

                    <li 
                        className="list-group-item list-group-item-action pointer" 
                        key={place.id}>
                    <h6> { place.text_es } </h6>
                    <p 
                        className="text-muted"
                        style={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}
                    >
                        { place.place_name_es }
                    </p>

                    <button className="btn btn-outline-primary btn-sm">
                        Direcciones
                    </button>

                    </li>


                ))
            }

        </ul>
)
}
