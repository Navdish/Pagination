import { useState, useEffect, useNavigate } from 'react';
import './Home.css'
import axios from 'axios';
import {Link} from 'react-router-dom'

function Home() {
    // const navigate = useNavigate();
    const[page, setPage] = useState(1);
    const[users_num, setUsers_num] = useState(4);
    const[userData, setUserData] = useState("");
    useEffect(()=> {
        async function users_func(){
            const Data = await users();
            setUserData(Data.data);
            Data&&console.log(Data.data);
        }
        users_func();
    }, [page, users_num])
    const users = async() => axios.get("http://localhost:8080/users", {params : {
        page_num : page,
        users_num : users_num
    }});
    
    
    
    return (
        <div>
            <h1>Home page</h1>
            <ul>
                {userData && userData.map((x)=>{
                    return(
                        // <li><Link to ={`/user?id=${x._id}`}> {x.name}</Link></li>
                        <li><Link to ={`/user/${x._id}`}> {x.name}</Link></li>
                    )
                })}
            </ul>
            <input type="number" defaultValue={users_num} onChange={(e)=> setUsers_num(e.target.value)}></input>
            <button onClick={(e)=> setPage(page-1)}>Previous</button>
                {page}
            <button onClick={(e)=> setPage(page+1)}>Next</button>
        </div>
    )
}

export default Home;