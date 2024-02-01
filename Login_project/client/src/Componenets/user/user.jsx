import './user.css'
import { useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';

function User(props) {
    // const searchParams = new URLSearchParams(props.location.search);
    // console.log(searchParams.get());
    // console.log(props);
    
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        async function UserFunc(){
            const response = await User_details();
            console.log(response.data.user_data);
            setUserDetails(response.data.user_data);
        }
        UserFunc();
    }, [])
    let {id} = useParams();
    console.log(id);

    const User_details = async() => axios.get('http://localhost:8080/user', {params : {
        id : id
    }})
    const Update_details = async(data) => axios.put('http://localhost:8080/userUpdate', data)

    const dropUser = async(data) => axios.delete('http://localhost:8080/dropUser', {data})

    async function HandleEdit(e){
        const update_response = await Update_details(userDetails);
        // console.log(update_response);
    }

    async function HandleDelete(e){
        dropUser(userDetails);
        navigate("/");
    }
    //console.log(props.match.params);
    return(
        <div>
            <h1>User Details</h1>
            <ul>
                <li>Name = <input name='name' value={userDetails.name} type='text' onChange={(e)=> setUserDetails({...userDetails, [e.target.name]: e.target.value})}/></li>
                <li>Email = <input name='email' value={userDetails.email} type='text' onChange={(e)=> setUserDetails({...userDetails, [e.target.name]: e.target.value})}/></li>    
            </ul>
            <button onClick={(e)=> HandleEdit(e)}>Edit</button>
            <button onClick={(e)=> HandleDelete(e)}>Delete</button>
        </div>
    )
}

export default User;