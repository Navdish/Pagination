import react from 'react'
import {useState} from 'react'
import './Login.css'
import axios from 'axios'
import Cookies from 'js-cookie';

function Login(){
    axios.defaults.headers.common['jwt-token'] = Cookies.get('token');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = async(data) => axios.post('http://localhost:8080/login', data);
    const comm = async()=> axios.get("http://localhost:8080");
    async function handleSubmit(e) {
        e.preventDefault();
        const response_token = await login({email, password});
        //console.log(response_token.data);
        Cookies.set('token', response_token.data, { expires: 7, secure: true });
        // console.log(Cookies.get('token'));
        const response = await comm();
        console.log(response.data);
    }
    return (
        <div className='login'>
            <h1>Login Form</h1>
            <form className='login-form'>
                <input type="email" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button type="submit" onClick={(e)=> handleSubmit(e)}>Submit</button>
            </form>

        </div>
    );
}

export default Login;