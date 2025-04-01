// import React from 'react'
import { useState } from "react";
import { AiFillStar} from "react-icons/ai";
import {useParams} from "react-router-dom";
import {BASE_URL} from "../../../config.js";
import HashLoader from 'react-spinners/HashLoader.js'
import {toast} from 'react-toastify';

const FeedbackForm = () => {

    const [rating,setRating]=useState(0);
    const [hover,setHover]=useState(0);
    const [reviewText,setReviewText]=useState("");

    const [loading,setLoading]=useState('');
    const {id}=useParams();

    // const handleSubmitReview = async e =>{
    //     e.preventDefault();
    //     setLoading(true);

    //     try {
    //         if (!rating || !reviewText) {
    //             setLoading(false);
    //             toast.error('Rating & Review feilds are required')
            
    //             const res =await fetch(`${BASE_URL}/doctors/${id}/reviews`,{
    //                 method:'post',
    //                 headers:{
    //                     'Content-Type':'application/json',
    //                 },
    //                 body: JSON.stringify({rating,reviewText})
    //             })

    //             const result= await res.json()

    //             if (!res.ok) {
    //                 throw new Error(result.method)
    //             }
    //             setLoading(false);
    //             toast.success(result.message)
    //         }
            
    //     } catch (err) {
    //         setLoading(false)
    //         toast.error(err.message)
    //     }
    // };
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            if (!rating || !reviewText) {
                setLoading(false);
                toast.error('Rating & Review fields are required');
            } else {
                const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ rating, reviewText }),
                });
    
                const result = await res.json();
    
                if (!res.ok) {
                    throw new Error(result.message);
                }
    
                setLoading(false);
                toast.success(result.message);
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    };
    
return (
<form action="">
                <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0" >How would you rate the overall experience? *</h3>
        
        <div>
            {
                [...Array(5).keys()].map((_,index)=>{
                    index+=1;

                    return(

                        <button 
                        key={index}
                        type="button"
                        className={
                            `${index <=( (rating && hover) || hover)
                                ? "text-yellowColor" 
                                : "text-gray-400"} 
                                bg-transparent border-none outline-none text-[22px] cursor-pointer`
                        }
                        onClick={()=>setRating(index)}
                        onMouseEnter={()=>setHover(index)}
                        onMouseLeave={()=>setHover(rating)}
                        onDoubleClick={()=>{
                            setHover(0); 
                            setRating(0);
                        }}
                        >

                            <span>
                                <AiFillStar></AiFillStar>
                            </span>

                        </button>
                    )
                })
            }
        </div>

        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0" >Share your feedback or suggestions *</h3>
        <textarea name="" id="" cols="30" rows="5" className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md" placeholder="write your message"
        onChange={e=>setReviewText(e.target.value)}></textarea>
    </div> 
    <button type="submit" onClick={handleSubmitReview} className="btn">
           {loading? <HashLoader size={25} color="#fff"/>:' Submit Feedback'}
    </button>
</form>
  )
}

export default FeedbackForm