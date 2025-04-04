// import React from 'react'
import { formatDate } from "../../utils/formatDate"
const DocterAbout = ({name,about,qualifications,experiences}) => {
  return (
    <div>
       <div>
       <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2 ">
        About of
        <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {name}
        </span>
        </h3>
        <p className="text_para">
            {about}
        </p>
       </div>

       <div className="mt-12">
            <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold>Education"> Education</h3>
            
            <ul className="pt-4 md:p-5">
            
                {qualifications?.map((item,index)=><li key={index} className="flex flex-col sm:flex-row ms:justify-between sm:items-end md:gap-5 mb-[30px]">
                        <div>
                            <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">{formatDate(item.startingDate)} - {formatDate(item.endingDate)}</span>
                            <p className="text-[16px] leading-6 font-meadium text-textColor">
                               {item.degree}
                            </p>
                        </div>
                        <p className="text-[16px] leading-6 font-meadium text-textColor">
                            {item.university}
                        </p>
                </li>)}
            </ul>
       </div>

       <div className="mt-12">
            <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold>Education"> Experience</h3>

            <ul className="grid sm:grid-cols-2 gap-[30px] pt-4  md:p-5">
               {experiences?.map((item,index)=> <li key={index} className="p-4 rounded bg-[#fff9ea]">
                    <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                    {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
                    </span>
                    <p className="text-[16px] leading-6 font-meadium text-textColor">
                           {item.position}
                    </p>
                    <p className="text-[14px] leading-5 font-meadium text-textColor">
                          {item.hospital}
                    </p>
                </li>)}                
            </ul>
       </div>


    </div>
  )
}

export default DocterAbout