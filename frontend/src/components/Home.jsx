import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const Navigate = useNavigate();
    const [userName, setuserName] = useState('')

    useEffect(()=>{
        if (!localStorage.getItem('auth_token')){
           Navigate('/res');
        }else {
            setuserName(localStorage.getItem('name'));
        }
    },[])

    const logout = ()=>{
        localStorage.removeItem('auth_token');
        localStorage.removeItem('name');
        Navigate('/login');
    }

  return (
    <div style={{flexDirection:'column', gap:'19px'}} className="page">
                <h1>
        Welcome , {userName}
        </h1>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home