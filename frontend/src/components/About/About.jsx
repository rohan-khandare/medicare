import aboutImg from '../../assets/images/about.png'
import aboutCardImg from '../../assets/images/about-card.png'
import { Link } from 'react-router-dom'

const About = () => {
  return <section>
    <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
            {/* ============ about img ========= */}
            <div className="relative w-3/4 lg:w-[770px] z-10 order-2 lg:order-1">
                <img src={aboutImg} alt="" />
                <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%]
                lg:right-[22%]">
                    <img src={aboutCardImg} alt="" />
                </div>
            </div>
            {/* =========== about content ======== */}
            <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                <h2 className="heading">Proud to be one of the states best </h2>
                <p className='text_para'>  
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, blanditiis? Laborum dicta fuga recusandae architecto non nesciunt at, ad delectus corrupti optio hic. Error illum, quo beatae exercitationem vero quibusdam.
                </p>

                <p className="text_para mt-[30px]">
                Our Best is something  we strive for each day, caring for our
                patients, not looking back at what we accomplished but towords what 
                we can do tomorrow. Providing the best survices Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, laboriosam.
                </p>
                <Link to='/'>
                    <button className='btn'> Learn More</button>
                </Link>
            </div>

        </div>
    </div>
  </section>
}

export default About