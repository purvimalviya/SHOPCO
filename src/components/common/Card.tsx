import React from 'react'
import Stars from './Stars';
import { Link } from 'react-router-dom';

interface CardProp{
    id:string;
    name:string;
    price:number;
    img: string;
    rating:number;
}

const Card: React.FC<CardProp> = ({ id, name, price, img, rating }) => {
  return (
    <div className="flex flex-col cursor-pointer min-w-[14rem] snap-start">
      <Link to={`/Product/${id}`}>
        <img src={img} alt={name} className="h-[20vw] w-[20vw] rounded-3xl sm:w-64 sm:h-64" />
        <h3 className="font-semibold text-lg mt-4">{name}</h3>
        <Stars rating={rating}></Stars>
        <div className="font-semibold text-2xl">${price}</div>
      </Link>
    </div>
  );
};

export default Card;
