// import React from 'react'
// import { Link } from 'react-router-dom';
import search from '../../assets/search.png'
import { Suspense, useEffect, useState, lazy } from 'react';
import { fetchData } from '../../services/searchService';
import Loader from './Loader';

const SearchResults = lazy(() => import('./SearchResults')); // Lazy load SearchResults

const SearchbarSM = ({setSearchBar}:any) => {

      const [query, setQuery] = useState<string>(''); // Store the search query
      const [resource, setResource] = useState<any>(null); // Initial fetch
      const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);  // To track debounce timer
      
        useEffect(() => {
          if (query) {
            // Clear the previous timer if there is a new query input to avoid triggering multiple requests
            if (debounceTimer) clearTimeout(debounceTimer);
      
            const timer = setTimeout(() => {
              console.log("FETCHNGGG")
              console.log(query)
              setResource(fetchData(query)); // Trigger fetch after debounce period (500ms)
            }, 2000);
      
            setDebounceTimer(timer); // Set new debounce timer
          }
          else{
              if (debounceTimer) clearTimeout(debounceTimer);
              setResource(null)
          }
        }, [query]); // Only run effect if query changes
      
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(event.target.value); // Update the query as the user types
        };

  return (
    <div className='flex items-center bg-custom-gray rounded-full px-4 py-2 absolute right-0 top-3 z-10 cs:w-full justify-between'>
        <input type="text" placeholder='Search for products' onChange={handleChange} className='bg-transparent focus:outline-none placeholder:text-gray-400' />
        <div className='flex items-center'>
            <div className='text-gray-400'><img src={search} alt="" /></div>
            <div className='text-gray-400 ml-2 font-semibold text-xl' onClick={()=>setSearchBar(false)}>X</div>
        </div>

        {resource && (
            <Suspense fallback={<Loader />}>
                <SearchResults resource={resource} setResource={setResource} />
            </Suspense>
        )}
    </div>
  )
}

export default SearchbarSM
