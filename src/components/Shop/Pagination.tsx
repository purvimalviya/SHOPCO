// import React from 'react'
import { useEffect, useState } from "react";

const Pagination = ({totalItems, itemsPerPage, setCurrentItems}:{totalItems:number; itemsPerPage:number; setCurrentItems:(items: number[]) => void }) => {

  const data = Array.from({ length: totalItems }, (_, i) => i+1 );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages:number = Math.ceil(data.length / itemsPerPage);

  useEffect(()=>{

        const startIndex :number = (currentPage - 1) * itemsPerPage;
        const endIndex :number = startIndex + itemsPerPage;
        setCurrentItems(data.slice(startIndex, endIndex));
        // const currentItems:number[] = data.slice(startIndex, endIndex);
  },[currentPage])


 
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-row justify-center gap-2">
        <button onClick={handlePrevious} disabled={currentPage === 1} className="font-semibold text-gray-500">
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => goToPage(i + 1)} className="mx-1">
            {i + 1}
          </button>
        ))}

        <button onClick={handleNext} disabled={currentPage === totalPages} className="font-semibold text-gray-500">
          Next
        </button>
    </div>
  )
}

export default Pagination
