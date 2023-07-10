import { useState } from 'react'

export default function CreateListing() {
  const [formData, setFormData] = useState({
      type: "trade",
      name: "",
      amount: 0,
      appearance: "",
      description: "",
      price: 0,
  });
  const { 
      type,
      name, 
      amount,
      appearance,
      description,
      price,
  } = formData;
  function onChange(){

  }
  return (
    <div className='max-w-md px-2 mx-auto'>
        <h1 className='text-xl text-center mt-6 font-bold'>
            Create Your Item
        </h1>

        <form>
            <p className='text-m mt-6 font-semibold '>Sell / Trade</p>
            <div className="flex">
                <button type='button' id='type' value='sale' onClick={onChange}
                className={`mr-3 px-1 py-2 font-medium text-sm uppercase shadow-md rounded 
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out
                w-full ${
                    type === "trade" ? "bg-white text-black" : "bg-blue-300 text-black"
                }`}>
                    Sell
                </button>
                <button type='button' id='type' value='sale' onClick={onChange}
                className={`ml-3 px-1 py-2 font-medium text-sm uppercase shadow-md rounded 
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out
                w-full ${
                    type === "sale" ? "bg-white text-black" : "bg-blue-300 text-black"
                }`}>
                    trade
                </button>
            </div>
            <p className="text-m mt-10 font-semibold">Name</p> 
            <input 
            type='text' 
            id='name'
            value={name} 
            onChange={onChange}
            placeholder='Enter Your Full Name'
            maxLength="32" 
            minLength="10" 
            required 
            className="w-full px-2 py-1 text-m text-black bg-white border border-black 
            rounded transition duration-150 ease-in-out focus:text-black focus:bg-white mb-10"
            />
            <div className="flex space-x-8 mb-4">
                <div className=''>
                    <p className='text-m font-semibold'>Amount</p>
                    <input 
                    type='number' 
                    id='amount' 
                    value={amount} 
                    onChange={onChange} 
                    min="1"
                    max="100"
                    required
                    className="px-2 py-1 text-center text-m text-black bg-white border border-black 
                    rounded transition duration-150 ease-in-out focus:text-black focus:bg-white"
                    />
                </div>
                <div>
                    <p className='text-md font-semibold'>Appearance</p>
                    <select 
                          id='appearance' 
                          value={appearance} 
                          onChange={onChange} 
                          required
                          className="pl-1 py-2 flex text-s text-black bg-white border border-black 
                          rounded transition duration-150 ease-in-out focus:text-black focus:bg-white"
                    >
                          <option selected value="Please select your choice">Please select</option>
                          <option value="1">New</option>
                          <option value="2">Almost New</option>
                          <option value="3">Old</option>
                          <option value="4">Other</option>
                    </select>
                </div>
            </div>
            
            <p className="text-m font-semibold mt-10">Description</p>
                <textarea
                    type="text"
                    id="description"
                    value={description}
                    onChange={onChange}
                    placeholder="Description"
                    required
                    className="w-full px-4 py-2 text-md  text-black bg-white border border-black 
                    rounded transition duration-150 ease-in-out focus:text-black focus:bg-white 
                    focus:border-slate-600"
                />

            <div className="flex items-center mb-7">
                <div className="">
                    <p className="text-m mt-7 font-semibold">Price</p>
                    <div className="flex">
                        <input 
                        type="number" 
                        id="price" 
                        value={price} 
                        onChange={onChange}
                        min="1"
                        max="100000"
                        required
                        className="px-2 py-1 text-center text-m text-black bg-white border border-black 
                        rounded transition duration-150 ease-in-out focus:text-black focus:bg-white"/>
                        <p className="whitespace-nowrap text-xl w-full ml-2">$</p>
                    </div>            
                </div>
            </div>
            <div className="">
                <p className="text-m mt-7 font-semibold">Images</p>
                <p className="text-sm text-gray-500">The first image will be the cover (max 6)</p>
                <input 
                type="file" 
                id="images" 
                onChange={onChange}
                accept=".jpg,.png,.jpeg"
                multiple
                required
                className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition 
                duration-150 ease-in-out focus:bg-white focus:border-slate-600 mb-10"/>
            </div>  
            <button type='submit' 
            className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded 
            shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
            active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Upload</button>
        </form>
    </div>
  )
}
