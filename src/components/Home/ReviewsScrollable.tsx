// import React from 'react'
import T1 from "../common/T1";
import ReviewCard from "../common/ReviewCard";

const ReviewsScrollable = ()=>{

    const reviews:{name:string,text:string,rating:number}[] = [
        {name : "Sarah M.", text:"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.", rating:4 },
        {name : "Alex K.", text:"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.", rating:4.5 },
        {name : "James L.", text:"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.", rating:5},
        {name : "Aly G.", text:"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.", rating:4 },
        {name : "Ginny J.", text:"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.", rating:4.8 },
        {name : "Sean P.", text:"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.", rating:4},
      ]
      
    
      const scrollHorizontal = (direction: 'left' | 'right') => {
        const container = document.getElementById('scrollableContainer');
        if (container) {
          const scrollAmount = 300; // Amount to scroll
          if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          }
        }
      };

  return (
     <>
        <div className='flex flex-col items-center'>
        <div className='w-[85%] flex justify-between'>
          <T1 align="left">OUR HAPPY CUSTOMERS</T1>
          <div className='flex gap-3 mt-20'>
            <div className='cursor-pointer' onClick={() => scrollHorizontal('left')}>←</div>
            <div className='cursor-pointer' onClick={() => scrollHorizontal('right')}>→</div>
          </div>
        </div>
      </div>
      <div
          id="scrollableContainer"
          className='flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory'>
            <div className='w-10 flex-shrink-0'></div>
          {reviews.map((review,i) => (
            <ReviewCard key={i} name={review.name} text={review.text} rating={review.rating}></ReviewCard>
          ))}
        </div>
     </>
  )
}

export default ReviewsScrollable;

