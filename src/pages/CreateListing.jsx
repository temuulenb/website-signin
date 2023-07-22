import { useState } from 'react'
import { toast } from 'react-toastify';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
      type: "trade",
      name: "",
      amount: 0,
      appearance: "",
      description: "",
      price: 0,
      images: {},
  });
  const { 
      type,
      name, 
      amount,
      appearance,
      description,
      price,
      images,
  } = formData;
  function onChange(e){
        let boolean = null;
        if(e.target.value === "true"){
            boolean = true;
        }
        if(e.target.value === "false"){
            boolean = false;
        }
        if(e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files,
            }));
        }
        if(!e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,   
            }));
        }
  }

  async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if(images.length > 6){
            setLoading(false);
            toast.error("Max 6 images at the same time!");
            return;
        }

        async function storeImage(image){
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
                const storageRef = ref(storage, filename);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                      // Observe state change events such as progress, pause, and resume
                      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                      const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log("Upload is " + progress + "% done");
                      switch (snapshot.state) {
                        case "paused":
                          console.log("Upload is paused");
                          break;
                        case "running":
                          console.log("Upload is running");
                          break;
                      }
                    },
                    (error) => {
                      // Handle unsuccessful uploads
                      reject(error);
                    },
                    () => {
                      // Handle successful uploads on complete
                      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                      });
                    }
                  ); 
                });
        }

        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image)))
            .catch((error) => {
                setLoading(false);
                toast.error("Images not uploaded");
                return;
            }   
        );

        const formDataCopy = {
            ...formData,
            imgUrls,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
        };
        delete formDataCopy.images;
        const docRef = await addDoc(collection(db, "listings"), formDataCopy);
        setLoading(false);
        toast.success("Uploaded");
        navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }
    
  
   
   return (
    <div className='max-w-md px-2 mx-auto'>
        <h1 className='text-xl text-center mt-6 font-bold'>
            Create Your Item
        </h1>

        <form onSubmit={onSubmit}>
            <p className='text-m mt-6 font-semibold '>Sell / Trade</p>
            <div className="flex">
                <button 
                type='button' 
                id='type' 
                value='sale' 
                onClick={onChange}
                className={`mr-3 px-1 py-2 font-medium text-sm uppercase shadow-md rounded 
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out
                w-full ${
                    type === "trade" ? "bg-white text-black" : "bg-blue-300 text-black"
                }`}>
                    Sell
                </button>
                <button 
                type='button' 
                id='type' 
                value='trade' 
                onClick={onChange}
                className={`ml-3 px-1 py-2 font-medium text-sm uppercase shadow-md rounded 
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out
                w-full ${
                    type === "sale" ? "bg-white text-black" : "bg-blue-300 text-black"
                }`}>
                    trade
                </button>
            </div>
            <p className="text-m mt-10 font-semibold">Student ID</p> 
            <input 
            type='number' 
            id='name'
            value={name} 
            onChange={onChange}
            placeholder='Enter Your Student ID'
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
                        <option value="New">New</option>
                        <option value="Almost New">Almost New</option>
                        <option value="Old">Old</option>
                        <option value="Other">Other</option>    
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
            <div className="flex mb-6">
                <button type='submit' 
                className="w-[30%] ml-[160px] py-2.5 bg-blue-600 text-white font-medium text-sm uppercase rounded 
                shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
                active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                Upload
                </button>
            </div>
        </form>  
    </div>
  )
}
