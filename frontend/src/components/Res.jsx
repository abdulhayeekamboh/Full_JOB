import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Res = () => {
    const Navigate = useNavigate();
    const [Authentication, setAuthentication] = useState(false);
    useEffect(()=>{
        if (localStorage.getItem('no_allow')){
            setAuthentication(false);
            setTimeout(() => {
                localStorage.removeItem('no_allow');
                Navigate('/login');
            }, 5000);
        }else {
            setAuthentication(true);
            setTimeout(() => {
                Navigate('/register');
            }, 1200);
        }
    },[])

  return (
   <div>
     {Authentication === true ? (
        <div>You can't access without an account we are redirect you register page to fill the form first</div>
    ): (
        <div>We are redirect you to login, Now you have to fill the form of login.</div>
    )}
   </div>
  )
}

export default Res