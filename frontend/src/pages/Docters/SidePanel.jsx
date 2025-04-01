/* eslint-disable react/prop-types */


import convertTime from "../../utils/convertTime";
// import {BASE_URL} from "./../../../config";
import {toast} from 'react-toastify';
import  axios  from "axios";

const SidePanel = ({doctorId,ticketPrice,timeSlots,image,name,description}) => {
    
    const userString = sessionStorage.getItem('user'); // Assuming 'user' is stored as a stringified JSON
    const userObject = JSON.parse(userString); // Parse the JSON string to an object
    
    // Now you can access the _id property
    const userId = userObject._id;
    const userNaame= userObject.name;
    const userEmail=userObject.email;
    
    console.log(userId); 

    // const bookingHandler = async()=>{
    //     try {

    //         const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`,{
    //             method:'post', 
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ userId: userId }) // Include userId in the request body
               
    //         })
            
    //         const data = await res.json()

    //         if (!res.ok) {
    //             throw new Error(data.message+ 'please try again')
    //         }
    //         if (data.session.url) {
    //             window.location.href = data.session.url
    //         }

    //     } catch (err) {
    //         toast.error(err.message)
    //     }

    // }
    
    const checkoutHandler =async ()=>{
        
        try {

            const {data:{order}} =await axios.post("http://localhost:5000/api/v1/bookings/checkout",{
                ticketPrice:ticketPrice,
                userId:userId,
                doctorId:doctorId,
            })
            
            const options = {
                key: "rzp_test_wBzfPbJxzbmtvg", // Enter the Key ID generated from the Dashboard
                amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: name, //your business name
                description: description,
                image: image,
                order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                callback_url: "http://localhost:5000/api/v1/bookings/paymentverification",
                prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": userNaame, //your customer's name
                    "email": userEmail,
                    "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#3399cc"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
            
        } catch (err){
            console.error('Error fetching data:', err.message);
        }       
    }    

    const handleBookAppointment = async () => {
        try {
            // Send a POST request to your backend API to save the booking
            const response = await axios.post("http://localhost:5000/api/v1/bookings/book-appointment", {
                // Include necessary data for booking
                doctorId: doctorId,
                userId: userId,
                ticketPrice:ticketPrice,
                // Other booking details as needed
            });
    
            // Handle the response if needed (e.g., show a success message)
            console.log("Booking saved successfully:", response.data);
            toast.success("Booking saved successfully");
        } catch (error) {
            // Handle any errors (e.g., show an error message)
            console.error("Error saving booking:", error.message);
            toast.error("Error saving booking:", error.message);
        }
    };

    return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
        <div className='flex item-center justify-between'>
            <p className='text_para mt-0 font-semibold'>Fees</p>
            <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>{ticketPrice} INR</span>
        </div>

        <div className='mt-[30px]'>
            <p className='text_para mt-0 font-semibold text-headingColor'>
                Available Time Slots:
            </p>
            <ul className='mt-3'>
                {timeSlots?.map((item,index)=>(
                    <li key={index} className='flex items-center justify-between mb-2'>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                           {item.day.charAt(0).toUpperCase()+item.day.slice(1)}
                        </p>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
                        </p>
                    </li>
                ))}
                

            </ul>
        </div>

        <button onClick={checkoutHandler} className='btn px-2 w-full rounded-md'>
            Book Now (Pay Online)
        </button>
        <button onClick={handleBookAppointment} className='btn px-2 w-full rounded-md'>
            Book Now (Pay Later)
        </button>
    </div>
  )
}


export default SidePanel