// import { useEffect,useState } from "react";

// const useFetchData = (url) => {
    
//     // const token = sessionStorage.getItem('token');
//     // console.log(token);

//     const [data,setData]= useState([])
//     const [loading,setLoading] = useState(false)
//     const [error,setError] = useState(null)

//     useEffect( ()=>{
//         const FetchData = async ()=>{
        
//            setLoading(true);
//            try {
         
//             // const res = await fetch(url,{
//             //     headers: {
//             //         Authorization: `Bearer ${token}`,
//             //         'Content-Type': 'application/json' // Set Content-Type header
//             //     }

//             const res = await fetch(url, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }

//             });
//             const result = await res.json();

//             if(!res.ok){
//                 throw new Error(result.message)
//             }
//             setData(result.data)
//             setLoading(false)

//            } catch (err) {
//             setLoading(false)
//             setError(err.message)  
//            }
//         }

//         FetchData()
//     },[url])
  
//   return{
//     data,
//     loading,
//     error,
//   }
// }
// export default useFetchData;





// working code 

import { useEffect, useState } from "react";

const useFetchData = (url, userId) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${url}/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message);
                }
                setData(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, userId]);

    return {
        data,
        loading,
        error,
    };
};

export default useFetchData;


