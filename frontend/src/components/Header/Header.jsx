import {useEffect,useRef,useContext} from 'react'
import logo from '../../assets/images/logo.png'
import { NavLink,Link } from 'react-router-dom'
import {BiMenu} from "react-icons/bi"
import './Header.css'
import { authContext } from '../../context/AuthContext.jsx'

const navLinks =[
    {
        path :'/home',
        display : 'Home'
    },
    {
        path : '/docters',
        display : 'Find a Docter'
    },
    {
        path: '/service',
        display : 'Service'
    },
    {
        path: '/contact',
        display:'Contact'
    },
]

const Header = () => {

    const headerRef =useRef(null)
    const menuRef = useRef(null)
    const {user, role, token}= useContext(authContext)
    
    const handleStickyHeader = () => {
        window.addEventListener('scroll', () => {
            if (headerRef.current) { // Check if headerRef.current is not null
                if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                    headerRef.current.classList.add('sticky_header');
                } else {
                    headerRef.current.classList.remove('sticky_header');
                }
            }
        });
    };
    

    useEffect(()=>{
        handleStickyHeader()

        return ()=> window.removeEventListener('scroll',handleStickyHeader)
    })

    const toggleMenu = () => menuRef.current.classList.toggle('show_menu')
 
  return (

    <div className="nav" ref={headerRef}>
   
        <div className='container'>

            <div className="flex item-center justify-between ">

                    {/* ======= logo ======*/}

                    <div className=''>
                        <img src={logo} alt="" />
                    </div>

                    {/* ======== menu ======*/}
                    <div className='navigation' ref={menuRef} onClick={toggleMenu}>
                        <ul className="menu flex item-center gap-[2.7rem] ">
                            {
                                navLinks.map((link,index)=>
                                    <li key={index}>
                                        <NavLink to={link.path} className={navClass=> 
                                        navClass.isActive 
                                        ?"text-primaryColor text-[18px] leading-7 font-[600]" 
                                        :"text-textColor text-[17px] leading-7 font-[500] hover:text-primaryColor"}>
                                        {link.display}
                                        </NavLink>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    {/* =========== nav right ============ */}
                    <div className="flex item-center justify-center gap-4">
                        
                            
                            {
                                token && user ? <div>
                                    <Link to={`${role === 'doctor' ? '/doctors/profile/me':'users/profile/me'}`}>
                                       
                                        <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                                            <img src={user?.photo} className="w-full rounded-full" alt="" />
                                        </figure>

                                        <h2>{user?.name}</h2>
                                    </Link>
                                </div>: 
                                <Link to='/login'>
                                    <button className='loginbtn'>Login</button>
                                </Link>
                            }

                            
                            
                            <span className="md:hidden" onClick={toggleMenu}>
                                <BiMenu className="w-6 h-6 cursor-pointer"></BiMenu>
                            </span>
                </div>

            </div>
        </div>
                

     </div>
  
  )

}
export default Header