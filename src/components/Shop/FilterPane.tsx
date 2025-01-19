import {useState} from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 
// import { category_tags} from '../../lib/constants';

// const FilterPane = ({setFilterVisible}:{setFilterVisible:(value:boolean) => void }) => {
  const FilterPane = ({ setFilterVisible, setFilters }: { setFilterVisible: (value: boolean) => void, setFilters: (filters: any) => void }) => {
    const [priceRange, setPriceRange] = useState([200, 800]);
    const [sortOrder, setSortOrder] = useState('default');

        const handleChange = (value:any) => {
            setPriceRange(value);
        };

        const handleSortChange = (order: string) => {
          setSortOrder(order);
        };
      
        const applyFilters = () => {
          setFilters({
            price: priceRange,
            sortOrder: sortOrder,
          });
          // setFilterVisible(false);
        };

  return (
    <div className="bg-white border-gray-300 border-[2px] rounded-xl h-fit p-6 flex flex-col gap-6">
        <div className="flex flex-row justify-between border-gray-300 border-b-[2px] pb-3">
          <h3 className="font-bold text-lg">Filter by</h3>
          <div onClick={ ()=>{setFilterVisible(false)} } className='md:flex hidden' >X</div>
        </div>

        <div>
          <h2 className="mb-4 text-sm text-gray-500">Price</h2>
          <div>
          <div className="flex justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
            <Slider
              range
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onChange={handleChange}
    
            />
          </div>
        </div>

        <div className="flex flex-row justify-between border-gray-300 border-b-[2px] pb-3 mt-3">
          <h3 className="font-bold text-lg">Sort by</h3>
          {/* <div>X</div> */}
        </div>
        <div className="flex flex-col gap-3">

          <div
            className={`px-3 py-2 rounded-full cursor-pointer ${sortOrder === 'lowToHigh' ? 'bg-slate-100' : ''}`}
            onClick={() => handleSortChange('lowToHigh')}
          >
            Price: Low to High
          </div>

          <div
            className={`px-3 py-2 rounded-full cursor-pointer ${sortOrder === 'highToLow' ? 'bg-slate-100' : ''}`}
            onClick={() => handleSortChange('highToLow')}
          >
            Price: High to Low
          </div>

        </div>


        <button
        className="mt-4 bg-slate-700 text-white p-2 rounded-full"
        onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>
  )
}

export default FilterPane
