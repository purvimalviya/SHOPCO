import { Suspense, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

function wrapPromise(promise: Promise<any>) {
  let status = 'pending';
  let result: any;
  const suspender = promise.then(
    (res) => {
        console.log("suspender promise then 5")  //after this pont searchResult component re renders
        console.log(res)  

      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      result = err;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender; 
      } else if (status === 'error') {
        throw result; 
      } else if (status === 'success') {
        console.log("success after resolve") 
        return result; 
      }
    },
  };
}

const fetchData = (query: string) => {
  return wrapPromise(
    fetch('https://reduxcart-cygbit-default-rtdb.firebaseio.com/shopco_products.json')
      .then((response) => {
         console.log("3")
         console.log(response); 
         return response.json()
        })
      .then((data) => {
        console.log("4")
        console.log(data) 
        const productsArray = Array.isArray(data) ? data : Object.values(data);

        return productsArray.filter((product: any) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
      })
  );
};

const SearchResults = ({resource,setResource}:any) => {
  console.log("searchresult rendered 2") 
  const data = resource.read();
  console.log("final point") 

  if (data.length === 0) {
    return (
      <div className="absolute bg-pink-600 shadow-lg top-16 left-0 w-full">
        <div className="p-2">No such product</div>
      </div>
    );
  }
  
  return (
    <div className="absolute bg-pink-600 shadow-lg top-16 left-0 w-full">
      {data.map((product: any, index: number) => (
        <div key={index} className="p-2" onClick={()=>setResource(null)}>
            <Link to={`/Product/${product.id}`}>
                {product.name}
            </Link>
        </div>
      ))}
    </div>
  );
};

const Coontainer = () => {
  console.log("container rendered 1") 
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
    <div className="flex justify-center w-56">

        <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 absolute right-0 top-3 z-10">
            <input type="text" onChange={handleChange} />

            {resource && (
                <Suspense fallback={<Loader />}>
                    <SearchResults resource={resource} setResource={setResource} />
                </Suspense>
            )}
        
        </div>

    </div>
  );
};

export default Coontainer;

// import { Suspense, useEffect, useState, useRef} from 'react';
// import { Link } from 'react-router-dom';
// import Loader from './Loader';

// function wrapPromise(promise: Promise<any>) {
//   let status = 'pending';
//   let result: any;
//   const suspender = promise.then(
//     (res) => {
//         console.log("suspender promise then 5")  //after this pont searchResult component re renders
//         console.log(res)  

//       status = 'success';
//       result = res;
//     },
//     (err) => {
//       status = 'error';
//       result = err;
//     }
//   );

//   return {
//     read() {
//       if (status === 'pending') {
//         throw suspender; 
//       } else if (status === 'error') {
//         throw result; 
//       } else if (status === 'success') {
//         console.log("success after resolve") 
//         return result; 
//       }
//     },
//   };
// }

// const fetchData = (query: string) => {
//   return wrapPromise(
//     fetch('https://reduxcart-cygbit-default-rtdb.firebaseio.com/shopco_products.json')
//       .then((response) => {
//          console.log("3")
//          console.log(response); 
//          return response.json()
//         })
//       .then((data) => {
//         console.log("4")
//         console.log(data) 
//         const productsArray = Array.isArray(data) ? data : Object.values(data);

//         return productsArray.filter((product: any) =>
//           product.name.toLowerCase().includes(query.toLowerCase())
//         );
//       })
//   );
// };

// const SearchResults = ({resource}:any) => {
//   console.log("searchresult rendered 2") 
//   const data = resource.read();
//   console.log("final point") 

//   if (data.length === 0) {
//     return (
//       <div className="absolute bg-pink-600 shadow-lg top-16 left-0 w-full">
//         <div className="p-2">No such product</div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="absolute bg-pink-600 shadow-lg top-16 left-0 w-full">
//       {data.map((product: any, index: number) => (
//         <div key={index} className="p-2">
//           {product.name}
//         </div>
//       ))}
//     </div>
//   );
// };

// const Coontainer = () => {
//   console.log("container rendered 1") 
//   const [query, setQuery] = useState<string>(''); // Store the search query
//   const [resource, setResource] = useState<any>(null); // Initial fetch
//   const inputRef = useRef();

//   useEffect(()=>{
//     if(query){
//         setResource(fetchData(query));
//     }
//   },[query])

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setQuery(inputRef.current.value);
//   };

//   return (
//     <div className="flex justify-center w-56">

//         <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 absolute right-0 top-3 z-10">
//             <input type="text" ref={inputRef} />
//             <button type="submit" onClick={handleSubmit}>Submit</button>

//             {resource && (
//                 <Suspense fallback={<Loader />}>
//                     <SearchResults resource={resource} />
//                 </Suspense>
//             )}
        
//         </div>

//     </div>
//   );
// };

// export default Coontainer;

