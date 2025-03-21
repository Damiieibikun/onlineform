'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const page = () => {
    const router = useRouter();
    const data = router.location?.state;

    const [otp, setOtp] = useState('');
    const [showOtpField, setShowOtpField] = useState(false);

    const [error, setError] = useState('')
    const [edit_id, setEditID] = useState('')
    const [formData, setFormData] = useState({
        firstname: "",
      lastname: "",
      phone: "",
      email: "",
      image: "",      
      postimages: [],
      password: ''
  
      
  });


  
    const handleInput = (e)=>{
        const{name, value} = e.target;
        setFormData((prev)=> ({...prev, [name]: value}))
    }
  
    const handleImagesInput = (e) => {
      const files = Array.from(e.target.files); // Convert FileList to an array
      setFormData((prev) => ({
          ...prev,
          postimages: [...prev.postimages, ...files] // Append new files
      }));
    };
  
    const removeImage = (index)=>{
      setFormData((prev)=>({
        ...prev,
        postimages: prev.postimages.filter((img, idx) => idx !== index)
        }))
    }
   
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!formData.firstname || !formData.lastname || !formData.email || !formData.phone) {
            setError('Fill all fields!')
            toast.error('Error')
            return
        }
  
        const data = new FormData()
        
        data.append('firstname', formData.firstname)
        data.append('lastname', formData.lastname)
        data.append('phone', formData.phone)
        data.append('email', formData.email)
        data.append('password', formData.password)
        if (formData.image) {
          data.append('image', formData.image);
        }
   
        if(formData.postimages.length > 0){
          formData.postimages.forEach((image) => {
            data.append('postimages', image);
          })
    
        }       
  
        // api call
        if(edit_id){
          try {
            const response = await axios.put(`http://localhost:5001/simple_form/user/edit/${edit_id}`, data, {
              headers: {
                  'Content-Type': 'multipart/form-data', // Set the correct Content-Type
              },
          });
              if(response.data.success){
                  toast('Form edited')
                  setFormData({
                      firstname: "",
                    lastname: "",
                    phone: "",
                    email: "",
                    image: ""
                    
                });
  
              
  
                setTimeout(() => {
                    router.push('/Homepage')
                  getForms()
                }, 1000);
              }
          } catch (error) {
              console.log(error)
              console.log(error.response.data)
              toast.error(error.response.data.message)
          }
        }
        else{
          try {
            const response = await axios.post('http://localhost:5001/simple_form/user/post', data, {
              headers: {
                  'Content-Type': 'multipart/form-data', // Set the correct Content-Type
              },
          });

          if(response.data.message.includes("OTP sent")){
            setShowOtpField(true);
            toast.success(response.data.message);
          }
              // if(response.data.success){
              //     toast('Form Sent')
              //     setFormData({
              //         firstname: "",
              //       lastname: "",
              //       phone: "",
              //       email: "",
              //       image: ""
                    
              //   });
  
              //   console.log(response.data.data)
  
              //   setTimeout(() => {
              //       router.push('/')
              //   }, 1000);
              // }
          } catch (error) {
              console.log(error)
              console.log(error.response.data)
              toast.error(error.response.data.message)
          }
        }
     
        
    }

    const handleOTPSubmit = async () => {
      try {
          const response = await axios.post('http://localhost:5001/simple_form/user/verify-otp', { email: formData.email, otp });
  
          if (response.data.message.includes("verified")) {
              toast.success("Registration complete! You can now log in.");

                  setFormData({
                      firstname: "",
                    lastname: "",
                    phone: "",
                    email: "",
                    image: ""
                    
                });
  
               
  
                setTimeout(() => {
                    router.push('/')
                }, 1000);
              }
          
      } catch (error) {
          toast.error(error.response.data.message);
      }
  };
  return (
    <div>
     <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        Send Form
    </div>
    <form className="py-4 px-6" onSubmit={handleSubmit}>
        {error && <h1 className='text-sm text-red-600 font-bold'>*{error}</h1>}
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="fname">
                First Name
            </label>
            <input
            onChange={handleInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fname" type="text" name= 'firstname' value={formData.firstname} placeholder="Enter your first name"/>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="lname">
                Last Name
            </label>
            <input
             onChange={handleInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lname" type="text"  name= 'lastname' value={formData.lastname} placeholder="Enter your last name"/>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input
             onChange={handleInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email" type="email"  name= 'email' value={formData.email} placeholder="Enter your email"/>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                Phone Number
            </label>
            <input
             onChange={handleInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone" type="tel"  name= 'phone' value={formData.phone} placeholder="Enter your phone number"/>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
               image
            </label>
            <input
             onChange={(e)=>setFormData({...formData, image: e.target.files[0]})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image" type="file"  name= 'image' placeholder="Enter your phone number"/>
        </div>
      
        <div className="mb-4">
        {formData.postimages?.map((file, idx) => (
         <div key={idx} className="relative w-32 h-32 overflow-hidden rounded-lg border">
         <img
           src={URL.createObjectURL(file)}
           alt={`Selected Preview ${idx}`}
           className="w-full h-full object-cover"
         />
          <button
            onClick={() => removeImage(idx)}
            type="button"
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm shadow-md transition-transform transform hover:scale-110"
          >
            ×
          </button>
        </div>
      ))}
            <label className="block text-gray-700 font-bold mb-2" htmlFor="postimages">
               Images
            </label>
            <input
           onChange={handleImagesInput}
           type="file"
           name="postimages"
           id="postimages"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
        </div> 
       
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
               Password
            </label>
            <input
             onChange={handleInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password" type="text"  name= 'password' value={formData.password} placeholder="Enter your Password"/>
        </div>

        {showOtpField ? (
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="otp">
            Enter OTP
        </label>
        <input
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3"
            placeholder="Enter OTP"
        />
        <button onClick={handleOTPSubmit} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
            Verify OTP
        </button>
    </div>
) : (
  <div className="flex items-center justify-center mb-4">
    <button type="submit" className="bg-gray-900 text-white py-2 px-4 rounded">
        Register
    </button>
  </div>
)}

      
        {/* <div className="flex items-center justify-center mb-4">
            <button
                className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                >
                Submit
            </button>
        </div> */}

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
  )
}

export default page
