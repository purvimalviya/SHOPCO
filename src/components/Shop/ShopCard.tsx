import Stars from '../common/Stars';

interface CardProp{
    id:string;
    name:string;
    price:number;
    img: string;
    rating:number;
}

const ShopCard = ({item}:{item:CardProp}) => {
  return (
    <div className='cs:w-[100%] lg:w-[47%] w-[28%] h-fit mb-3'>
        <div className="h-[17vw] md:h-[22vw] lg:h-[40vw] cs:h-[85vw] border rounded-lg flex flex-col">
            <img src={item.img} alt="" className='w-full h-full object-cover' />
        </div>  
        <div>
            <h3 className='font-semibold text-sm mt-2'>{item.name}</h3> 
            <Stars rating={item.rating} /> 
            <p className='font-semibold text-gray-500 text-lg'>{item.price}$</p>
        </div>  
    </div> 
  )
}

export default ShopCard
