import {useState} from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 

const FilterPane = () => {
    const [priceRange, setPriceRange] = useState([200, 800]);

      // Handle the change in range values
        const handleChange = (value:any) => {
            setPriceRange(value);
        };

  return (
    <div className="bg-white border-gray-300 border-[2px] rounded-xl h-fit p-6 flex flex-col gap-6">
        <div className="flex flex-row justify-between border-gray-300 border-b-[2px] pb-3">
          <h3 className="font-bold text-lg">Filter by</h3>
          <div>X</div>
        </div>

        <div>
          <h2 className="mb-4 text-sm text-gray-500">Categories</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            <div className="px-3 py-2 bg-custom-gray rounded-full">Some</div>
            <div className="px-3 py-2 bg-custom-gray rounded-full">Some</div>
            <div className="px-3 py-2 bg-custom-gray rounded-full">Some</div>
            <div className="px-3 py-2 bg-custom-gray rounded-full">Some</div>
            <div className="px-3 py-2 bg-custom-gray rounded-full">Some</div>
            <div className="px-3 py-2 bg-custom-gray rounded-full">Some</div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm text-gray-500">Gender</h2>
          <div className="flex flex-row gap-3">
            <div className="px-3 py-2 bg-custom-gray rounded-full">Some</div>
            <div className="px-3 py-2 bg-custom-gray rounded-full">Some</div>            
          </div>
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
          <div>X</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="px-3 py-2 bg-custom-gray rounded-full">Some</div>
          <div className="px-3 py-2 bg-custom-gray rounded-full">Some</div>            
        </div>
      </div>
  )
}

export default FilterPane
