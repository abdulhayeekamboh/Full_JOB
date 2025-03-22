import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const Navigate = useNavigate();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [rich, setrich] = useState('')
    const [type, settype] = useState('');

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://full-backend-psi.vercel.app/login',{email,password});
            console.log(response.data);
            setrich(response.data.message);
            settype(response.data.type);
            localStorage.setItem('auth_token',response.data.token);
            if (localStorage.getItem('auth_token')){
                localStorage.setItem('name',response.data.info.name);
                setTimeout(() => {
                    Navigate('/');
                }, 1000);
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="page">
        <div className="container">
            <form onSubmit={submit}>
            <h1>Login kro</h1>
                <input type="text"
                placeholder='Email'
                value={email}
                onChange={(e)=>{
                    setemail(e.target.value);
                }}
                required
                />
                <input type="text" 
                placeholder='Password'
                value={password}
                onChange={(e)=>{
                    setpassword(e.target.value);
                }}
                required
                />
                <button type='submit'>Login</button>
                <p className={type === 'success' ? 'success' : 'error'}>{rich}</p>
                <p>Don't have an account? <Link to='/register'>Create an Account</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Login
