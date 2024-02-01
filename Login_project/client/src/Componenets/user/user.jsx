import './user.css'
import { useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';

function User(props) {
    
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        async function UserFunc(){
            const response = await User_details();
            setUserDetails(response.data.user_data);
        }
        UserFunc();
    }, [])
    let {id} = useParams();

    const User_details = async() => axios.get('http://localhost:8080/user', {params : {
        id : id
    }})
    // const Update_details = async(data) => axios.put('http://localhost:8080/userUpdate', data)

    // const dropUser = async(data) => axios.delete('http://localhost:8080/dropUser', {data})

    // async function HandleEdit(e){
    //     const update_response = await Update_details(userDetails);
    // }

    // async function HandleDelete(e){
    //     dropUser(userDetails);
    //     navigate("/");
    // }
    return(
        <div>
            <h1>User Details</h1>
            <ul>
                <li>Name {userDetails.name}</li>
                <li>Email = {userDetails.email}</li>    
            </ul>
            
        </div>
    )
}

export default User;