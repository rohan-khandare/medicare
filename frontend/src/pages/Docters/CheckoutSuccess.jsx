import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="bg-gray-100 h-screen">
        <div className="bg-white p-6 md:mx-auto my-6">
            {/* svg */}
            <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
                <radialGradient id="c0yjGprCnv9Gl20e9Vf6Ca_118993_gr1" cx="32.5" cy="31.5" r="30.516" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-olor="#afeeff"></stop><stop offset=".193" stop-color="#bbf1ff"></stop><stop offset=".703" stop-color="#d7f8ff"></stop><stop offset="1" stop-color="#e1faff"></stop></radialGradient><path fill="url(#c0yjGprCnv9Gl20e9Vf6Ca_118993_gr1)" d="M59,20h1.5c2.168,0,3.892-1.998,3.422-4.243C63.58,14.122,62.056,13,60.385,13L53,13 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2h3.385c1.67,0,3.195-1.122,3.537-2.757C60.392,3.998,58.668,2,56.5,2H34.006H32.5h-24 C6.575,2,5,3.575,5,5.5S6.575,9,8.5,9H10c1.105,0,2,0.895,2,2c0,1.105-0.895,2-2,2l-5.385,0c-1.67,0-3.195,1.122-3.537,2.757 C0.608,18.002,2.332,20,4.5,20H18v12L4.615,32c-1.67,0-3.195,1.122-3.537,2.757C0.608,37.002,2.332,39,4.5,39H5c1.105,0,2,0.895,2,2 c0,1.105-0.895,2-2,2H4.5c-2.168,0-3.892,1.998-3.422,4.243C1.42,48.878,2.945,50,4.615,50H10c1.105,0,2,0.895,2,2 c0,1.105-0.895,2-2,2l-1.385,0c-1.67,0-3.195,1.122-3.537,2.757C4.608,59.002,6.332,61,8.5,61h22.494H32.5h23 c1.925,0,3.5-1.575,3.5-3.5S57.425,54,55.5,54H55c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2h4.385c1.67,0,3.195-1.122,3.537-2.757 C63.392,44.998,61.668,43,59.5,43H47V31h12.385c1.67,0,3.195-1.122,3.537-2.757C63.392,25.998,61.668,24,59.5,24H59 c-1.105,0-2-0.895-2-2C57,20.895,57.895,20,59,20z"></path><linearGradient id="c0yjGprCnv9Gl20e9Vf6Cb_118993_gr2" x1="32" x2="32" y1="6" y2="56" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#42d778"></stop><stop offset=".996" stop-color="#34b171"></stop><stop offset="1" stop-color="#34b171"></stop></linearGradient><path fill="url(#c0yjGprCnv9Gl20e9Vf6Cb_118993_gr2)" d="M57,31c0,13.805-11.195,25-25,25S7,44.805,7,31S18.195,6,32,6S57,17.195,57,31z"></path><path fill="#fff" d="M42.695,21.733L27.5,36.946l-5.235-5.22c-0.977-0.974-2.558-0.973-3.533,0.003l0,0 c-0.977,0.977-0.976,2.562,0.002,3.538l7.002,6.985c0.977,0.975,2.559,0.973,3.534-0.003l16.962-16.982 c0.975-0.977,0.975-2.559-0.001-3.535l0,0C45.254,20.756,43.671,20.756,42.695,21.733z"></path>
                </svg>
            </div>
            <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                    Payment Done!
                </h3>
                <p className="text-gray-600 my-2">
                    Thank you for completing your seecure online payment.
                </p>
                <p>have a great day!</p>
                <div className="py-10 text-center">
                    <Link 
                        to="/home"
                        className="px-12 bg-buttonBgColor text-blue font-semibold py-3 "
                    >
                        Go Back To Home
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckoutSuccess