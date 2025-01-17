import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void; // Function to trigger search
}

const Searchbar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>(''); // Store user input (search query)
  const [debouncedQuery, setDebouncedQuery] = useState<string>(''); // Store debounced query

  // Update debounced query after a delay when the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query); // Update debounced query after delay
    }, 500); // Delay in ms (500ms in this case)

    // Cleanup function to clear the timeout if the user types again before the delay
    return () => clearTimeout(timer);
  }, [query]);

  // Trigger the search when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    } else {
      onSearch(''); // Clear search when query is empty
    }
  }, [debouncedQuery, onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value; // Get the updated query
    setQuery(newQuery); // Update query state
  };

  return (
    <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 w-full justify-between">
      <input
        type="text"
        placeholder="Search for products"
        value={query}
        onChange={handleChange} // Call handleChange to update query
        className="bg-transparent focus:outline-none placeholder:text-gray-400 w-full"
      />
      <div className="flex items-center">
        {query && (
          <div
            className="text-gray-400 ml-2 font-semibold text-xl cursor-pointer"
            onClick={() => {
              setQuery(''); // Clear query on click
              onSearch(''); // Clear search results
            }}
          >
            X
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
