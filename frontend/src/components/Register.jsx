import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    
    const Navigate = useNavigate();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [rich, setrich] = useState('');
    const [type, settype] = useState('');

    async function submit(e) {
        const hi = 'hellwmdk';
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/register',{name,email,password});
            console.log(response.data);
            setrich(response.data.message);
            settype(response.data.type);
            if (response.data.message === 'Registration successfully done'){
                localStorage.setItem('no_allow',hi)
                setTimeout(() => {
                    Navigate('/res');
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
                <h1>Register kro</h1>
                <input type="text" 
                placeholder='Name'
                value={name}
                onChange={(e)=>{
                    setname(e.target.value);
                }}
                required
                />
                <input type='email'
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
                    setpassword(e.target.value)
                }}
                required
                />
                <button type='submit'>Submit</button>
                <p className={type === 'success' ? 'success' : 'error'}>{rich}</p>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Register