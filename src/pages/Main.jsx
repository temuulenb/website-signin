import { collection, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  getDocs,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Main() {
  const [sellListings, setSellListings] = useState(null);
  useEffect(() => {
    async function fetchListings(){
        try {
          const listingsRef = collection(db, "listings");
          const q = query(
            listingsRef,
            where("type", "==", "sale"),
            orderBy("timestamp", "desc"),
            limit(3)
          );
          const querySnap = await getDocs(q);
          const listings = [];
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setSellListings(listings);
        } catch (error) {
            console.log(error);
        }
    }
    fetchListings();
  }, []);
  
  const [tradeListings, setTradeListings] = useState(null);
  useEffect(() => {
    async function fetchListings(){
        try {
          const listingsRef = collection(db, "listings");
          const q = query(
            listingsRef,
            where("type", "==", "trade"),
            orderBy("timestamp", "desc"),
            limit(3)
          );
          const querySnap = await getDocs(q);
          const listings = [];
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setTradeListings(listings);
        } catch (error) {
            console.log(error);
        }
    }
    fetchListings();
  }, []);
  
  return (
    <div>
         <div className="max-w-6xl mx-auto pt-4 space-y-6">
            {sellListings && sellListings.length > 0 && (
               <div>
                  <h2 className="px-3 text-xl font-semibold">Items for Sell</h2>
                  <Link to="/category/sale">
                      <p className="px-3 text-sm text-blue-600 hover:text-blue-800 
                      transition duration-150 ease-in-out">
                          Show more items on sell
                      </p>
                  </Link>
                  <ul className="sm:grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {sellListings.map((listing) => (
                      <ListingItem
                        key={listing.id}
                        listing={listing.data}
                        id={listing.id}
                      />
                    ))}
                  </ul>
               </div>
            )}
            {tradeListings && tradeListings.length > 0 && (
               <div>
                  <h2 className="px-3 text-xl font-semibold">Items for Trade</h2>
                  <Link to="/category/trade">
                      <p className="px-3 text-sm text-blue-600 hover:text-blue-800 
                      transition duration-150 ease-in-out">
                          Show more items on trade
                      </p>
                  </Link>
                  <ul className="sm:grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {tradeListings.map((listing) => (
                      <ListingItem
                        key={listing.id}
                        listing={listing.data}
                        id={listing.id}
                      />
                    ))}
                  </ul>
               </div>
            )}
         </div>
    </div>
  );
}
 