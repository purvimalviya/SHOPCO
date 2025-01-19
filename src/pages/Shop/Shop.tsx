// using useLocation
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import filter from '../../assets/filter.png'
import FilterPane from '../../components/Shop/FilterPane';
import ShopCard from '../../components/Shop/ShopCard';
import Pagination from '../../components/Shop/Pagination';
import Breadcrumbs from '../../components/Shop/Breadcrumbs';


const Shop = () => {
  const [isFilterVisible,setFilterVisible] = useState<boolean>(false);
  const [currentItems,setCurrentItems] = useState<number[]>([]);
  const itemsPerPage  = 3;

  interface Product {
    id: string;
    name: string;
    price: number;
    img: string;
    rating: number;
    description?: string;
    colors: string[];
    sizes: string[];
    gender?: string;
    category?: string[];
  }
  
    const [prod,setProd] = useState<Product[]>([]);
    const [filteredProd, setFilteredProd] = useState<Product[]>([]);
    const [filters, setFilters] = useState({
      price: [0, 1000],
      sortOrder: 'default',
    });
    const location = useLocation();
  
    useEffect(()=>{
      const getProd = async ()=>{
        try{
            const response = await fetch('https://reduxcart-cygbit-default-rtdb.firebaseio.com/shopco_products.json')
      
            if(!response.ok){
              throw new Error("Couldnt fetch products")
            }
            const products = await response.json();
            setProd(products);
            setCurrentItems(Array.from({ length: itemsPerPage }, (_, i) => i+1 ));
        }
        catch(err){
            console.log("Error Ocurred : ", err)
        }
      }
      getProd();
    },[])

    useEffect(() => {
      const pathParts = location.pathname.split("/").filter((part) => part !== "");
  
      let filtered = [...prod];

      if (pathParts.includes("Women")) {
        filtered = filtered.filter((item) => item.gender?.toLowerCase() === "women");
      } else if (pathParts.includes("Men")) {
        filtered = filtered.filter((item) => item.gender?.toLowerCase() === "men");
      }
  
      const category = pathParts[pathParts.length - 1];
      if (category !== "Shop" && category !== "Women" && category !== "Men") {
        filtered = filtered.filter((item) =>
          item.category?.some((cat) => cat.toLowerCase() === category.toLowerCase())
        );
      }

      filtered = filtered.filter(
        (item) => item.price >= filters.price[0] && item.price <= filters.price[1]
      );

      if (filters.sortOrder === 'lowToHigh') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (filters.sortOrder === 'highToLow') {
        filtered.sort((a, b) => b.price - a.price);
      }
  
      setFilteredProd(filtered);
      // console.log(filteredProd)// this gives empty array, whereas when i console log filtered it gives result on refresh
      setCurrentItems(Array.from({ length: itemsPerPage }, (_, i) => i+1 ));
    }, [location, prod, filters]);
  
    // useEffect(() => {
    //   console.log(filteredProd);  // Logs the updated `filteredProd` after it changes
    // }, [filteredProd]);
    


  return (
    <div className="flex flex-row w-[88%] mx-auto gap-2 justify-between">
      <div className='w-[28%] md:hidden'>
        <FilterPane setFilterVisible={setFilterVisible} setFilters={setFilters}/>
      </div>

      <div className="md:w-full w-[68%] flex flex-col gap-5">
        {
          isFilterVisible && (
            <div className='absolute z-30 w-[90%]'>
                <FilterPane setFilterVisible={setFilterVisible} setFilters={setFilters}/>
            </div>
          )
        }
        <div className="flex flex-row justify-between">
          <div className="md:flex hidden" onClick={()=>{setFilterVisible(true)}}>
            <img src={filter} alt="filter" className='h-5 mt-1' />
          </div>
          <div>
            <Breadcrumbs />
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-6 md:gap-10 lg:gap-6">
          {currentItems.length > 0 ? (
            currentItems.map((index) => {
              const product = filteredProd[index - 1];  // Adjusted to use `filteredProd`

              if (product) {
                return <ShopCard key={product.id} item={product} />;
              } else {
                return null;  
              }
            })
          ) : (
            <p>No products available</p> 
          )}
        </div>

        <Pagination totalItems={filteredProd.length} itemsPerPage={itemsPerPage} setCurrentItems={setCurrentItems}/>

      </div>

      
    </div>
  )
}

export default Shop

//otp email verify
//lazy-loading, loader
//dark mode
