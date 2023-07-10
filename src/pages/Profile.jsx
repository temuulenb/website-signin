import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <div>
        <button type='submit' className='text-center mt-4 bg-blue-200 text-black uppercase px-5 py-2
        text-sm font-bold rounded shadow-md hover:bg-blue-400 transition duration ease-in-out hover:shadow-lg
        active:bg-blue-500'>
            <Link to="/create-listing" className='flex justify-center'>
                Make New announcement
            
            </Link>  
        </button>
    </div>
  )
}
