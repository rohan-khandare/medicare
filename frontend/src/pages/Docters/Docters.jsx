
import DocterCard from "../../components/Docters/DocterCard"

import {BASE_URL} from './../../../config.js';

import Loader from './../../components/Loader/Loading.jsx';
import Error from './../../components/Error/Error.jsx';
import { useEffect, useState } from "react";
import useFetchD from "../../hooks/useFetchD.jsx";

const Docters = () => {

  const [query,setQuery] =useState('')
  const [debounceQuery,setdebounceQuery] = useState("")

  const handleSearch = () =>{
    setQuery(query.trim())
    console.log('handle search')
  }

  useEffect(()=>{
    const timeout =setTimeout(()=>{
      setdebounceQuery(query)
    },700)

    return ()=> clearTimeout(timeout)

  },[query])

  const {
    data:doctors,
    loading,
    error,
  } = useFetchD(`${BASE_URL}/doctors?query=${query}`);

  return (
    <div>
      <section className="bg-[#fff9ea]">
          <div className="container text-center">
            <h2 className="heading">Find a Doctor</h2>
            <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
                <input 
                type="search"
                className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:textColor" 
                placeholder="Search doctor by name or specification"
                value={query}
                onChange={e=>setQuery(e.target.value)}
                />

                <button onClick={handleSearch} className="btn mt-0 rounded-[0px] rounded-rmd">
                  Search
                </button>                
            </div>
          </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader/>}
          {error && <Error/>}
          {!loading && !error && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {
                doctors.map((doctor,index)=>(
                  <DocterCard doctor={doctor} index={index} key={doctor._id} />
                ))
              }
          </div>}   
            
        </div>
      </section>
    </div>
  )
}

export default Docters