import React from 'react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export default function ListingItem({listing, id}) {
  return <li className="bg-white relative flex flex-col justify-between items-center 
         shadow-md hover:shadow-xl rounded overflow-hidden transition-shadow duration-150 m-[10px]">
            <Link className="contents" to={`/category/${listing.type}/${id}`}>
                <img className="h-[16
                0px] w-full object-cover hover:scale-105 
                transition-scale duration-200 ease-in" 
                loading='lazy'
                src={listing.imgUrls[0]} />
            </Link>
            <Moment className="absolute top-2 left-2 bg-gray-200 text-sm font-semibold 
            rounded-md px-2 py-1 shadow-lg shadow-fuchsia-600" fromNow>
                {listing.timestamp?.toDate()}
            </Moment>
            <div className="w-full p-[10px]">
                <p className="font-semibold px-1">{listing.name}</p>
                <p className="px-1">{listing.description}</p>
                <div className="flex space-x-3">
                    <div className="bg-blue-300 rounded px-2">
                        <p>{listing.amount > 1 ? `${listing.amount} Quantity` : "Quantity:1"}</p>
                    </div>
                    <div className="">
                        <p>{listing.appearance}</p>
                    </div>
                </div>
                <p className="px-1">
                    ${listing.price}
                </p>
                
            </div>
    </li>;
}
