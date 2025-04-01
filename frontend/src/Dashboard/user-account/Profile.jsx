// import React from 'react'
// import avatar from "../assets/images/doctor-img01.png"
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'

import uploadImageToCloudinary from '../../utils/uploadCloudinary.js';

import {BASE_URL} from "../../../config.js";
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'

const Profile = ({user}) => {

  const { _id, name, email, photo, gender, bloodType } = user;

  const [selectedFile,setSelectedFile]=useState(null);
  
  const [loading,setLoading] = useState(false);
  const [tab,setTab]=useState('settings');

  const [formData, setFormData] =useState({
    name:'',
    email:'',
    password: '',
    photo:null,
    gender:'',
    bloodType:'',

  });

  const navigate = useNavigate()

  useEffect(()=>{
    setFormData({ 
      name, 
      email, 
      photo, 
      gender,
      bloodType
    });
  }, [user]);


  const handleInputChange = e=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  // const  handleFileInputChange = async (event)=>{
  //   const file = event.target.files[0];
  //   console.log(file)
  //   const data = await uploadImageToCloudinary(file)

  //   setSelectedFile(data.url)
  //   setFormData({...formData,photo:data.url})

  // }
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
  
    // Update selected file state with the file object
    setSelectedFile(file);
  
    // Optionally, you can also update other states with the file URL
    if (file) {
      const data = await uploadImageToCloudinary(file);
      setFormData({ ...formData, photo: data.url });
    }
  };
  
  const submitHandler = async event=>{
    // console.log(formData)
    event.preventDefault();

    setLoading(true)
    console.log(user);
    console.log(_id);

    try {
      const res= await fetch(`${BASE_URL}/users/${user._id}`,{
        method:'put',
        headers:{
          'Content-Type':"application/json",
          //  Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(formData)

      })

      const  {message}= await res.json();

      if(!res.ok){
        throw new Error(message)
      }
      
      setLoading(false);
      setTab('bookings');
      toast.success(message);
      navigate('/users/profile/me');

    } catch (err) {
      toast.error(err.message)
      setLoading(false)
    }
  }


  return <div className='mt-10'>
<form action="" onSubmit={submitHandler} >

<div className="mb-5">
  <input 
  type="text" 
  placeholder="Full Name" 
  name="name" 
  value={formData.name}
  onChange={handleInputChange}
  className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[17px] 
  text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer "
  required
  />
</div>

<div className="mb-5">
  <input 
  type="email" 
  placeholder="Enter your email" 
  name="email" 
  value={formData.email}
  onChange={handleInputChange}
  className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[17px] 
  text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer "
  aria-readonly
  readOnly
  />
</div>

<div className="mb-5">
  <input 
  type="password" 
  placeholder="Password" 
  name="password" 
  value={formData.password}
  onChange={handleInputChange}
  className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[17px] 
  text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer "
 
  />
</div>
<div className="mb-5">
  <input 
  type="text" 
  placeholder="Blood Type" 
  name="bloodType" 
  value={formData.bloodType}
  onChange={handleInputChange}
  className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[17px] 
  text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer "
  required
  />
</div>

<div className='mb-5 flex items-center justify-between'>

  <label htmlFor="" 
  className='text-headingColor font-bold text-[16px] leading-7'>
  Gender:
    <select name="gender" 
   
    value={formData.gender}
    onChange={handleInputChange}
    className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3
    focus:outline-none' >
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>

    </select>
  </label>
  
</div>

<div className='mb-5 flex items-center gap-3'>
  
  { formData.photo && (
    <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
    flex items-center justify-center'  >
      <img src={formData.photo} alt="" className='w-full rounded-full'/>
    </figure>
  )}

  {/* <div className='relative w-[130px] h-[50px]'>
    <input 
      type="file"
      name='photo'
      id="custonFile"
      accept='.jpg, .png'
      // className='absolute top-0 left-0 w-full opacity-0 cursor-pointer'
      className='bg-[#0066ff46] '
      onChange={handleFileInputChange}
    />

  
    <label 
    htmlFor="customFile" 
    className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 
    overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer text-center'>
      {selectedFile ? selectedFile.name:'Upload Photo'}
    </label>
  </div> */}
<div className='relative w-[130px] h-[50px]'>
  <input 
    type="file"
    name='photo'
    id="customFile"
    accept='.jpg, .png'
    className='absolute top-0 left-0 w-full opacity-0 cursor-pointer'
    onChange={handleFileInputChange}
  />

  <label 
    htmlFor="customFile" 
    className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 
    overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer text-center'
  >
    {selectedFile ? selectedFile.name : 'Upload Photo'}
  </label>
</div>

</div>

  <div className="mt-7">

    <button 
    disabled={loading && true}
    type="submit" 
    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
    { loading ? <HashLoader size={35} color="#ffffff" />:'Update'}
   </button>

  </div>
  
<div/>
</form>
</div>

}

export default Profile