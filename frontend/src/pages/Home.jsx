import heroImg01 from '../assets/images/hero-img01.png'
import heroImg02 from '../assets/images/hero-img02.png'
import heroImg03 from '../assets/images/hero-img03.png'
import heroImg04 from '../assets/images/hero-img04.png'
import heroImg05 from '../assets/images/hero-img05.png'
import heroImg06 from '../assets/images/hero-img06.png'
import featureImg from '../assets/images/feature-img.png'
import featureImg2 from '../assets/images/feature-img2.png'

import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import About from '../components/About/About'
import ServiceList from '../components/Services/ServiceList'
import DoctorList from '../components/Docters/DoctorList' 
import Testimonial from '../components/Testimonial/Testimonial'
import Footer from '../components/Footer/Footer'
import { Link,NavLink } from 'react-router-dom'
import { BsArrowRight} from 'react-icons/bs'

const Home = () => {
  return (
    <div>
      {/* ========= Hero section ======== */}
      <section className='hero_section pt-[60px] 2xl:h-[800px]'>
        <div className='container'>
            <div className="flex flex-col lg:flex-row gap-[90px] item-center justify-between">
                {/* ===== hero content ====== */}
                <div>
                  <div className="lg:w-[570px]">
                    <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">We help patients to live a healthy, longer life. 
                    </h1>
                    <p className='text_para'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quod inventore quae suscipit quos delectus minus nisi consequuntur pariatur deserunt dolorem ab, numquam rerum. Impedit reprehenderit aliquam obcaecati fugiat quaerat?
                    </p>
                   <NavLink to={'/docters'}>
                   <button className='btn'>Request an Appointment</button>
                   </NavLink>
                  </div>

                  {/* ======= hero counter ======= */}
                  <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:item-center gap-5 lg:gap-[30px]">
                      <div>
                        <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font[800] text-headingColor mx-2">
                          20+</h2>
                        <span className="w-[100px] h-3 bg-yellowColor rounded full block mt-[-20px]"></span>
                        <p className="text_para">Years of Experience</p>
                      </div>

                      <div>
                        <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font[800] text-headingColor mx-2">
                          100%</h2>
                        <span className="w-[100px] h-3 bg-purpleColor rounded full block mt-[-20px]"></span>
                        <p className="text_para">Patient Satisfaction</p>
                      </div>

                      <div>
                        <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font[800] text-headingColor mx-2">
                          10+</h2>
                        <span className="w-[100px] h-3 bg-irisBlueColor rounded full block mt-[-20px]"></span>
                        <p className="text_para">Specialist Docters</p>

                      </div>
                  </div>


                 

                </div>
                
                {/* ===== hero content ====== */}
                <div className="flex gap-[30px] justify-end ">
                    <div>
                      <img src={heroImg05} alt="" className="w-full rounded-[1rem]" />
                    </div>
                    <div className="mt-[55px]"> 
                    <img src={heroImg06} alt="" className="w-full mb-[30px] rounded-[2rem]"/>
                    <img src={heroImg04} alt="" className="w-1/2 rounded-[1rem] "/>
                    </div>
                </div>
                



            </div>
        </div>
      </section>
      {/* ========= Hero section end ======== */}
      <section>
          <div className="container my-[-3rem]">
             
              <div className="lg:w-[470px] mx-auto"> 
                  <h2 className="heading text-center">
                    Providing the best medical services
                  </h2>
                  <p className='text_para tex-center '>
                    World-class care for everyone. Our health system offers unmatched,
                    expert health care.
                  </p>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px] my-[-3rem]"> 
                  
                  <div className="py-[30px] px-5 text-center">
                        <div className="flex item-center justify-center"><img src={icon01} alt="" />
                        </div>
                        <div className='mt-[30px]'>
                              <h2 className="text-[26px] leading-9 text-headingColor font-[800] text-center">
                                Find a Docter
                              </h2>
                              <p className='text-[14px] leading-7 text-textColor font-[400] mt-4 tex-center '>
                                World-class care for everyone. Our health system offers unmatched,
                                expert health care, From the lab to Clinic .
                              </p>

                              <Link to='/docters' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto
                              flex items-center justify-center group hover:bg-primaryColor hover:border-none" >
                                <BsArrowRight className="group-hover:text-white w-6 h-5"></BsArrowRight>
                              </Link>

                        </div>
                  </div>


                  <div className="py-[30px] px-5 text-center">
                        <div className="flex item-center justify-center"><img src={icon02} alt="" />
                        </div>
                        <div className='mt-[30px]'>
                              <h2 className="text-[26px] leading-9 text-headingColor font-[800] text-center">
                                Find a Location
                              </h2>
                              <p className='text-[14px] leading-7 text-textColor font-[400] mt-4 tex-center '>
                                World-class care for everyone. Our health system offers unmatched,
                                expert health care, From the lab to Clinic .
                              </p>

                              <Link to='/docters' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto
                              flex items-center justify-center group hover:bg-primaryColor hover:border-none" >
                                <BsArrowRight className="group-hover:text-white w-6 h-5"></BsArrowRight>
                              </Link>

                        </div>
                  </div>


                  <div className="py-[30px] px-5 text-center">
                        <div className="flex item-center justify-center"><img src={icon03} alt="" />
                        </div>
                        <div className='mt-[30px]'>
                              <h2 className="text-[26px] leading-9 text-headingColor font-[800] text-center">
                                Book Appointment
                              </h2>
                              <p className='text-[14px] leading-7 text-textColor font-[400] mt-4 tex-center '>
                                World-class care for everyone. Our health system offers unmatched,
                                expert health care, From the lab to Clinic .
                              </p>

                              <Link to='/docters' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto
                              flex items-center justify-center group hover:bg-primaryColor hover:border-none" >
                                <BsArrowRight className="group-hover:text-white w-6 h-5"></BsArrowRight>
                              </Link>

                        </div>
                  </div>

              </div>

          </div>
      </section>

      {/* ========= about section ========= */}  
       <About></About>

      {/* ========= services section ========= */}
      <section>
        <div className='container'>
          <div className="xl:w-[470px] mx-auto">
            <h2 className='heading text-center'>Our Medical Services</h2>
            <p className='text_para text-center'>
            World-class care for everyone. Our health system offers unmatched, expert health care.
            </p>
          </div>

          <ServiceList></ServiceList>
        </div>

      </section>
     
      {/* ========= Features section ========= */}
      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
           {/* ========= feature content ========= */}
            <div className="xl:w-[670px]">
                <h2 className='heading'>
                  Get virtual treatment <br /> anytime.
                </h2>
                <ul className='pl-4'>
                    <li className='text_para'>
                      1. Schedule the appointment directly
                    </li>
                    <li className='text_para'>
                      2. Search for physician here, and contact their office.
                    </li>
                    <li className='text_para'>
                      3. View our physicians who are accepting new patients, use the 
                      online scheduling tool to select an appointment time.
                    </li>
                </ul>
                <Link to='/'>
                  <button className='btn'>Learn More</button>
                </Link>
            </div>
            {/* ========= feature content ========= */}
            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
                <img src={featureImg2} alt="" className='w-3/4 rounded-[1rem]' />
            </div>
          </div>
        </div>
      </section>
      
      {/* ========= badhiya docters ========= */}
      <section>
        <div className='container'>
            <div className='xl:w-[470px] mx-auto'>
                <h2 className='heading text-center'>Our great doctors</h2>
                <p className='text_para text-center'>World-class care for everyone. our system offers unmatched,
                expert health container
                </p>
            </div>
            
            <DoctorList></DoctorList>
        </div>
      </section>

      {/* ========= faqs ========= */}    
      {/* ========= Testimonial ========= */}
      {/*      
      <section>
        <div className='container'>
              <div className='xl:w-[470px] mx-auto'>
                  <h2 className='heading text-center'>What our patient say</h2>
                  <p className='text_para text-center'>World-class care for everyone. our system offers unmatched,
                  expert health container
                  </p>
              </div>
              
              <Testimonial></Testimonial>
          </div>
      </section> */}

    </div>
    
  )
}

export default Home