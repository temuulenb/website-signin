import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.png"


export default function Header() {
    const [pageState, setPageState] = useState("Sign In");
    const [pageState1, setPageState1] = useState("");
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
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setPageState1("Main");  
            }else{
                setPageState1("");
            }
        });
    }, [auth]);
    
    function pathMatchRoute(route) {
      if(route === location.pathname) {
        return true;
      };
    } 
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
            <div>
                <img src={logo} 
                className="w-[165px] h-[45px] cursor-pointer object-cover" 
                onClick={() => navigate("/")}/>
            </div>
            <div>
                <ul className="flex space-x-10">
                    <li className=
                        {`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                        ${(pathMatchRoute("") || pathMatchRoute("/main")) && "text-black border-b-red-700"}`}
                        onClick={() => navigate("/main")}
                        >{pageState1}
                    </li>
                    <li className=
                        {`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                        ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile"))  && "text-black border-b-red-700"}`}
                        onClick={() => navigate("/profile")}
                        >{pageState}
                    </li>
                </ul>
            </div>
        </header>
    </div>
  )
}
