'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const page = () => {
   const router = useRouter();
    const [data, setdata] = useState([])        

    const getForms = async () => {
        try {
            const response = await axios.get('https://onlineformserver.onrender.com/simple_form/user/get')
            // const response = await axios.get('http://localhost:5001/simple_form/user/get')
            if(response.data.success){
                setdata(response.data.data)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const deleteUser = async (id) => {
      try {
        const response = await axios.delete(`https://onlineformserver.onrender.com/simple_form/user/delete/${id}`)
        // const response = await axios.delete(`http://localhost:5001/simple_form/user/delete/${id}`)
        if(response.data.success){
          toast('User Deleted')
           getForms()
        }
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }

    useEffect(()=>{
        getForms();
    })

  
 
  return (
    <div>
        <div className='flex justify-end p-2'>
        <Link href={'/'} className='text-xl bg-white text-black p-2'>Log out</Link>
        </div> 
      <h1 className='text-3xl text-center my-3'>Homepage</h1>      

        <div className="p-8 overflow-auto mt-16 h-fit">
  <h2 className="text-2xl mb-4">Form Names</h2>

  <div className="relative overflow-auto">
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full text-white border mb-20">
        <thead>
          <tr className="bg-[#2B4DC994] text-center text-xs md:text-sm font-thin ">
            <th className="p-0 ">
              <span className="block py-2 px-3 border-r border-gray-300">ID</span>
            </th>
            <th className="p-0">
              <span className="block py-2 px-3 border-r border-gray-300">First Name</span>
            </th>
            <th className="p-0">
              <span className="block py-2 px-3 border-r border-gray-300">Last Name</span>
            </th>
            <th className="p-0">
              <span className="block py-2 px-3 border-r border-gray-300">Phone</span>
            </th>
            <th className="p-0">
              <span className="block py-2 px-3 border-r border-gray-300">Email</span>
            </th>
            <th className="p-0">
              <span className="block py-2 px-3 border-r border-gray-300">Images</span>
            </th>
            <th className="p-4 text-xs md:text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          
            {data?.map((info, idx)=>
             <tr key={info._id} className="border-b text-xs md:text-sm text-center text-white">
             <td className="p-2 md:p-4">{idx + 1}</td>
             <td className="p-2 md:p-4 flex items-center gap-3">
                <img src={info.image} alt={info.image.split('images')[1]} className='w-16 h-12 rounded-full'/>
                <p className='capitalize'>{info.firstname}</p>
            </td>
          
             <td className="p-2 md:p-4 capitalize">{info.lastname}</td>
             <td className="p-2 md:p-4">{info.phone}</td>
             <td className="p-2 md:p-4">{info.email}</td>
             <td className="p-2 md:p-4">
             {
                info.postimages.length > 0 && info.postimages.map(({url, public_id}, idx)=> <div key={idx} className='flex items-center gap-2'>
                  <img src={url} alt={public_id} className='w-16 h-12 rounded-full'/>
                </div>)
              }
             </td>
          
             <td className="relative p-2 md:p-4 flex justify-center space-x-2">
               <button                
               onClick={()=> {
                router.push('/register', {state: {  
                  id: info._id,            
                  firstname: info.firstname,
                  lastname: info.lastname,
                  phone: info.phone,
                  email: info.email,
                  image: ''                         
                 }})
                 }}
               className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs md:text-sm">Edit</button>
               {/* <button 
               onClick={()=> {
                setFormData({             
                firstname: info.firstname,
                lastname: info.lastname,
                phone: info.phone,
                email: info.email,
                image: ''                         
               }); setEditID(info._id)}}
               className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs md:text-sm">Edit</button> */}
               <button 
               onClick={()=> deleteUser(info._id)}
               className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm">Delete</button>
             </td>
           </tr>
            )}          
         
        </tbody>
      </table>
    </div>
  </div>
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
