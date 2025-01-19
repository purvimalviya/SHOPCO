import { Link } from "react-router-dom";

const SearchResults = ({resource,setResource}:any) => {
  console.log("searchresult rendered 2") 
  const data = resource.read();
  console.log("final point") 

  if (data.length === 0) {
    return (
      <div className="absolute bg-custom-gray shadow-lg top-[5.5vw] sm:top-12 left-0 w-full">
        <div className="p-2">No such product</div>
      </div>
    );
  }
  
  return (
    <div className="absolute bg-custom-gray shadow-lg top-[5.5vw] sm:top-12 left-0 w-full z-50 max-h-[70vh] overflow-scroll scrollbar-hide">
      {data.map((product: any, index: number) => (
        <Link to={`/Product/${product.id}`}>
          <div key={index} className="p-2 flex flex-row gap-3 border-x-[2px] border-b-[2px] border-gray-200" onClick={()=>setResource(null)}>
              <img src={product.img} alt="" className="w-14 h-14 rounded-lg"/>
              <h3 className="font-semibold">{product.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;