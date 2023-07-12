import { getAuth, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { updateDoc, doc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import ListingItem from '../components/ListingItem';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
  });
  const { name, email } = formData;
  function onLogout() {
      auth.signOut();
      navigate("/");
  }
  function onChange(e) {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
      }));
  }
  async function onSubmit() {
      try {
          if(auth.currentUser.displayName !== name){
              await updateProfile(auth.currentUser, {
                displayName:name,
              });
              const docRef = doc(db, "users", auth.currentUser.uid);
              await updateDoc(docRef, {
                  name,
              });
          }
          toast.success("Profile updated!")
      } catch (error) {
          toast.error("Can not update profile!");
      }
  }
  useEffect(() => {
        async function fetchUserListings() {
            const listingRef = collection(db, "listings");
            const q = query(listingRef, where("userRef", "==", auth.currentUser.uid), 
            orderBy("timestamp", "desc")
            );
            const querySnap = await getDocs(q);
            let listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setListings(listings);
            setLoading(false);
        }
        fetchUserListings();
  }, [auth.currentUser.uid]);
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
                      disabled={!changeDetail}
                      onChange={onChange}
                      className={`w-[65%] ml-14 px-4 py-1 text-md text-black bg-white border border-gray-300
                      rounded transition ease-in-out mb-5 ${changeDetail && "bg-red-200 focus:bg-red-200"}`}/>

                      { /* email input */ } 
                      <input 
                      type='email' 
                      id='email' 
                      value={email}
                      disabled
                      className="w-[65%] ml-14 px-4 py-1 text-md text-black bg-white border border-gray-300
                      rounded transition ease-in-out mb-1"/>

                      <div className="flex whitespace-nowrap text-sm sm:text-md mb-10 ml-14">
                          <p className="flex items-center">Do you want to make changes?
                            <span 
                            onClick={() => {
                              changeDetail && onSubmit();
                              setChangeDetail((prevState) => !prevState);
                            }}
                            className="ml-2 text-red-600 hover:text-red-800 transition 
                            ease-in-out duration-200 cursor-pointer">
                            {changeDetail ? "Apply change" : "Edit"}
                            </span>
                          </p>
                      </div>
                      <button 
                      onClick={onLogout} 
                      className="bg-blue-600 text-white px-3 py-1 ml-52 text-sm font-medium
                      rounded shadow-lg hover:bg-blue-800 transition duration-150 ease-in-out 
                      hover:shadow-lg active:bg-blue-900">Sign Out</button>
                </form>
                <button type='submit' className='ml-32 mt-5 bg-blue-200 text-black uppercase px-5 py-2
                    text-sm font-bold rounded shadow-md hover:bg-blue-400 transition duration ease-in-out hover:shadow-lg
                    active:bg-blue-500'>
                        <Link to="/create-listing" className='flex justify-center'>
                            Make New announcement
                        </Link>  
                </button>
            </div>
        </section>
        <div className="mt-8 px-6">
            {!loading && listings.length > 0 && (
                <>
                    <h2 className="text-l mb-8 mr-16 text-center font-semibold">My announcements</h2>
                    <ul className="sm:grid sm:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
                    mb-6 mt-16">
                        {listings.map((listing) => (
                            <ListingItem 
                            key={listing.id} 
                            id={listing.id} 
                            listing={listing.data}/>
                        ))}
                    </ul>
                </>
            )}
        </div>
    </div>
  );
}
