
import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import MyBookings from "./MyBookings.jsx";
import Profile from "./Profile.jsx";
import useGetProfile from '../../hooks/useFetchData.jsx';
import { BASE_URL } from "../../../config.js";
import Loading from '../../components/Loader/Loading.jsx';
import Error from "../../components/Error/Error.jsx";
// import { useEffect } from "react";

const MyAccount = () => {

  const {dispatch}= useContext(authContext);

  const navigate =useNavigate();

  const [tab,setTab]=useState('bookings');
  
  const userObjectString = sessionStorage.getItem('user');
  const userObject = JSON.parse(userObjectString);
  const userId = userObject._id;
  console.log(userId);

  const {
    data,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile`, userId);

  //  useGetProfile(`http://localhost:5000/api/v1/users/profile/me`)
  console.log(data,'userdata')
  
  const handleLogout = () =>{
    dispatch({ type:"LOGOUT" });
    navigate('/login')
  };

  return (
    <section>
    <div className="max-w-[1170px] px-5 mx-auto">
    {loading && !error && <Loading/>}
    {error && <Error errMessage={error} />}

    {!loading &&(<div className="grid md:grid-cols-3 gap-10">
        <div className="pb-[50px] px-[30px] rounded-md">    
          <div className="flex  item-center justify-center ">
            <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
              <img 
                src={data.photo}
                alt="" 
                className="w-full h-full rounded-full"
              />
            </figure>
          </div>
          
          <div className="text-center mt-4">
            <h3 className="text-[17px] leading-[30px] text-headingColor font-bold">
                   {data.name}
            </h3>
            <p className="text-textColor text-[15px] leading-6 font-medium"> 
                  {data.email}
            </p>
            <p className="text-textColor text-[15px] leading-6 font-medium"> 
                    Blood Type : 
              <span className="ml-2 text-headingColor text-[22px] leading-8">
                  {data.bloodType}
              </span>
            </p>
          </div>

          <div className="mt-[50px] md:mt-[100px] ">
            <button onClick={handleLogout} className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white" >Logout</button>
            <button className="w-full bg-red-600 p-3 mt-4 text-[16px] leading-7 rounded-md text-white " >Delete account</button>
          </div>

        </div>      

        <div className="md:col-span-2 md:px-[30px]">
          <div>
            <button onClick={()=> setTab('bookings')}    
            className={`${
              tab==='bookings' && 'bg-primaryColor text-white font-normal'} p-2 mr-5  px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
            My Bookings
            </button>

            <button onClick={()=> setTab('settings')} 
            className={` ${
              tab==='settings' && 'bg-primaryColor text-white font-normal'} p-2  px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
            Profile Settings
            </button>

          </div>

            {
              tab ==='bookings' && <MyBookings/>
            }
            {
              tab ==='settings' && <Profile user={data} />
            } 
            
        </div>
      </div>)}

    </div>
    </section>
  );
};

export default MyAccount;