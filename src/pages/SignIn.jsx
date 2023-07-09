import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/main");
      }
    } catch (error) {
        toast.error("Something is wrong");
    }
  }
  return (
    <section>
        <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
            <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                <img src="https://images.unsplash.com/photo-1610366996539-be33ac477245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=866&q=80" 
                alt="key" className="w-full mt-5 rounded-xl" />
            </div>
            <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                <form onSubmit={onSubmit}>
                    <input 
                    className="mb-6 w-full px-4 py-1 text-s text-gray-700 bg-white 
                    border-gray-300 rounded transition ease-in-out"                    
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={onChange} 
                    placeholder="Email address"/>
                    <div className="relative mb-6">
                        <input 
                        className="w-full px-4 py-1 text-s text-gray-700 bg-white 
                        border-gray-300 rounded transition ease-in-out"
                        type={showPassword ? "text" : "password"} 
                        id="password" 
                        value={password} 
                        onChange={onChange} 
                        placeholder="Password"/>
                        {showPassword ? ( 
                            <AiFillEyeInvisible className="absolute right-3 top-2 
                            text-l cursor-pointer" 
                            onClick={() => setShowPassword
                            ((prevState)  => !prevState)}
                           /> 
                        ) : (
                            <AiFillEye className="absolute right-3 top-2 
                            text-l cursor-pointer"
                            onClick={() => setShowPassword
                            ((prevState)  => !prevState)}
                            /> 
                        )}  
                    </div>
                    <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                        <p className="mb-6">
                          Don't have an account?
                          <Link to="/sign-up" className="text-red-500
                          hover:text-red-800 transition duration-200 ease-in-out ml-1">Register</Link>
                        </p>
                        <p>
                          <Link to="/forgot-password"
                          className="text-blue-500
                          hover:text-blue-900 transition duration-200 ease-in-out">Forgot password?</Link>
                        </p>
                    </div>
                    <button className="w-full bg-blue-600 text-white px-5 py-2 text-sm font-medium
                    uppercase rounded shadow-lg hover:bg-blue-800 transition duration-150 ease-in-out 
                    hover:shadow-lg active:bg-blue-900" 
                    type="submit">Sign In</button>
                    <div className="flex my-4 items-center 
                    before:border-t before:flex-1 before:border-gray-400
                    after:border-t after:flex-1 after:border-gray-400">
                        <p className="text-center font-semibold mx-4">
                          OR
                        </p>
                    </div>
                    <OAuth></OAuth>
                </form>
            </div>
        </div>
    </section>
  )
}
