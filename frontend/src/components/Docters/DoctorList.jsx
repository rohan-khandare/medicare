
import DocterCard from './DocterCard';


import { doctors} from '../../assets/data/doctors.js';

const DoctorList = () => {
  
  // const {data:doctors,loading,error} = useFetchData(`${BASE_URL}/doctors`);
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {
            doctors.map((doctor,index)=>(
              <DocterCard doctor={doctor} index={index} key={doctor._id} />
          ))}
      </div>  

    </>
  );
};

export default DoctorList