import react from 'react'
import {useState} from 'react'
import './signup.css'
import axios from 'axios'

function Signup(){
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const obj = {
        name : "",
        email : "",
        password : "", 
        role : "",
        description : "",
        address : ""
    }
    const [user, setUser] = useState(obj);
    const signup = async(data) => axios.post('http://localhost:8080/signup', data);
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await signup({user});
        console.log(response);
    }

    function handleChange(e) {
        setUser({...user, [e.target.name] : e.target.value});
        console.log(user);
    }

    return (
        <div className='signup'>
            <h1>Signup Form</h1>
            <form className='signup-form'>
                <input type="text" name='name' placeholder='name' value={user.name} onChange={(e)=> handleChange(e)}/>
                <input type="email" name='email' placeholder="email" value={user.email} onChange={(e)=> handleChange(e)}/>
                {/* <input type="text" name='role' placeholder='role' value={user.role} onChange={(e)=> handleChange(e)}/> */}
                <select name="role" onClick={(e)=>handleChange(e)}>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                <input type="text" name='description' placeholder='description' value={user.description} onChange={(e)=> handleChange(e)}/>
                <input type="text" name='address' placeholder='address' value={user.address} onChange={(e)=> handleChange(e)}/>
                <input type="password" name='password' placeholder="password" value={user.password} onChange={(e)=> handleChange(e)}/>
                <button type="submit" onClick={(e)=> handleSubmit(e)}>Submit</button>
            </form>
        </div>
    );
}

export default Signup;