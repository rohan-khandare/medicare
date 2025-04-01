import  { useState } from 'react';
// import doctorImg from '../../assets/images/doctor-img02.png';
import starIcon from '../../assets/images/star.png';
import DocterAbout from './DocterAbout';
import Feedback from './Feedback';
import SidePanel from './SidePanel';

import { BASE_URL } from '../../../config.js';
// import useFetchData from '../../hooks/useFetchData.jsx';
import Loader from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';
import { useParams } from 'react-router-dom';
import useFetchD from '../../hooks/useFetchD.jsx';
import { data } from 'autoprefixer';

const DocterDetails = () => {

  const [tab,setTab]=useState('about');
  const {id}= useParams()

  const {
    data:doctor,
    loading,
    error,
  }=useFetchD(`${BASE_URL}/doctors/${id}`);
 
  const {
    name,
    averageRating,
    totalRating,
    photo,
    specialization,
    experiences,
    bio,
    about,
    qualifications,
    reviews,
    ticketPrice,
    timeSlots,
  } = doctor;
  console.log(qualifications);

  return( 
  <section>
    <div className="max-w-[1170px] px-5 mx-auto">
      {loading && <Loader/>}
      {error && <Error/>}
      {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
                <div className="flex item-center gap-5">
                    <figure className="max-w-[200px] max-h-[200px]">
                      <img src={photo} className='w-full' alt="" />
                    </figure>

                    <div>
                      <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold ronded">
                          {specialization}
                      </span>
                      <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                          {name}
                      </h3>
                      <div className="flex item-center gap-[6px] ">
                        <span className="flex items-center gap-[6px] text[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                          <img src={starIcon} alt="" /> 
                          {averageRating}
                        </span>
                        <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-textColor font-[400]">
                          ({totalRating})
                        </span>

                      </div>

                        <p className="text_para text-[14px] lea md:text-[15px] lg:max-w-[390px] ">
                          {bio}
                        </p>

                    </div>
                </div>

                <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                      <button className={`${tab==='about' && 'border-[2px] border-solid border-primaryColor'}py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor`}
                      onClick={()=>setTab('about')}>
                      About</button>
                      <button className={`${tab==='feedback' && 'border-[2px] border-solid border-primaryColor'}py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor`}
                      onClick={()=>setTab('feedback')}>
                      Feedback</button>
                </div>

                <div className="mt-[50px]">
                  {
                    tab==='about' && <DocterAbout name={name} about={about} qualifications={qualifications} experiences={experiences}></DocterAbout>
                  }
                  {
                    tab==='feedback' && <Feedback reviews={reviews} totalRating={totalRating}></Feedback>
                  }

                </div>

            </div>
            <div>
              <SidePanel 
                doctorId={doctor._id}
                ticketPrice={ticketPrice}
                timeSlots={timeSlots}
                image={photo}
                name={name}
                description={bio}
              >
              </SidePanel></div>
        </div>
      )}

    </div>
  </section>
  )
}

export default DocterDetails