/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import {AiOutlineDelete} from 'react-icons/ai';
import uploadImageToCloudinary from '../../utils/uploadCloudinary.js';
import {BASE_URL,token} from './../../../config.js';
import {toast} from 'react-toastify';

const Profile = ({doctorData}) => {
  const [FormData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    phone: '',
    bio:'',
    gender:'',
    specialization:'',
    ticketPrice: 0,
    qualifications:[],
    experiences:[],
    timeSlots:[],
    about:'',
    photo:null,
  });

  useEffect(()=>{
    setFormData({
      name:doctorData?.name,
      email:doctorData?.email,
      phone:doctorData?.phone,
      bio:doctorData?.bio,
      gender:doctorData?.gender,
      specialization:doctorData?.specialization,
      ticketPrice:doctorData?.ticketPrice,
      qualifications:doctorData?.qualifications,
      experiences:doctorData?.experiences,
      timeSlots:doctorData?.timeSlots,
      about:doctorData?.about,
      photo:doctorData?.photo,
    })
  },[doctorData]);

  const handleInputChange = e => {    
    setFormData({...FormData, [e.target.name]:e.target.value})
  };

  const handleFileInputChange = async event => {
    const file = event.target.files[0]    
    const data = await uploadImageToCloudinary(file)

    // console.log(data);
    setFormData({...FormData, photo:data?.url})

  }

  const updateProfileHandler = async e =>{
    e.preventDefault();

    try {
      const res =await fetch(`${BASE_URL}/doctors/${doctorData._id}`,{
        method:'PUT',
        headers:{
          'content-type':'application/json',
        },
        body : JSON.stringify(FormData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success(result.message);

    } catch (err) {
      toast.error(err.message);      
    }
  }

  // reuseable fun for adding items
  const addItem =(key,item)=>{
    setFormData(prevFormData => ({...prevFormData,[key]:[...prevFormData[key], item]}))
  }
  // reuseable input change function
  // const handleReusableInputChangeFunc = (key,index,event)=>{
  //   const {name, value} = event.target;

  //   setFormData(prevFormData => {
  //     const updateItems = [...prevFormData[key]]

  //     updateItems[index][name] = value
      
  //     return{
  //       ...prevFormData,
  //       [key]:updateItems,
  //     }
  //   })
  // }
  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
  
    setFormData(prevFormData => {
      const updatedItems = [...prevFormData[key]]; // Make a copy of the array
  
      // Make sure the index exists in the array
      if (index >= 0 && index < updatedItems.length) {
        updatedItems[index][name] = value; // Update the specific item at index
      }
  
      return {
        ...prevFormData,
        [key]: updatedItems, // Update the state with the modified array
      };
    });
  };
  
  // reusable fun for deleting item
  const deleteItem = (key,index) => {
    setFormData(prevFormData => ({
      ...prevFormData, 
      [key]:prevFormData[key].filter((_,i)=> i!==index),
    }));
  };

  // for handling addQualifications
  const addQualifications = e =>{
    e.preventDefault()

    addItem('qualifications',{
      startingDate:'',
      endingDate:'',
      degree:'mbbs',
      university:'aiims'
    })

  }
  const handleQualificationChange = (event,index)=>{
    handleReusableInputChangeFunc('qualifications',index,event)
  }
  const deleteQualification = (e,index)=>{
    e.preventDefault()
    deleteItem('qualifications', index)
  }

  // for handling experiences
  const addExperiences = e =>{
    e.preventDefault()

    addItem('experiences',{
      startingDate:'',
      endingDate:'',
      position:'Senior Surgeon',
      hospital:'zp',
    })

  }
  const handleExperiencesChange = (event,index)=>{
    handleReusableInputChangeFunc('experiences',index,event)
  }
  const deleteExperiences = (e,index)=>{
    e.preventDefault()
    deleteItem('experiences', index)
  }

  // for handling timeSlots
  const addTimeSlot= e =>{
    e.preventDefault()

    addItem('timeSlots',{
      day:'', 
      startingTime:'10:00', 
      endingTime:'04:30' ,
    })
  }
  const handleTimeSlotChange = (event,index)=>{
    handleReusableInputChangeFunc('timeSlots',index,event)
  }
  const deleteTimeSlot = (e,index)=>{
    e.preventDefault()
    deleteItem('timeSlots', index)
  }


  return (
    <div>
      <h2 className='text-headingColor font-bold text-[24px] leading-9 mb-10'>
        Profile Information
      </h2>
      <form action="">
        {/* name */}
        <div className='mb-5'>
          <p className='form_label'>Name*</p>
          <input 
          type="text" 
          name="name" 
          value={FormData.name} 
          onChange={handleInputChange}  
          placeholder="Full Name" 
          className="form_input"/>
        </div>
        {/* email */}
        <div className='mb-5'>
          <p className='form_label'>Email*</p>
          <input 
          type="email" 
          name="email" 
          value={FormData.email} 
          // onChange={handleInputChange}  
          placeholder="Email" 
          className="form_input"
          readOnly
          aria-readonly
          disabled={true}
          />
          
        </div>
        {/* phone */}
        <div className='mb-5'>
          <p className='form_label'>Phone*</p>
          <input 
          type="number" 
          name="phone" 
          value={FormData.phone} 
          onChange={handleInputChange}  
          placeholder="Phone number" 
          className="form_input"
          />
          
        </div>
        {/* bio */}
        <div className='mb-5'>
          <p className='form_label'>Bio*</p>
          <input 
          type="text" 
          name="bio" 
          value={FormData.bio} 
          onChange={handleInputChange}  
          placeholder="Bio" 
          className="form_input"
          maxLength={100}
          />
          
        </div>
        {/* gender,specilization & ticket*/}
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
                <p className="form_label">Gender*</p>
                <select 
                name="gender"
                value={FormData.gender}
                onChange={handleInputChange}
                className="form_input py-3.5"
                >
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
            </div>         

             <div>
                <p className="form_label">Specialization*</p>
                <select 
                name="specialization"
                value={FormData.specialization}
                onChange={handleInputChange}
                className="form_input py-3.5"
                >
                  <option value="">Select</option>
                  <option value="surgeon">Surgeon</option>
                  <option value="neurologist">Neurologist</option>
                  <option value="dermatologist">Dermatologist</option>
                </select>
             </div>   

            <div>
              <p className="form_label">Fees*</p>
              <input 
              type="number"
              // placeholder="350" 
              name="ticketPrice" 
              value={FormData.ticketPrice}
              onChange={handleInputChange}
              className="form_input"/>
            </div> 
            
          </div>
        </div>
        {/* qualifications */}
        <div className="mb-5">
          <p className="form_label">Qualifications*</p>
          {FormData.qualifications?.map((item,index)=> <div key={index}>
            <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Starting Date*</p>
                    <input 
                    type="date" 
                    name="startingDate" 
                    value={item.startingDate} 
                    className="form_input" 
                    onChange={e => handleQualificationChange(e,index)}
                    />
                  </div>

                  <div>
                    <p className="form_label">Ending Date*</p>
                    <input 
                    type="date" 
                    name="endingDate" 
                    value={item.endingDate} 
                    className="form_input"
                    onChange={e => handleQualificationChange(e,index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form_label">Degree*</p>
                    <input 
                    type="text" 
                    name="degree" 
                    value={item.degree} 
                    className="form_input"
                    onChange={e => handleQualificationChange(e,index)}

                    />
                  </div>

                  <div>
                    <p className="form_label">University*</p>
                    <input 
                    type="text" 
                    name="university" 
                    value={item.university} 
                    className="form_input" 
                    onChange={e => handleQualificationChange(e,index)}

                    />
                  </div>
                </div>
                
                <button onClick={e=>deleteQualification(e,index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                  <AiOutlineDelete></AiOutlineDelete>
                </button>
            </div>
          </div>)}

          <button onClick={addQualifications} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Add Qualification</button>
        </div>
        {/* experiences */}
        <div className="mb-5">
          <p className="form_label">Experiences*</p>
          {FormData.experiences?.map((item,index)=> <div key={index}>
            <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Starting Date*</p>
                    <input 
                    type="date" 
                    name="startingDate" 
                    value={item.startingDate} 
                    className="form_input" 
                    onChange={e=>handleExperiencesChange(e,index)}
                    />
                  </div>

                  <div>
                    <p className="form_label">Ending Date*</p>
                    <input 
                    type="date" 
                    name="endingDate" 
                    value={item.endingDate} 
                    className="form_input"
                    onChange={e=>handleExperiencesChange(e,index)}

                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form_label">Position*</p>
                    <input 
                    type="text" 
                    name="position" 
                    value={item.position} 
                    className="form_input"
                    onChange={e=>handleExperiencesChange(e,index)}

                    />
                  </div>

                  <div>
                    <p className="form_label">Hospital*</p>
                    <input 
                    type="text" 
                    name="hospital" 
                    value={item.hospital} 
                    className="form_input" 
                    onChange={e=>handleExperiencesChange(e,index)}
                    />
                  </div>
                </div>
                
                <button onClick={e=>deleteExperiences(e,index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                  <AiOutlineDelete></AiOutlineDelete>
                </button>
            </div>
          </div>)}

          <button onClick={addExperiences} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Add Experience</button>
        </div>
        {/* TimeSlots */}
        <div className="mb-5">
          <p className="form_label">Time Slots</p>
            {FormData.timeSlots?.map((item,index)=> <div key={index}>
              <div>
                  <div className="grid grid-cols-4 md-grid-cols-3 mb-[30px]  gap-5">
                    <div>
                      <p className="form_label">Day*</p>
                      <select 
                        name="day" 
                        value={item.day} 
                        className="form_input py-3.5"
                        onChange={e=>handleTimeSlotChange(e,index)}
                      >
                          <option value="">Select</option>
                          <option value="saturday">Saturday</option>
                          <option value="sunday">Sunday</option>
                          <option value="monday">Monday</option>
                          <option value="tuesday">Tuesday</option>
                          <option value="wednesday">Wednesday</option>
                          <option value="thursday">Thursday</option>
                          <option value="friday">Friday</option>
                      </select>
                    </div>

                    <div>
                      <p className="form_label">Starting Time*</p>
                      <input 
                      type="time" 
                      name="startingTime" 
                      value={item.startingTime} 
                      className="form_input" 
                      onChange={e=>handleTimeSlotChange(e,index)}

                      />
                    </div>

                    <div>
                      <p className="form_label">Ending Time*</p>
                      <input 
                      type="time" 
                      name="endingTime" 
                      value={item.endingTime} 
                      className="form_input" 
                      onChange={e=>handleTimeSlotChange(e,index)}
                      />
                    </div>

                    <div className="flex item-center pt-[35px]  pb-[30px] ">                      
                     <button onClick={e=>deleteTimeSlot(e,index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 cursor-pointer">
                      <AiOutlineDelete></AiOutlineDelete>
                     </button> 
                    </div>    

                  </div>

               </div>
            </div>
            )}

          <button onClick={addTimeSlot} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Add TimeSlots</button>
        </div>
        {/* about */}
        <div className="mb-5">
          <p className="form_label">About*</p>
          <textarea name="about" id="" cols="30" rows="5" value={FormData.about} placeholder="Write about you " className="form_input" onChange={handleInputChange}></textarea>
        </div>
        {/* profile photo */}
        <div className="mb-5 flex item-center gap-3">
              
              {FormData.photo && (
                <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
                flex items-center justify-center'  >
                  <img src={FormData.photo} alt="" className='w-full rounded-full'/>
                </figure>
              )}
              
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
                  {FormData.photo ? FormData.photo : 'Upload Photo'}
                </label>
            </div>
        </div>

        <div className="mt-7">
          <button type="submit" onClick={updateProfileHandler} className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  )
};

export default Profile