'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function Home() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({   
    email: "",
   password: ""
    
});

  const handleInput = (e)=>{
      const{name, value} = e.target;
      setLoginData((prev)=> ({...prev, [name]: value}))
  }

 
  const handleSubmit = async(e)=>{
      e.preventDefault()
   try {
    const response = await axios.post('http://localhost:5001/simple_form/user/login', loginData);
    if(response.data.success){
      toast('Logging in...')
      setTimeout(() => {
        router.push('/Homepage')  
    }, 1000);
    }
 
   } catch (error) {
    console.log(error)                
    toast.error(error.response.data.message)
   }      
  }

  return (
    <div>
     <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        Log In
    </div>
    <form className="py-4 px-6" onSubmit={handleSubmit}>
  
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input
             onChange={handleInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email" type="email"  name= 'email' value={loginData.email} placeholder="Enter your email"/>
        </div>  
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input
             onChange={handleInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password" type="text"  name= 'password' value={loginData.password} placeholder="Enter your Password"/>
        </div>  
      
      
       
        
      
        <div className="flex items-center justify-center mb-4">
            <button
                className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                >
                Submit
            </button>
        </div>

    </form>
        </div>

            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
            />
    </div>
  );
}
