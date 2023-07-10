import { getAuth } from 'firebase/auth';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
  });
  const { name, email } = formData;
  function onLogout() {
      auth.signOut();
      navigate("/");
  }
  return (
    <div>
        <section className="max-w-6xl mx-auto flex flex-col justify-center items-center">
            <h1 className="text-2xl text-center mt-6 font-bold">My Profile</h1>
            <div className="w-full md:w-[50%] mt-6 px-3">
                <form>
                      { /* name input */ } 
                      <input 
                      type='text' 
                      id='name' 
                      value={name}
                      disabled
                      className="w-[65%] px-4 py-1 text-md text-black bg-white border border-gray-300
                      rounded transition ease-in-out mb-5"/>

                      { /* email input */ } 
                      <input 
                      type='email' 
                      id='email' 
                      value={email}
                      disabled
                      className="w-[65%] px-4 py-1 text-md text-black bg-white border border-gray-300
                      rounded transition ease-in-out mb-1"/>

                      <div className="flex whitespace-nowrap text-sm sm:text-md mb-5">
                          <p className="flex items-center">Do you want to make changes?
                            <span className="ml-2 text-red-600 hover:text-red-800 transition 
                            ease-in-out duration-200 cursor-pointer">Edit</span>
                          </p>
                      </div>
                      <button onClick={onLogout} className="bg-blue-600 text-white px-3 py-1 ml-40 text-sm font-medium
                      rounded shadow-lg hover:bg-blue-800 transition duration-150 ease-in-out 
                      hover:shadow-lg active:bg-blue-900">Sign Out</button>
                </form>
            </div>
            <button type='submit' className='text-center mt-4 bg-blue-200 text-black uppercase px-5 py-2
                    text-sm font-bold rounded shadow-md hover:bg-blue-400 transition duration ease-in-out hover:shadow-lg
                    active:bg-blue-500'>
                        <Link to="/create-listing" className='flex justify-center'>
                            Make New announcement
                        </Link>  
            </button>
        </section>
    </div>
  )
}
