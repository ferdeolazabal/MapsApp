import { ChangeEvent, useContext, useRef } from 'react';
import { PlacesContext } from '../context';
import { SearchResults } from '.';

export const SearchBar = () => {

    const { searchPlacesByTerm } = useContext( PlacesContext );
    
    const debounceRef = useRef<NodeJS.Timeout>();  

    const onQueryChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        if ( debounceRef.current ) {
            clearTimeout( debounceRef.current );
        }
        debounceRef.current = setTimeout( () => {
            console.log( 'debounce value',event.target.value );
            searchPlacesByTerm( event.target.value );

        }, 500 );
    }

    return (
        <div className="search-container">
            <input 
                className="form-control"
                type="text" 
                placeholder="Search..."
                onChange={ onQueryChanged }
            />

            <SearchResults />

        </div>
    )
}
