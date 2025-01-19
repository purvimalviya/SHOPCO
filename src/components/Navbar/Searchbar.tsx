// import React from 'react'
// import { Link } from 'react-router-dom';
import search from '../../assets/search.png'
import {fetchData} from '../../services/searchService'
import { Suspense, useEffect, useState, lazy } from 'react';
import Loader from './Loader';

const SearchResults = lazy(() => import('./SearchResults')); // Lazy load SearchResults

const Searchbar = () => {
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
    <div className='flex items-center gap-4 bg-custom-gray rounded-full px-4 py-2 w-[42%] sm:hidden'>
      <div className='text-gray-400'><img src={search} alt="" /></div>
      <input type="text" placeholder='Search for products' onChange={handleChange} className='bg-transparent focus:outline-none placeholder:text-gray-400' />

      {resource && (
        <Suspense fallback={<Loader />}>
            <SearchResults resource={resource} setResource={setResource} />
        </Suspense>
      )}
    </div>
  )
}

export default Searchbar

