import React from 'react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import {FaTrash} from 'react-icons/fa';
import {MdEdit} from 'react-icons/md';

export default function ListingItem({listing, id, onEdit, onDelete}) {
  return <li className="bg-white relative flex flex-col justify-between items-center 
         shadow-md hover:shadow-xl rounded overflow-hidden transition-shadow duration-150 m-[10px]">
            <Link className="contents" to={`/category/${listing.type}/${id}`}> 
                <img className="h-[200px] w-[100%] object-contain hover:scale-105 
                transition-scale duration-200 ease-in" 
                loading='lazy'
                src={listing.imgUrls[0]} />
            </Link>
            <Moment className="absolute top-1 left-2 bg-blue-200 text-sm font-semibold 
            rounded-md px-[5px] py-0.5 shadow-lg shadow-gray-600" fromNow>
                {listing.timestamp?.toDate()}
            </Moment>
            <div className="w-full p-[10px]">
                <p className="font-semibold px-1">{listing.name}</p>
                <p className="px-1">{listing.description}</p>
                <div className="flex space-x-3">
                    <div className="bg-blue-300 rounded px-2">
                        <p>{listing.amount > 1 ? `Quantity: ${listing.amount}` : "Quantity:1"}</p>
                    </div>
                    <div className="bg-yellow-200 rounded px-2">
                        <p>{listing.appearance}</p>
                    </div>
                </div>
                <p className="px-1 mt-2 font-medium">
                    ${listing.price}
                </p>        
            </div>
            {onDelete && (
                <FaTrash className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-600"
                onClick={() => onDelete(listing.id)} />
            )}
            {onEdit && (
                <MdEdit className="absolute bottom-2 right-7 h-[20px] cursor-pointer text-black"
                onClick={() => onEdit(listing.id)} />
            )}
        </li>
}
