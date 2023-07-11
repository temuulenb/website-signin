import userEvent from "@testing-library/user-event";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
export default function Header() {
    const [pageState, setPageState] = useState("Sign In");
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setPageState("Profile");  
            }else{
                setPageState("Sign In");
            }
        });
    }, [auth]);
    function pathMatchRoute(route) {
      if(route === location.pathname) {
        return true;
      }
    } 
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
            <div>
                <img src="http://4.bp.blogspot.com/-ZPl4clUvLsA/UPwyQIRAGDI/AAAAAAAAAns/crAkDbf6FQs/s320/adelphi+university+logo.jpg" 
                alt="logo" className="h-12 cursor-pointer" 
                onClick={() => navigate("/")}/>
            </div>
            <div>
                <ul className="flex space-x-10">
                    <li className=
                    {`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                    ${pathMatchRoute("/") && "text-black border-b-red-600"}`}
                    onClick={() => navigate("/")}
                    >Home
                    </li>
                    <li className=
                    {`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                    ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile"))  && "text-black border-b-red-600"}`}
                    onClick={() => navigate("/profile")}
                    >{pageState}
                    </li>
                </ul>
            </div>
        </header>
    </div>
  )
}
