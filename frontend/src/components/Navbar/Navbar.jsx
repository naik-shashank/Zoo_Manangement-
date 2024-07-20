import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify' 

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("Home");

    const{getTotalCartAmount,token,setToken} = useContext(StoreContext);
    
    const navigate=useNavigate()
    const logout=()=>{
        toast.success("Logout successful!!")
        localStorage.removeItem("token")
        setToken("");
        navigate("/")

    }

    return (
        <div className='navbar'>
            <Link to='/'> <img src={assets.logo} alt='' className='logo' /></Link>
           
            <ul className='navbar-menu'>
                <Link to='/' onClick={() => setMenu('Home')} className={menu === "Home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === "menu" ? "active" : ""}>Animals</a>

                <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt='' />
                <div className='navbar-search-icon'>
                    <Link to='/order'><img src={assets.basket_icon} alt='' /></Link>
                    
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
                
                {!token ? (
    <button onClick={() => setShowLogin(true)}>Sign in</button>
) : (
    <div className='navbar-profile'>
        <img src={assets.profile_icon} alt="Profile Icon" />
        <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('myorders')}>
                <img src={assets.bag_icon} alt="Bag Icon" />
                <p>MyTickets</p>
            </li>
            <hr />
            <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout Icon" />
                <p>LogOut</p>
            </li>
        </ul>
    </div>
)}

            </div>
        </div>
    )
}

export default Navbar